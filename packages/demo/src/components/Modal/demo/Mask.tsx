import { Button, Modal } from 'pivot-design';
import React, { useState } from 'react';
const App: React.FC = () => {
  const [openOne, setOpenOne] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const onchangeOne = () => {
    setOpenOne(true);
  };
  const onOkOne = () => {
    setOpenOne(false);
  };
  const onCancelOne = () => {
    setOpenOne(false);
  };

  const onchangeSecond = () => {
    setOpenSecond(true);
  };

  const onCancelSecond = () => {
    setOpenSecond(false);
  };
  return (
    <>
      <Modal title="没有蒙层的模态框" open={openOne} onOk={onOkOne} onCancel={onCancelOne} hasMask={false}>
        没有蒙层
      </Modal>
      <Button onClick={onchangeOne}>没有蒙层</Button>

      <Modal
        title="点击蒙层不会消失的模态框"
        open={openSecond}
        onCancel={onCancelSecond}
        maskClosable={false}
        hasMask={true}
      >
        点击蒙层不会消失的模态框
      </Modal>
      <Button onClick={onchangeSecond}>点击蒙层</Button>
    </>
  );
};
export default App;
