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
      <Modal
        title="这是"
        content="Hello world"
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footerButtonDirection={'col'}
        cancelButtonProps={{ disabled: true }}
      >
        <p>h1这是内容</p>
      </Modal>
      <Button onClick={onchange}>竖版</Button>
    </>
  );
};
export default App;
