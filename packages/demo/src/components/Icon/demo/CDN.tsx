import { Icon } from 'pivot-design';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      {/* Pivot Design官方矢量库导入 */}
      <Icon ossIcon="Back" size="20" />

      {/* 自定义导入 */}
      <Icon url="https://pivotstudio.oss-cn-beijing.aliyuncs.com/pivot-design/back.svg" />
    </>
  );
};
export default App;
