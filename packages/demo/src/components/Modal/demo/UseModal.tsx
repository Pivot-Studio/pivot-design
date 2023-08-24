import { Button, useModal } from 'pivot-design';
import React, { createContext } from 'react';
const ReachableContext = createContext<string | null>(null);

const config = {
  title: 'Use Hook!',
  content: (
    <>
      <ReachableContext.Consumer>{(name) => `ReachableContext: ${name}!`}</ReachableContext.Consumer>
    </>
  ),
};

const App: React.FC = () => {
  const [modal, contextHolder] = useModal();
  return (
    <ReachableContext.Provider value="Light">
      <Button
        onClick={() => {
          modal(config);
        }}
      >
        确定
      </Button>

      {contextHolder}
    </ReachableContext.Provider>
  );
};
export default App;
