import { Button, Modal } from 'pivot-design';
import React, { useState } from 'react';
const App: React.FC = () => {
  const [openOne, useOpenOne] = useState(false);
  const onchangeOne = () => {
    useOpenOne(true);
  };
  const ModalOKOne = () => {
    useOpenOne(false);
  };
  const ModalCancelOne = () => {
    useOpenOne(false);
  };
  const [openTwo, useOpenTwo] = useState(false);
  const onchangeTwo = () => {
    useOpenTwo(true);
  };
  const ModalOKTwo = () => {
    useOpenTwo(false);
  };
  const ModalCancelTwo = () => {
    useOpenTwo(false);
  };
  return (
    <>
      <Modal
        title="这是"
        content="Hello world"
        open={openOne}
        ModalOK={ModalOKOne}
        ModalCancel={ModalCancelOne}
        isMask={false}
      >
        <p>h1这是内容</p>
      </Modal>
      <Button onClick={onchangeOne}>取消蒙层</Button>
      <Modal
        title="这是"
        content="Hello world"
        open={openTwo}
        ModalOK={ModalOKTwo}
        ModalCancel={ModalCancelTwo}
        maskstyle={{ backgroundColor: 'pink' }}
      >
        <p>h1这是内容</p>
      </Modal>
      <Button onClick={onchangeTwo}>自定义蒙层</Button>
    </>
  );
};
export default App;
