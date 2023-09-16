import React from 'react';
import { Modal } from 'pivot-design';
import ModalMdx from '@/components/Modal/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';
import { list } from '@/components/Modal/.catalog';
import { renderCatalog } from '@/utils';
const ModalPage: React.FC = () => {
  return (
    <>
      <ModalMdx components={{ Modal, CodeBlock }} />
      <div className="demo-component-catalogue">{renderCatalog(list)}</div>
    </>
  );
};
export default ModalPage;
