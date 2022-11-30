function getDemo(component: string) {
  return `import {Card} from 'pivot-design';
  import React from 'react';
  const App: React.FC=()=>(
    <>
    ${component.trim()}
    </>);
    export default App;
    `;
}
export default {
  basic: getDemo(`
  <Card title="测试" time="19:20 2020-09-15">
  <p>  我好想买Airpods但是没有钱，梁老师可不可以资助我</p>
  <p>一点钱钱呢啊？不多不多的 </p>
  </Card>
  `)
};