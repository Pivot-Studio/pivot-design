import { Transition } from 'pivot-design';
import React, { useState } from 'react';

import './index.scss';

const App: React.FC = () => {
  const [inProp, setInProp] = useState(true); // 用来控制子组件的挂载、卸载
  const duration = 1000;
  const defaultStyle = {
    opacity: 0,
  };
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transition: `opacity ${duration}ms` },
    exited: { opacity: 0, transition: `opacity ${duration}ms` },
  };
  return (
    <div style={{ color: 'black' }}>
      <Transition in={inProp} timeout={duration} enterAnimation={false}>
        {(state: any) => {
          return (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              className="show-box"
            >
              <p>没有进场动画但有出场动画</p>
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
