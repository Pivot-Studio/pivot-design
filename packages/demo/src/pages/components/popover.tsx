import React from 'react';
import { Popover } from 'pivot-design';
import PopoverMdx from '@/components/Popover/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Popover/.catalog';
import { renderCatalog } from '@/utils';
const PopoverPage: React.FC = () => {
  return (
    <>
      <PopoverMdx components={{ Popover, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default PopoverPage;
