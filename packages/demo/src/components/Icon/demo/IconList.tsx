import { Icon } from 'pivot-design';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Icon theme="primary" icon="Back" />
      <Icon theme="secondary" icon="Warning" />
      <Icon theme="success" icon="Close" />
      <Icon theme="info" icon="Loading" />
      <Icon theme="warning" icon="Loading" />
      <Icon theme="danger" icon="Loading" />

      {/* 引用SVG报错 */}
      <Icon icon="NoSvg" />
      <Icon />
    </>
  );
};
export default App;
