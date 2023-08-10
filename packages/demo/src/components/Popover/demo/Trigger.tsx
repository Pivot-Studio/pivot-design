import { Popover } from 'pivot-design';
import React from 'react';
import { prefix } from '../../constant';
import './index.scss';
import { prefix } from '../../constant';


const App: React.FC = () => {
  return (
    <>
      <div className={`${prefix}-center`}>
        <Popover placement="top" triggerType="hover" content={<div>prompt text</div>}>
          <div className="tl">hover</div>
        </Popover>
        <Popover placement="top" triggerType="click" content={<div>prompt text</div>}>
          <div className="tl">click</div>
        </Popover>
      </div>
    </>
  );
};
export default App;
