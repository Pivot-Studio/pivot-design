import { useState } from 'react';
import { Button, Icon, Input, Skeleton, Card, Popover, Transition } from 'pivot-design';
// import router from '@/routers';
import ButtonMdx from '../../components/Button/index.mdx';
import IconMdx from '../../components/Icon/index.mdx';
import InputMdx from '../../components/Input/index.mdx';
import CardMdx from '../../components/Card/index.mdx';
import SkeletonMdx from '../../components/Skeleton/index.mdx';
import PopoverMdx from '../../components/Popover/index.mdx';
import TransitionMdx from '../../components/Transition/index.mdx';

import './index.scss';

import DraggableMdx from '../../components/Draggable/index.mdx';
import CodeBlock from '@/components/_CodeBlock/codeBlock';

function Index() {
  const [select, setSelect] = useState('Transition');
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <div className={`demo-item ${select === 'Button' ? 'active' : ''}`} onClick={() => setSelect('Button')}>
          Button 按钮
        </div>
        <div className={`demo-item ${select === 'Card' ? 'active' : ''}`} onClick={() => setSelect('Card')}>
          Card 卡片
        </div>
        <div className={`demo-item ${select === 'Draggable' ? 'active' : ''}`} onClick={() => setSelect('Draggable')}>
          Draggable 拖拽列表
        </div>
        <div className={`demo-item ${select === 'Skeleton' ? 'active' : ''}`} onClick={() => setSelect('Skeleton')}>
          Skeleton 骨架屏
        </div>
        <div className={`demo-item ${select === 'Icon' ? 'active' : ''}`} onClick={() => setSelect('Icon')}>
          Icon 图标
        </div>
        <div className={`demo-item ${select === 'Input' ? 'active' : ''}`} onClick={() => setSelect('Input')}>
          Input 输入框
        </div>
        <div className={`demo-item ${select === 'Popover' ? 'active' : ''}`} onClick={() => setSelect('Popover')}>
          Popover 气泡
        </div>
        <div className={`demo-item ${select === 'Transition' ? 'active' : ''}`} onClick={() => setSelect('Transition')}>
          元素动画
        </div>
      </div>
    );
  };

  return (
    <div className="pivot-design-docs-content">
      {demoSelect()}
      <div className="demo-component" id="nice">
        {select === 'Button' ? <ButtonMdx components={{ Button, CodeBlock }} /> : null}
        {select === 'Icon' ? <IconMdx components={{ Icon, CodeBlock }} /> : null}
        {select === 'Input' ? <InputMdx components={{ Input, CodeBlock }} /> : null}
        {select === 'Card' ? <CardMdx components={{ Card, CodeBlock }} /> : null}
        {select === 'Popover' ? <PopoverMdx components={{ Popover, CodeBlock }} /> : null}
        {select === 'Draggable' ? (
          <DraggableMdx
            components={{
              CodeBlock,
            }}
          />
        ) : null}
        {select === 'Transition' ? <TransitionMdx components={{ Transition, CodeBlock }} /> : null}
        {select === 'Skeleton' ? <SkeletonMdx components={{ Skeleton, CodeBlock }} /> : null}
      </div>
      <div className="demo-component-catalogue" style={{ width: '200px' }}></div>
    </div>
  );
}
export default Index;
