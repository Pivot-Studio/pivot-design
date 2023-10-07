import Editor, { EditorProps, OnChange, OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import { CodeType, MessageChangeType } from './types';
import { useEventCode } from './code';
import InitPlugin from './plugins/initPlugin';
import { useControlled, useDebounce, useLocalStorage } from '../hooks';
import Preview from './components/Preview';
import { useWorkers } from './workers/useWorkers';
import Tabs from '../Tabs';
interface MocacoEditorProps extends EditorProps {}

export const enum ThemeType {
  'Visual Studio' = 'vs',
  'Visual Studio Dark' = 'vs-dark',
  'High Contrast' = 'hc-light',
  'High Contrast Dark' = 'hc-black',
}

const FILENAME = 'index.tsx';

// todo: 多文件引入（scss、tsx）;代码优化；
const MonacoEditor = (props: MocacoEditorProps) => {
  const [value, onChange] = useControlled<string>(props, {
    valuePropName: 'value',
    changeName: 'onChange',
    defaultValuePropName: 'defaultValue',
    defaultValue: useEventCode,
  });
  const [storedValue, setStoredValue] = useLocalStorage(`${FILENAME}`, {
    defaultValue: value,
  });

  const { compilerWorker } = useWorkers();
  const { height = 400, defaultLanguage = CodeType.ts } = props;

  const EditorRef = useRef<Parameters<OnMount>['0']>();
  const MonacoRef = useRef<Parameters<OnMount>['1']>();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    EditorRef.current = editor;
    MonacoRef.current = monaco;
    compilerWorker.postMessage({
      type: MessageChangeType.Compile,
      data: {
        filename: FILENAME,
        code: storedValue,
      },
    });
    InitPlugin(monaco);
  };

  const handleEditorChange: OnChange = useDebounce((value, e) => {
    onChange(value ?? '');
    setStoredValue(value ?? '');
    compilerWorker.postMessage({
      type: MessageChangeType.Compile,
      data: {
        filename: FILENAME,
        code: value,
      },
    });
  }, 300);

  const items = [
    {
      key: FILENAME,
      label: FILENAME,
    },
  ];

  return (
    <div style={{ width: '100%', padding: 12 }}>
      <Tabs
        items={items}
        renderCommonContent={(item) => (
          <>
            <Editor
              height={height}
              defaultLanguage={defaultLanguage}
              defaultValue={storedValue}
              theme={ThemeType['Visual Studio Dark']}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              // beforeMount={handleEditorWillMount}
              // onValidate={handleEditorValidation}
            />
            <Preview compiler={compilerWorker} />
          </>
        )}
        type="card"
        contentStyle={{ paddingTop: 0 }}
      />
    </div>
  );
};

export default MonacoEditor;
