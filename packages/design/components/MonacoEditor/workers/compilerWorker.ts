import { MessageChangeType, Module } from '../types';
import { transformFromAstSync, PluginObj, Node } from '@babel/core';
import { parse } from '@babel/parser';
import ReactPreset from '@babel/preset-react';
import TSPreset from '@babel/preset-typescript';
import { compileString } from 'sass';
import { getInternalModule, getModulesEntry } from '../utils';

const ModuleDependencyGraph = new Map<'entry' | 'dependencies', any>();

const babelTransform = (filename: string, code: string, modules: Module[]) => {
  // 目前只存在一个入口
  if (
    ModuleDependencyGraph.get('entry') === filename &&
    filename.endsWith('.tsx')
  ) {
    /**
     *  (浏览器）踩坑~
     * 1. presets设置一定要有import引用，不能直接写'jsx'
     * 2. 会在自定义plugin中会有tree shaking，而不是源代码
     *  const { code: resultCode } = transformSync(code, {
      filename: filename,
      presets: [ReactPreset, TSPreset],
      plugins: [
        // Babel plugin to get file import names
        function importGetter() {
          return {
            visitor: {}
          }
        }
      ]
    }
     * */
    const importMap = new Map();
    const ast = parse(code, {
      plugins: ['jsx', 'typescript'],
      sourceType: 'unambiguous',
    });
    const { code: resultCode } = transformFromAstSync(ast as Node, code, {
      filename: filename,
      presets: [ReactPreset, TSPreset],
      plugins: [
        function importGetter(): PluginObj {
          return {
            pre(file) {
              file.metadata.dependencies = [];
            },
            post(file) {
              ModuleDependencyGraph.set(
                'dependencies',
                file.metadata.dependencies
              );
            },
            visitor: {
              ImportDeclaration(path, state) {
                const moduleSource: string = path.node.source.value;
                // 相对路径模块引入
                if (moduleSource.startsWith('.')) {
                  const _module = getInternalModule(
                    modules,
                    moduleSource.slice(2)
                  );
                  if (_module) {
                    state.file.metadata.dependencies.push(_module.key);
                  }
                  if (_module && String(_module.key).endsWith('.css')) {
                    const js = `
                        let stylesheet = document.getElementById('${_module.key}');
                        if (!stylesheet) {
                          stylesheet = document.createElement('style')
                          stylesheet.setAttribute('id', '${_module.key}')
                          document.head.appendChild(stylesheet)
                        }
                        const styles = document.createTextNode(\`${_module.value}\`)
                        stylesheet.innerHTML = ''
                        stylesheet.appendChild(styles)`;
                    path.node.source.value = URL.createObjectURL(
                      new Blob([js], { type: 'application/javascript' })
                    );
                  }
                  if (_module && String(_module.key).endsWith('.scss')) {
                    const js = `
                        let stylesheet = document.getElementById('${
                          _module.key
                        }');
                        if (!stylesheet) {
                          stylesheet = document.createElement('style')
                          stylesheet.setAttribute('id', '${_module.key}')
                          document.head.appendChild(stylesheet)
                        }
                        const styles = document.createTextNode(\`${
                          compileString(_module.value).css
                        }\`)
                        stylesheet.innerHTML = ''
                        stylesheet.appendChild(styles)`;
                    path.node.source.value = URL.createObjectURL(
                      new Blob([js], { type: 'application/javascript' })
                    );
                  }
                } else {
                  // 第三方依赖
                  if (!importMap.has(moduleSource)) {
                    importMap.set(
                      moduleSource,
                      `https://esm.sh/${moduleSource}`
                    );
                  }
                }
              },
            },
          };
        },
      ],
    });
    return {
      code: resultCode,
      importMap,
    };
  }
};

self.addEventListener('message', (e) => {
  const { type, data } = e.data;

  if (type === MessageChangeType.Compile) {
    const { filename, modules } = data;

    const entryModule = getModulesEntry(modules)!;

    if (!ModuleDependencyGraph.has('entry')) {
      ModuleDependencyGraph.set('entry', entryModule?.key);
    }
    // 不在依赖图中不编译
    if (
      filename !== entryModule.key &&
      ModuleDependencyGraph.has('dependencies') &&
      !ModuleDependencyGraph.get('dependencies')?.includes(filename)
    ) {
      return;
    }
    // 发送结果回主线程
    self.postMessage({
      type,
      data: babelTransform(String(entryModule.key), entryModule.value, modules),
    });
  }
});
