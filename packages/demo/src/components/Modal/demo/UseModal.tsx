import { Button, useModal } from 'pivot-design';
import React, { useState } from 'react';
const App: React.FC = () => {
  const [modal, holder] = useModal();
  // const [open, setOpen] = useState(false);
  // const onchange = () => {
  //   setOpen(true);
  // };
  // const ModalOK = () => {
  //   setOpen(false);
  // };
  // const ModalCancel = () => {
  //   setOpen(false);
  // };
  return (
    <>
      <Button
        onClick={() =>
          modal({
            open: true,
            title: 'Confirm',
            content: 'Bla bla ...',
          })
        }
      >
        按钮
      </Button>
      {holder}
    </>
  );
};
export default App;
