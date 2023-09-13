import { Loading } from 'pivot-design-icon';

import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Loading theme="primary" rotate />
      <Loading theme="secondary" rotate />
      <Loading theme="success" rotate />
      <Loading theme="info" rotate />
      <Loading theme="warning" rotate />
      <Loading theme="danger" rotate />
    </>
  );
};
export default App;
