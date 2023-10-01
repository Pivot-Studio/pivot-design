import { Monaco } from '@monaco-editor/react';
import REACT_TYPES from '!!raw-loader!/node_modules/@types/react/index.d.ts';

const lib = `const test = {
  testA: 1,
  testB: 2,
}`;

const InitPlugin = (monaco: Monaco) => {
  // 添加ts编译设置
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ES2015,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types'],
  });

  /** 添加额外的依赖包，lib是源代码，第二个参数是自己为其设置的文件路径*/
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    REACT_TYPES,
    'file:///node_modules/@react/types/index.d.ts'
  );
};

export default InitPlugin;
