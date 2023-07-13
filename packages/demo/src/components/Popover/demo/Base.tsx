import { Popover } from 'pivot-design';
import React from 'react';

import './index.scss';
import { prefix } from '../../constant';

const App: React.FC = () => {
  return (
    <>
      <div className={`${prefix}-center`}>
        <Popover placement="top-left" content={<div>prompt text</div>}>
          <div>TL</div>
        </Popover>
        <Popover placement="top" content={<div>prompt text</div>}>
          <div>Top</div>
        </Popover>
        <Popover placement="top-right" content={<div>prompt text</div>}>
          <div>TR</div>
        </Popover>
      </div>
      <div className={`${prefix}-space`}>
        <Popover placement="left-top" content={<div>prompt text</div>}>
          <div>LT</div>
        </Popover>
        <Popover placement="right-top" content={<div>prompt text</div>}>
          <div>RT</div>
        </Popover>
      </div>
      <div className={`${prefix}-space`}>
        <Popover placement="left" content={<div>prompt text</div>}>
          <div>Left</div>
        </Popover>
        <Popover placement="right" content={<div>prompt text</div>}>
          <div>Right</div>
        </Popover>
      </div>
      <div className={`${prefix}-space`}>
        <Popover placement="left-bottom" content={<div>prompt text</div>}>
          <div>LB</div>
        </Popover>
        <Popover placement="right-bottom" content={<div>prompt text</div>}>
          <div>RB</div>
        </Popover>
      </div>
      <div className={`${prefix}-center`}>
        <Popover placement="bottom-left" content={<div>prompt text</div>}>
          <div>BL</div>
        </Popover>

        <Popover placement="bottom" content={<div>prompt text</div>}>
          <div>Bottom</div>
        </Popover>
        <Popover placement="bottom-right" content={<div>prompt text</div>}>
          <div>BR</div>
        </Popover>
      </div>
    </>
  );
};
export default App;
