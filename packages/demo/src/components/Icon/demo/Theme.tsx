import { IconLoading as Loading } from 'pivot-design-icon';

import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Loading theme="primary" />
      <Loading theme="secondary" />
      <Loading theme="success" />
      <Loading theme="info" />
      <Loading theme="warning" />
      <Loading theme="danger" />
    </>
  );
};
export default App;
