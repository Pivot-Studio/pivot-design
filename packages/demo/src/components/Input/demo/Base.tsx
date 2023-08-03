import { Input } from 'pivot-design';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [value, setValue] = useState('0');
  return (
    <>
      <Input placeholder="请输入" />
      <Input disabled placeholder="不可选中" />
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          console.log('修改了vaule', e.target.value);
        }}
        defaultValue="默认值"
      />
      <Input icon="Search" placeholder="带icon的input" iconOnClick={() => console.log('点击了icon')} />
    </>
  );
};
export default App;
