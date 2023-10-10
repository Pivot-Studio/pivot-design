import { EditorProps } from '@monaco-editor/react';
import { useRef, useState } from 'react';
import { CodeType } from './types';
import { useEventCode } from './code';
import Tabs from '../Tabs';
import MonacoEditor from './Editor';
import { useLocalStorage } from '../hooks';

const FILENAME1 = 'index.tsx';
const FILENAME2 = 'index.css';
const _find = (arr: any[], key: string) => {
  for (let index = 0; index < arr.length; index++) {
    const item = arr[index];
    if (item.key === key) {
      return { value: item, index };
    }
  }
  return {};
};
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
// todo: 1.多文件引入（scss、tsx），引入scss
// 2.代码优化；
const MultipleEditor = () => {
  const [tabsValue, setTabsValue] = useLocalStorage('tabs', {
    defaultValue: items,
  });

  return (
    <div style={{ width: '100%', padding: 12 }}>
      <Tabs
        items={tabsValue}
        renderCommonContent={(item) => {
          return (
            <MonacoEditor
              path={String(item.label)}
              defaultLanguage={item.language}
              value={item.value}
              onChange={(value) => {
                const prevTabValue = tabsValue;
                const activeTab = _find(prevTabValue, item.key);
                const newTab = [...prevTabValue];
                newTab[activeTab.index].value = value;
                setTabsValue(newTab);
              }}
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
