import { Monaco } from '@monaco-editor/react';
import REACT_TYPES from '!!raw-loader!/node_modules/@types/react/index.d.ts';
import REACT_DOM_TYPES from '!!raw-loader!/node_modules/@types/react-dom/client.d.ts';
const InitPlugin = (monaco: Monaco) => {
  // 添加ts编译设置
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs, // 模块解析策略 nodejs
    module: monaco.languages.typescript.ModuleKind.ES2015, // 代码生成格式
    noEmit: true,
    esModuleInterop: true, // 通过为所有导入创建命名空间对象，实现CommonJS和ES模块之间的互操作性
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types'], // 声明类型依赖目录
  });

  /** 添加额外的依赖包，lib是源代码，第二个参数是自己为其设置的文件路径*/
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    REACT_TYPES,
    'file:///node_modules/@types/react/index.d.ts'
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    REACT_DOM_TYPES,
    'file:///node_modules/@types/react-dom/client.d.ts'
  );
};

export default InitPlugin;
