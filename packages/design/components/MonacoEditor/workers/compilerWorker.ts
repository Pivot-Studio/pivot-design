import { MessageChangeType } from '../types';
import { transformSync, transform } from '@babel/core';
import ReactPreset from '@babel/preset-react';
import TSPreset from '@babel/preset-typescript';
import { getLocalPrivateKey } from '../utils';
import { TabsItemProps } from 'pivot-design-props';

const getInternalModule = (moduleSource: string) => {
  const moduleLocalPrivateKey = getLocalPrivateKey(moduleSource);
  console.log(localStorage);

  const module = localStorage.getItem(moduleLocalPrivateKey);
  return { value: module, key: moduleLocalPrivateKey };
};
const babelTransform = (
  filename: string,
  code: string,
  modules: TabsItemProps[]
) => {
  if (filename.endsWith('.tsx')) {
    const { code: resultCode } = transformSync(code, {
      filename: filename,
      presets: [ReactPreset, TSPreset],
      plugins: [
        // Babel plugin to get file import names
        function importGetter() {
          return {
            visitor: {
              ImportDeclaration(path: any) {
                const moduleSource: string = path.node.source.value;
                if (moduleSource.startsWith('.')) {
                  console.log(modules);
                  //   const _module = getInternalModule(moduleSource.slice(2));
                  //   if (_module.value) {
                  //     const js = `
                  //     (() => {
                  //       let stylesheet = document.getElementById('${_module.key}');
                  //       if (!stylesheet) {
                  //         stylesheet = document.createElement('style')
                  //         stylesheet.setAttribute('id', '${_module.key}')
                  //         document.head.appendChild(stylesheet)
                  //       }
                  //       const styles = document.createTextNode(\`${_module.value}\`)
                  //       stylesheet.innerHTML = ''
                  //       stylesheet.appendChild(styles)
                  //     })()
                  //     `;
                  //     path.node.source.value = URL.createObjectURL(
                  //       new Blob([js], { type: 'application/javascript' })
                  //     );
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
                }
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
