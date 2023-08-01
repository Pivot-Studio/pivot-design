import { Button, useModal } from 'pivot-design';
import React, { createContext } from 'react';
const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

const config1 = {
  title: 'Use Hook!',
  content: (
    <>
      <ReachableContext.Consumer>{(name) => `Reachable: ${name}!`}</ReachableContext.Consumer>
      <br />
      <UnreachableContext.Consumer>{(name) => `Unreachable: ${name}!`}</UnreachableContext.Consumer>
    </>
  ),
};
const config2 = {
  title: 'Use Hook!',
  content: (
    <>
      <ReachableContext.Consumer>{(name) => `Reachable: ${name}!`}</ReachableContext.Consumer>
      <br />
      <UnreachableContext.Consumer>{(name) => `Unreachable: ${name}!`}</UnreachableContext.Consumer>
    </>
  ),
  modalOK: () => {
    console.log('hello!');
  },
};
const App: React.FC = () => {
  const [modal, contextHolder] = useModal();

  return (
    <ReachableContext.Provider value="Light">
      <Button
        onClick={() => {
          modal(config1);
        }}
      >
        确定
      </Button>
      <Button
        onClick={() => {
          modal(config2);
        }}
      >
        添加函数
      </Button>
      {contextHolder}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};
export default App;
