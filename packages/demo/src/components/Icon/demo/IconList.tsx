import { Back, Close, DefautError, Loading, Search, Warning } from 'pivot-design-icon';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Back theme="primary" />
      <Close theme="secondary" />
      <Loading theme="success" />
      <Search theme="info" />
      <Warning theme="warning" />
      <DefautError theme="danger" />
    </>
  );
};
export default App;
