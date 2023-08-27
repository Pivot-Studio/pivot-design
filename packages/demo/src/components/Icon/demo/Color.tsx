import { IconLoading as Loading } from 'pivot-design-icon';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Loading color="red" />
      <Loading color="blue" />
      <Loading color="#3f3f3f" />
      <Loading color="rgb(85 0 0 / 30%)" />
    </>
  );
};
export default App;
