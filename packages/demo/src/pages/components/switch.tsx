import React from 'react';
import SwitchMdx from '@/components/Switch/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Switch/.catalog';
import { renderCatalog } from '@/utils';
const SwitchPage: React.FC = () => {
  return (
    <>
      <SwitchMdx components={{ CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default SwitchPage;
