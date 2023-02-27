import { Button } from 'pivot-design';
import React from 'react';
const App: React.FC = () => {
  return (
    <Button
      onClick={(e) => {
        console.log(e);
      }}
    >
      button
    </Button>
  );
};
export default App;
