import Editor, { EditorProps, OnChange, OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import { CodeType, MessageChangeType } from './types';
import { useEventCode } from './code';
import InitPlugin from './plugins/initPlugin';
import { useControlled, useDebounce } from '../hooks';
import Preview from './components/Preview';
import { useWorkers } from './workers/useWorkers';
interface MocacoEditorProps extends EditorProps {}

export const enum ThemeType {
  'Visual Studio' = 'vs',
  'Visual Studio Dark' = 'vs-dark',
  'High Contrast' = 'hc-light',
  'High Contrast Dark' = 'hc-black',
}

// todo: 自动保存（storage）；代码优化；多文件引入（scss、tsx）
const MonacoEditor = (props: MocacoEditorProps) => {
  const [value, onChange] = useControlled<string>(props, {
    valuePropName: 'value',
    changeName: 'onChange',
    defaultValuePropName: 'defaultValue',
    defaultValue: useEventCode,
  });
  const { compilerWorker } = useWorkers();
  const { height = 400, defaultLanguage = CodeType.ts } = props;

  const EditorRef = useRef<Parameters<OnMount>['0']>();
  const MonacoRef = useRef<Parameters<OnMount>['1']>();
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    console.log('did mount', editor);
    EditorRef.current = editor;
    MonacoRef.current = monaco;
    compilerWorker.postMessage({
      type: MessageChangeType.Compile,
      data: {
        filename: 'test.tsx',
        code: value,
      },
    });
    InitPlugin(monaco);
  };
  const handleEditorChange: OnChange = useDebounce((value, e) => {
    onChange(value ?? '');
    compilerWorker.postMessage({
      type: MessageChangeType.Compile,
      data: {
        filename: 'test.tsx',
        code: value,
      },
    });
  }, 300);
  return (
    <div style={{ width: '100%' }}>
      <Editor
        height={height}
        defaultLanguage={defaultLanguage}
        defaultValue={value}
        theme={ThemeType['Visual Studio Dark']}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        // beforeMount={handleEditorWillMount}
        // onValidate={handleEditorValidation}
      />
      <Preview compiler={compilerWorker} />
    </div>
  );
};

export default MonacoEditor;
