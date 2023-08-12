import { Button, CSSTransiton } from 'pivot-design';
import React, { useState } from 'react';
import './index.scss';
const App: React.FC = () => {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  return (
    <>
      {showButton && (
        <Button onClick={() => setShowMessage(true)} size="middle">
          点击展示
        </Button>
      )}
      <CSSTransiton
        in={showMessage}
        timeout={500}
        classNames="css-show-box"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <div>
          <text>出现的标题</text>
          <p>文本内容在消失时会自动卸载，出现时挂载</p>
          <Button onClick={() => setShowMessage(false)}>点击隐藏</Button>
        </div>
      </CSSTransiton>
    </>
  );
};
export default App;

/** css样式
 .show-box {
    opacity: 0;
    &-enter {
      opacity: 0;
      transform: scale(0.9);
    }
    &-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 500ms, transform 500ms;
    }
    &-exit {
      opacity: 1;
    }
    &-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 500ms, transform 500ms;
    }
  }
*/
