import { EditorProps } from '@monaco-editor/react';
import { useRef, useState } from 'react';
import { CodeType } from './types';
import { useEventCode } from './code';
import Tabs from '../Tabs';
import MonacoEditor from './Editor';

const FILENAME1 = 'index.tsx';
const FILENAME2 = 'index.css';

// todo: 1.多文件引入（scss、tsx）: 先看editor，将单个editor和preview抽离出来 多modal
// 2.代码优化；
const MultipleEditor = () => {
  const items = [
    {
      key: FILENAME1,
      label: FILENAME1,
      language: CodeType.ts,
      value: useEventCode,
    },
    {
      key: FILENAME2,
      label: FILENAME2,
      language: CodeType.css,
      value: `{
        .box {
          color: red;
        }
      }`,
    },
  ];

  return (
    <div style={{ width: '100%', padding: 12 }}>
      <Tabs
        items={items}
        renderCommonContent={(item) => {
          return (
            <MonacoEditor
              path={String(item.label)}
              defaultLanguage={item.language}
              defaultValue={item.value}
            />
          );
        }}
        type="card"
        contentStyle={{ paddingTop: 0 }}
      />
    </div>
  );
};

export default MultipleEditor;
