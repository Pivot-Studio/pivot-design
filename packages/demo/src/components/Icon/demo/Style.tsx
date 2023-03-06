import { Icon } from 'pivot-design';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Icon icon="Loading" size="30" style={{ margin: '50px', backgroundColor: '#f5f2f0' }} />

      <Icon icon="Loading" size="20" rotate={true} />
    </>
  );
};
export default App;
