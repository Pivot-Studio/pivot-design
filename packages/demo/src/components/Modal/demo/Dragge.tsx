import { Button, Modal } from 'pivot-design';
import React, { useState } from 'react';
const App: React.FC = () => {
  const [open, useOpen] = useState(false);
  const onchange = () => {
    useOpen(true);
  };
  const ModalOK = () => {
    useOpen(false);
  };
  const ModalCancel = () => {
    useOpen(false);
  };
  return (
    <>
      <Modal title="这是" content="Hello world" open={open} ModalOK={ModalOK} ModalCancel={ModalCancel} isDragge={true}>
        <p>h1这是内容</p>
      </Modal>
      <Button onClick={onchange}>按钮</Button>
    </>
  );
};
export default App;
