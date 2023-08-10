import { Transition } from 'pivot-design';
import React, { useState } from 'react';

import './index.scss';

const App: React.FC = () => {
  const [inProp, setInProp] = useState(true); // 用来控制子组件的挂载、卸载
  const duration = 3000;
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
    <div style={{ color: 'black' }}>
      <Transition in={inProp} timeout={{ enter: 3000, exit: 3000, appear: 3000 }} appear={true}>
        {(state: any) => {
          return (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              className="show-box"
            >
              <p>若影若现的标题</p>
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
