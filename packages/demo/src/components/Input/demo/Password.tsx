import { Button, Input } from 'pivot-design';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Input.Password placeholder="请输入" />
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Input.Password visibilityToggle={{ visible, onVisibleChange: setVisible }} placeholder="不可选中" />
        <Button size="middle" onClick={() => setVisible(!visible)}>
          Show
        </Button>
      </div>
    </>
  );
};
export default App;
