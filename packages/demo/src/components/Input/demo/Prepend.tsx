import { Input } from 'pivot-design';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Input defaultValue="defaut" prepend="www." />
      <Input defaultValue="defaut" append=".edu" />
    </>
  );
};
export default App;
