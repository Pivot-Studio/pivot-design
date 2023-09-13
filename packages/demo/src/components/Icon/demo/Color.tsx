import { Loading } from 'pivot-design-icon';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Loading color="red" rotate />
      <Loading color="blue" rotate />
      <Loading color="#3f3f3f" rotate />
      <Loading color="rgb(85 0 0 / 30%)" rotate />
    </>
  );
};
export default App;
