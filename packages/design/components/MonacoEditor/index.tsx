import Editor, { EditorProps, OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import { CodeType } from './types';
import { useEventCode } from './code';
import InitPlugin from './plugins/initPlugin';
interface MocacoEditorProps extends EditorProps {}

export const enum ThemeType {
  'Visual Studio' = 'vs',
  'Visual Studio Dark' = 'vs-dark',
  'High Contrast' = 'hc-light',
  'High Contrast Dark' = 'hc-black',
}

const MonacoEditor = ({ height = 600, defaultLanguage, defaultValue }: MocacoEditorProps) => {
  const EditorRef = useRef<Parameters<OnMount>['0']>();
  const MonacoRef = useRef<Parameters<OnMount>['1']>();
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    console.log('did mount', editor);
    EditorRef.current = editor;
    MonacoRef.current = monaco;
    InitPlugin(monaco);
  };

  return (
    <Editor
      height={height}
      defaultLanguage={CodeType.ts}
      defaultValue={useEventCode}
      theme={ThemeType['Visual Studio Dark']}
      // onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      // beforeMount={handleEditorWillMount}
      // onValidate={handleEditorValidation}
    />
  );
};

export default MonacoEditor;
