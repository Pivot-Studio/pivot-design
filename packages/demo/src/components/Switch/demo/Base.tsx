import { Switch } from 'pivot-design';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Switch />
      <Switch defaultValue={true} />
    </>
  );
};
export default App;
