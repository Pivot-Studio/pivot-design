import React from 'react';
import { Tabs } from 'pivot-design';
import TabsMdx from '@/components/Tabs/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Input/.catalog';
import { renderCatalog } from '@/utils';
const TabsPage: React.FC = () => {
  return (
    <>
      <TabsMdx components={{ Tabs, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default TabsPage;
