import { Input } from 'pivot-design';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Input defaultValue="large" size="lg" />
      <Input placeholder="middle" size="md" />
      <Input placeholder="small" size="sm" />
    </>
  );
};
export default App;
