import React from 'react';
import { Transition } from 'pivot-design';
import TransitionMdx from '@/components/Transition/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Transition/.catalog';
import { renderCatalog } from '@/utils';
const TransitionPage: React.FC = () => {
  return (
    <>
      <TransitionMdx components={{ Transition, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default TransitionPage;
