import { Button, Transition } from 'pivot-design';
import React, { useState } from 'react';

import './index.scss';

const App: React.FC = () => {
  const [inProp, setInProp] = useState(false); // 用来控制子组件的挂载、卸载
  const duration = 1000;
  const defaultStyle = {
    transition: `opacity ${duration}ms`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <div>
      <Transition in={inProp} timeout={duration} unmountOnExit={true} mountOnEnter={true}>
        {(state: any) => {
          return (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              className="show-box"
            >
              <p>消失自动卸载的标题</p>
            </div>
          );
        }}
      </Transition>
      <Button
        onClick={() => {
          setInProp((inProp) => !inProp);
        }}
      >
        {inProp ? '隐藏' : '展示'}
      </Button>
    </div>
  );
};
export default App;
