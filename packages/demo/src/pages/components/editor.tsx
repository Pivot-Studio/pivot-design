import React from 'react';
import EditorMdx from '@/components/Editor/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Editor/.catalog';
import { renderCatalog } from '@/utils';
const EditorPage: React.FC = () => {
  return (
    <>
      <EditorMdx components={{ CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default EditorPage;
