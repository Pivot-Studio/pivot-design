import Editor, { EditorProps, OnChange, OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import { CodeType, MessageChangeType, ThemeType } from './types';
import InitPlugin from './plugins/initPlugin';
import { useDebounce } from '../hooks';
import Preview from './components/Preview';
import { useWorkers } from './workers/useWorkers';
interface MocacoEditorProps extends EditorProps {}

const FILENAME = 'index.tsx';

const MonacoEditor = (props: MocacoEditorProps) => {
  const { compilerWorker } = useWorkers();
  const {
    height = 400,
    defaultLanguage = CodeType.ts,
    path = FILENAME,
    theme = ThemeType['Visual Studio Dark'],
    value,
    defaultValue,
    onChange,
    ...rest
  } = props;

  const privateKey = `pivot_editor_${path}`;
  const localValue = localStorage.getItem(privateKey);

  const storedValue = onChange ? value : localValue ?? defaultValue;

  const EditorRef = useRef<Parameters<OnMount>['0']>();
  const MonacoRef = useRef<Parameters<OnMount>['1']>();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    EditorRef.current = editor;
    MonacoRef.current = monaco;
    compilerWorker.postMessage({
      type: MessageChangeType.Compile,
      data: {
        filename: path,
        code: storedValue,
      },
    });
    InitPlugin(monaco);
  };

  const handleEditorChange: OnChange = useDebounce((value, e) => {
    onChange?.(value ?? '', e);
    localStorage.setItem(privateKey, value);
    compilerWorker.postMessage({
      type: MessageChangeType.Compile,
      data: {
        filename: path,
        code: value,
      },
    });
  }, 300);

  return (
    <div style={{ width: '100%', padding: 12 }}>
      <Editor
        height={height}
        path={path}
        defaultLanguage={defaultLanguage}
        defaultValue={storedValue}
        theme={theme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        {...rest}
        // beforeMount={handleEditorWillMount}
        // onValidate={handleEditorValidation}
      />
      <Preview compiler={compilerWorker} />
    </div>
  );
};

export default MonacoEditor;
