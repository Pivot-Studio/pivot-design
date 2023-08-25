import { Button, Modal } from 'pivot-design';
import React from 'react';

const App: React.FC = () => {
  return (
    <Button
      onClick={() => {
        Modal.show({
          title: 'Modal',
          children: 'show调起的对话框',
        });
      }}
    >
      Show
    </Button>
  );
};
export default App;
