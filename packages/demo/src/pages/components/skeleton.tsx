import React from 'react';
import { Skeleton } from 'pivot-design';
import SkeletonMdx from '@/components/Skeleton/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Skeleton/.catalog';
import { renderCatalog } from '@/utils';
const SkeletonPage: React.FC = () => {
  return (
    <>
      <SkeletonMdx components={{ Skeleton, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default SkeletonPage;
