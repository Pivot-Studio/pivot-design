import { useState } from 'react';
import { Button, Icon, Input, Skeleton, Card, Popover, Modal } from 'pivot-design';
// import router from '@/routers';
import ButtonMdx from '../../components/Button/index.mdx';
import IconMdx from '../../components/Icon/index.mdx';
import InputMdx from '../../components/Input/index.mdx';
import CardMdx from '../../components/Card/index.mdx';
import SkeletonMdx from '../../components/Skeleton/index.mdx';
//import PopoverMdx from '@/components/Popover/index.mdx';
import ModalMdx from '../../components/Modal/index.mdx';
import PopoverMdx from '../../components/Popover/index.mdx';
import './index.scss';

import Draggable from '@/examples/Draggable/Draggable';
import CodeBlock from '@/components/_CodeBlock/codeBlock';

function Index() {
  const [select, setSelect] = useState('Modal');
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <div className={`demo-item ${select === 'Button' ? 'active' : ''}`} onClick={() => setSelect('Button')}>
          按钮
        </div>
        <div className={`demo-item ${select === 'Card' ? 'active' : ''}`} onClick={() => setSelect('Card')}>
          卡片
        </div>
        <div className={`demo-item ${select === 'Draggable' ? 'active' : ''}`} onClick={() => setSelect('Draggable')}>
          拖拽列表
        </div>
        <div className={`demo-item ${select === 'Skeleton' ? 'active' : ''}`} onClick={() => setSelect('Skeleton')}>
          骨架屏
        </div>
        <div className={`demo-item ${select === 'Icon' ? 'active' : ''}`} onClick={() => setSelect('Icon')}>
          图标
        </div>
        <div className={`demo-item ${select === 'Input' ? 'active' : ''}`} onClick={() => setSelect('Input')}>
          输入框
        </div>
        <div className={`demo-item ${select === 'Popover' ? 'active' : ''}`} onClick={() => setSelect('Popover')}>
          气泡
        </div>
        <div className={`demo-item ${select === 'Modal' ? 'active' : ''}`} onClick={() => setSelect('Modal')}>
          弹窗
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
        {select === 'Draggable' ? <Draggable /> : null}
        {select === 'Skeleton' ? <SkeletonMdx components={{ Skeleton, CodeBlock }} /> : null}
        {select === 'Modal' ? <ModalMdx components={{ Modal, CodeBlock }} /> : null}
      </div>
      <div className="demo-component-catalogue" style={{ width: '200px' }}>
        1
      </div>
    </div>
  );
}
export default Index;
