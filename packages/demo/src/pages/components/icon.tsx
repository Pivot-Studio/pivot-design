import React from 'react';
import { Icon } from 'pivot-design';
import IconMdx from '@/components/Icon/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Icon/.catalog';
import { renderCatalog } from '@/utils';

const IconPage: React.FC = () => {
  return (
    <>
      <IconMdx components={{ Icon, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default IconPage;
