import { Card, Button } from 'pivot-design';
import React, { useState } from 'react';
import Actions from '../svg/index.tsx';
import More from '../svg/tab.tsx';
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const onClickHandle = () => {
    setLoading(!loading);
  };
  return (
    <>
      <Card
        loading={loading}
        title={<div>多余文本</div>}
        time="19:20 2020-09-15"
        extra={<More />}
        avatar={
          <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" width="35" height="35" />
        }
        actions={<Actions />}
      >
        我好想买Airpods但是没有钱，梁老师可不可以 资助我我好想买Airpods 但是没有钱，
        梁老师可不可以资助我一点钱呢啊？不多不多的， 球球了！我好想买Airpods但是没有钱，
        梁老师可不可以资助我一点钱钱呢啊？ 不多不多的，球球了！我好想买Airpods但是没有钱，梁老师可
        我好想买Airpods但是没有钱，梁老师可不可以资助我一点钱钱呢啊？ 不多不多的，球球了！ 我好想买Airpods但是没有钱，
        梁老师可不可以资助我一点钱钱呢啊？不多不多的，球球了！ 我好想买Airpods但是没有钱，梁老师可
        我好想买Airpods但是没有钱，梁老师可不可以资助我一点钱钱呢啊？ 不多不多的，球球了！ 我好想买Airpods但是没有钱，
        梁老师可不可以资助我一点钱钱呢啊？ 不多不多的， 球球了！我好想买Airpods但是没有钱，梁老师可
      </Card>
      <Button size="small" onClick={onClickHandle}>
        change
      </Button>
    </>
  );
};
export default App;
