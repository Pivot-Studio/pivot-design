import { Button, Modal } from 'pivot-design';
import React, { useState } from 'react';
const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const onchange = () => {
    setOpen(true);
  };
  const onOk = () => {
    setOpen(false);
  };
  const onCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal title="模态框" open={open} onOk={onOk} onCancel={onCancel} position={{ x: 0, y: 100 }}>
        <p>h1这是内容</p>
      </Modal>
      <Button onClick={onchange}>按钮</Button>
    </>
  );
};
export default App;
