import { Transition } from 'pivot-design';
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
      <Transition
        in={inProp}
        timeout={duration}
        onEnter={() => console.log('onEnter')}
        onEntering={() => console.log('onEntering')}
        onExit={() => console.log('onExit')}
        onEntered={() => console.log('onEntered')}
        onExited={() => console.log('onExited')}
        onExiting={() => console.log('onExiting')}
      >
        {(state: any) => {
          return (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              className="show-box"
            >
              <p>控制台查看回调函数</p>
            </div>
          );
        }}
      </Transition>
      <button
        onClick={() => {
          setInProp((inProp) => !inProp);
        }}
      >
        {inProp ? '隐藏' : '展示'}
      </button>
    </div>
  );
};
export default App;
