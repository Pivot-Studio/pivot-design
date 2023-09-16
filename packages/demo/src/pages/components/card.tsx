import React from 'react';
import { Card } from 'pivot-design';
import CardMdx from '@/components/Card/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Card/.catalog';
import { renderCatalog } from '@/utils';
const CardPage: React.FC = () => {
  return (
    <>
      <CardMdx components={{ Card, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default CardPage;
