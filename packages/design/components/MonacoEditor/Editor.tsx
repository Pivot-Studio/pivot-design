import Editor, { EditorProps, OnChange, OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import { TabsItemProps } from 'pivot-design-props';
import { CodeType, MessageChangeType, ThemeType } from './types';
import InitPlugin from './plugins/initPlugin';
import { useControlled, useDebounce } from '../hooks';
import Preview from './components/Preview';
import { useWorkers } from './workers/useWorkers';
interface MocacoEditorProps extends EditorProps {
  modules?: TabsItemProps[];
}

const FILENAME = 'index.tsx';

const MonacoEditor = (props: MocacoEditorProps) => {
  const { compilerWorker } = useWorkers();
  const [value, onChange] = useControlled<string>(props, {
    valuePropName: 'value',
    changeName: 'onChange',
    defaultValuePropName: 'defaultValue',
  });
  const {
    height = 400,
    defaultLanguage = CodeType.ts,
    path = FILENAME,
    theme = ThemeType['Visual Studio Dark'],
    modules,
    ...rest
  } = props;

  const EditorRef = useRef<Parameters<OnMount>['0']>();
  const MonacoRef = useRef<Parameters<OnMount>['1']>();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    EditorRef.current = editor;
    MonacoRef.current = monaco;
    compilerWorker.postMessage({
      type: MessageChangeType.Compile,
      data: {
        filename: path,
        code: value,
      },
    });
    InitPlugin(monaco);
  };

  const handleEditorChange: OnChange = useDebounce((value, e) => {
    onChange?.(value ?? '', e);
    compilerWorker.postMessage({
      type: MessageChangeType.Compile,
      data: {
        filename: path,
        code: value,
        modules,
      },
    });
  }, 300);

  return (
    <div style={{ width: '100%', padding: 12 }}>
      <Editor
        height={height}
        path={path}
        defaultLanguage={defaultLanguage}
        defaultValue={value}
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
