import { IconLoading as Loading } from 'pivot-design-icon';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <Loading size="30" style={{ margin: '50px', backgroundColor: '#f5f2f0' }} />

      <Loading size="20" rotate={true} />
    </>
  );
};
export default App;
