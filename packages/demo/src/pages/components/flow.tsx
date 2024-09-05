import React from 'react';
import { Flow } from 'pivot-design';
import FlowMdx from '@/components/Flow/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Flow/.catalog';
import { renderCatalog } from '@/utils';
const FlowPage: React.FC = () => {
  return (
    <>
      <FlowMdx components={{ Flow, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default FlowPage;
