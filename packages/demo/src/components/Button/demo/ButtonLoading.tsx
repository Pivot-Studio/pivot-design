import { Button } from 'pivot-design';
import React, { useState } from 'react';
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const onClickHandle = () => {
    setLoading(true);
  };

  const onClickReset = () => {
    setLoading(false);
  };
  const testLog = () => {
    setLoading(true);
    console.log('调用testLog');
  };

  return (
    <>
      <Button loading={true}>加载中</Button>
      <Button loading={loading} onClick={onClickHandle}>
        点击变为加载中
      </Button>
      <Button onClick={onClickReset}>重置按钮状态</Button>
      <Button onClick={testLog} debounce={2000}>
        2s防抖
      </Button>
      <Button onClick={testLog} throttle={{ delay: 2000, immediate: true }}>
        2s头节流按钮
      </Button>
      <Button onClick={testLog} throttle={{ delay: 2000, immediate: false }}>
        2s尾节流按钮
      </Button>
    </>
  );
};
export default App;
