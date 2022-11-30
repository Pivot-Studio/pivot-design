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
  <Card title="����" time="19:20 2020-09-15">
  <p>  �Һ�����Airpods����û��Ǯ������ʦ�ɲ�����������</p>
  <p>һ��ǮǮ�ذ������಻��� </p>
  </Card>
  `)
};