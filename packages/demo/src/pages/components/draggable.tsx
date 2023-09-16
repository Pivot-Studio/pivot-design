import React from 'react';
import DraggableMdx from '@/components/Draggable/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Draggable/.catalog';
import { renderCatalog } from '@/utils';
const DraggablePage: React.FC = () => {
  return (
    <>
      <DraggableMdx components={{ CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default DraggablePage;
