import Editor, { EditorProps, OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import { CodeType } from './types';
import { useEventCode, testCode } from './code';
import InitPlugin from './plugins/initPlugin';
import { babelTransform } from './compiler';
interface MocacoEditorProps extends EditorProps {}

export const enum ThemeType {
  'Visual Studio' = 'vs',
  'Visual Studio Dark' = 'vs-dark',
  'High Contrast' = 'hc-light',
  'High Contrast Dark' = 'hc-black',
}

// todo: 解析jsx，插入iframe；worker通信
const MonacoEditor = ({
  height = 400,
  defaultLanguage,
  defaultValue,
}: MocacoEditorProps) => {
  const EditorRef = useRef<Parameters<OnMount>['0']>();
  const MonacoRef = useRef<Parameters<OnMount>['1']>();
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    console.log('did mount', editor);
    EditorRef.current = editor;
    MonacoRef.current = monaco;

    InitPlugin(monaco);
  };

  return (
    <div style={{ width: '100%' }}>
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
      <iframe
        srcDoc={`
        <html>
        <script type="importmap">{"imports":{"react":"https://esm.sh/react","react-dom/client":"https://esm.sh/react-dom/client"}}</script>
        <body><div id="root"/></body>
        <script type="module">${babelTransform(
          'w.tsx',
          useEventCode,
          []
        )}</script>
      </html>`}
        title="output"
        sandbox="allow-scripts"
        frameBorder="1"
        width="100%"
        height={800}
      />
    </div>
  );
};

export default MonacoEditor;
