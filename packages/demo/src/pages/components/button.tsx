import React from 'react';
import { Button } from 'pivot-design';
import ButtonMdx from '@/components/Button/index.mdx';
import ButtonMdxCode from '@/components/Button/index.mdx?code';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Button/.catalog';
import { mdParser, renderCatalog } from '@/utils';
const ButtonPage: React.FC = () => {
  console.log(mdParser.getAnchorList(ButtonMdxCode));

  // processor.processSync('# hi');
  return (
    <>
      <ButtonMdx components={{ Button, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default ButtonPage;
