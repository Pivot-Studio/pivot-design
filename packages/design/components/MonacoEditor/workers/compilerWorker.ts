import { MessageChangeType } from '../types';
import { transformSync, transform } from '@babel/core';
import ReactPreset from '@babel/preset-react';
import TSPreset from '@babel/preset-typescript';

const babelTransform = (filename: string, code: string, tabs: Tab[]) => {
  let _code = code;
  if (filename.endsWith('.tsx')) {
    _code = `${code}`;
  }

  const { code: resultCode } = transformSync(_code, {
    filename: 'j.tsx',
    presets: [ReactPreset, TSPreset],
    // plugins: [
    //   // Babel plugin to get file import names
    //   function importGetter() {
    //     return {
    //       visitor: {
    //         ImportDeclaration(path: any) {
    //           const module: string = path.node.source.value;
    //           if (module.startsWith('.')) {
    //             const _module = getInternalModule(tabs, module);
    //             // handle style file
    //             if (_module.path.endsWith('.css')) {
    //               const js = `
    //               (() => {
    //                 let stylesheet = document.getElementById('${_module.path}');
    //                 if (!stylesheet) {
    //                   stylesheet = document.createElement('style')
    //                   stylesheet.setAttribute('id', '${_module.path}')
    //                   document.head.appendChild(stylesheet)
    //                 }
    //                 const styles = document.createTextNode(\`${_module.content}\`)
    //                 stylesheet.innerHTML = ''
    //                 stylesheet.appendChild(styles)
    //               })()
    //               `;
    //               path.node.source.value = URL.createObjectURL(
    //                 new Blob([js], { type: 'application/javascript' })
    //               );
    //             } else {
    //               // handle ts file
    //               path.node.source.value = URL.createObjectURL(
    //                 new Blob(
    //                   [babelTransform(_module.path, _module.content, tabs)],
    //                   {
    //                     type: 'application/javascript',
    //                   }
    //                 )
    //               );
    //             }
    //           } else {
    //             // Third-party modules
    //             if (!importmap[module]) {
    //               importmap[module] = `https://esm.sh/${module}`;
    //             }
    //           }
    //         },
    //       },
    //     };
    //   },
    // ],
  });
  return resultCode;
};

self.addEventListener('message', (e) => {
  const { type, data } = e.data;

  if (type === MessageChangeType.Compile) {
    // 发送结果回主线程

    self.postMessage({
      type,
      data: babelTransform(data.filename, data.code, []),
    });
  }
});
