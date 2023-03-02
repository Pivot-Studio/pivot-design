import { Icon } from 'pivot-design';
import React, { useState } from 'react';

const App: React.FC = () => {
  return (
    <>
      <Icon theme="primary" />
      <Icon theme="secondary" />
      <Icon theme="success" />
      <Icon theme="info" />
      <Icon theme="warning" />
      <Icon theme="danger" />

      <Icon icon="back" />
      <Icon icon="back" style={{ margin: '50px' }} />
      <Icon icon="back" size="20" />

      <Icon ossIcon="back" size="20" />
    </>
  );
};
export default App;
