import { Button, Modal } from 'pivot-design';
import React, { useState } from 'react';
const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const onchange = () => {
    setOpen(true);
  };
  const ModalOK = () => {
    setOpen(false);
  };
  const ModalCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal title="这是" content="Hello world" open={open} modalOK={ModalOK} modalCancel={ModalCancel}>
        <p>h1这是内容</p>
      </Modal>
      <Button onClick={onchange}>按钮</Button>
    </>
  );
};
export default App;
