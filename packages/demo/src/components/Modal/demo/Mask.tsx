import { Button, Modal } from 'pivot-design';
import React, { useState } from 'react';
const App: React.FC = () => {
  const [openOne, setOpenOne] = useState(false);
  const onchangeOne = () => {
    setOpenOne(true);
  };
  const ModalOKOne = () => {
    setOpenOne(false);
  };
  const ModalCancelOne = () => {
    setOpenOne(false);
  };
  const [openTwo, setOpenTwo] = useState(false);
  const onchangeTwo = () => {
    setOpenTwo(true);
  };
  const ModalOKTwo = () => {
    setOpenTwo(false);
  };
  const ModalCancelTwo = () => {
    setOpenTwo(false);
  };
  return (
    <>
      <Modal
        title="这是"
        content="Hello world"
        open={openOne}
        modalOK={ModalOKOne}
        modalCancel={ModalCancelOne}
        isMask={false}
      >
        <p>h1这是内容</p>
      </Modal>
      <Button onClick={onchangeOne}>取消蒙层</Button>
      <Modal
        title="这是"
        content="Hello world"
        open={openTwo}
        modalOK={ModalOKTwo}
        modalCancel={ModalCancelTwo}
        maskstyle={{ backgroundImage: 'linear-gradient(-90deg, #596164 1%, #868F96 99%)' }}
      >
        <p>h1这是内容</p>
      </Modal>
      <Button onClick={onchangeTwo}>自定义蒙层</Button>
    </>
  );
};
export default App;
