import { CSSTransiton as MyCSSTransition } from 'pivot-design';
import React, { useState } from 'react';

import './index.scss';

// const App: React.FC = () => {};

const App: React.FC = () => {
  const [inProp, setInProp] = useState(false);
  return (
    <>
      <MyCSSTransition in={inProp} timeout={2000} classNames="my-node">
        <div id="test">{"I'll receive my-node-* classes"}</div>
      </MyCSSTransition>
      <button type="button" onClick={() => setInProp(!inProp)}>
        Click to Enter
      </button>
    </>
  );
};
// 第一次点击按钮时 ，通过审查元素可以看到 div#test 标签的类名发生了变化，
// 依次为 “my-node-enter”、“my-node-enter my-node-enter-active” >>>(2s later) “my-node-enter-done”

// 第二次点击按钮时，通过审查元素可以看到 div#test 标签的类名发生了变化，
// 依次为 “my-node-exit”、“my-node-exit my-node-exit-active” >>> (2s later)  “my-node-exit-done”
export default App;
