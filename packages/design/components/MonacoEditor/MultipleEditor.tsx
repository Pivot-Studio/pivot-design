import { FC } from 'react';
import { CodeType, Module } from './types';
import { testCode } from './code';
import Tabs from '../Tabs';
import MonacoEditor from './Editor';
import { useLocalStorage } from '../hooks';
import { MultipleEditorProps } from 'pivot-design-props';

const FILENAME1 = 'index.tsx';
const FILENAME2 = 'index.scss';
const items: Module[] = [
  {
    key: FILENAME1,
    label: FILENAME1,
    language: CodeType.ts,
    value: testCode,
    entry: true,
  },
  {
    key: FILENAME2,
    label: FILENAME2,
    language: CodeType.scss,
    value: `section {
        h1 {
          color: white;
        }
      }`,
  },
];
const MultipleEditor: FC<MultipleEditorProps> = ({ style }) => {
  const [tabsValue, setTabsValue] = useLocalStorage<Module[]>('tabs', {
    defaultValue: items,
  });

  return (
    <div style={{ width: '100%', padding: 12, ...style }}>
      <Tabs
        items={tabsValue}
        renderCommonContent={(item) => {
          return (
            <MonacoEditor
              modules={tabsValue}
              path={String(item.label)}
              defaultLanguage={item.language}
              defaultValue={item.value}
              onChange={(value) => {
                if (!value) return;
                const updatedTabs: Module[] = tabsValue.map((tab) => {
                  if (tab.key === item.key) {
                    return { ...tab, value };
                  }
                  return tab;
                });
                setTabsValue(updatedTabs);
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
