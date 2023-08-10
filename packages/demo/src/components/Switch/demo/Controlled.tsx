import { Switch } from 'pivot-design';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [value, setValue] = useState(true);
  return (
    <>
      <Switch value={value} onChange={(checked) => setValue(checked)} />
    </>
  );
};
export default App;
