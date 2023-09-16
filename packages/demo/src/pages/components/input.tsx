import React from 'react';
import { Input } from 'pivot-design';
import InputMdx from '@/components/Input/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Input/.catalog';
import { renderCatalog } from '@/utils';
const InputPage: React.FC = () => {
  return (
    <>
      <InputMdx components={{ Input, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default InputPage;
