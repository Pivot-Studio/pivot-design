import { MessageChangeType } from '../types';
import { transformFromAstSync } from '@babel/core';
import { parse } from '@babel/parser';
import ReactPreset from '@babel/preset-react';
import TSPreset from '@babel/preset-typescript';
import { TabsItemProps } from 'pivot-design-props';
import { compileString } from 'sass';

const getInternalModule = (modules: TabsItemProps[], moduleSource: string) => {
  return modules.find((module) => module.key === moduleSource);
};
const babelTransform = (
  filename: string,
  code: string,
  modules: TabsItemProps[]
) => {
  if (filename.endsWith('.tsx')) {
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

    const ast = parse(code, {
      plugins: ['jsx', 'typescript'],
      sourceType: 'unambiguous',
    });
    const { code: resultCode } = transformFromAstSync(ast, code, {
      filename: filename,
      presets: [ReactPreset, TSPreset],
      plugins: [
        function importGetter() {
          return {
            visitor: {
              ImportDeclaration(path: any) {
                const moduleSource: string = path.node.source.value;
                // 相对路径模块引入
                if (moduleSource.startsWith('.')) {
                  const _module = getInternalModule(
                    modules,
                    moduleSource.slice(2)
                  );
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
                }

                //   const _module = getInternalModule(moduleSource.slice(2));
                //   if (_module.value) {
                //
                //   }
                //   else {
                //     // handle ts file
                //     path.node.source.value = URL.createObjectURL(
                //       new Blob(
                //         [babelTransform(_module.path, _module.content, tabs)],
                //         {
                //           type: 'application/javascript',
                //         }
                //       )
                //     );
                //   }
                // } else {
                //   // Third-party modules
                //   if (!importmap[module]) {
                //     importmap[module] = `https://esm.sh/${module}`;
                //   }
                // }
                // }
              },
            },
          };
        },
      ],
    });
    return resultCode;
  }
};

self.addEventListener('message', (e) => {
  const { type, data } = e.data;

  if (type === MessageChangeType.Compile) {
    // 发送结果回主线程
    self.postMessage({
      type,
      data: babelTransform(data.filename, data.code, data.modules),
    });
  }
});
