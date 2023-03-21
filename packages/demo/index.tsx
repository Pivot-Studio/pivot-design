import { useState } from 'react';
import ReactDom from 'react-dom/client';
import ButtonMdx from './src/components/Button/index.mdx';
import IconMdx from './src/components/Icon/index.mdx';
import InputMdx from './src/components/Input/index.mdx';
import { Button, Icon, Input } from 'pivot-design';
import CardMdx from './src/components/Card/index.mdx';
import { Card } from 'pivot-design';
import Draggable from '@/examples/Draggable/Draggable';
import CodeBlock from '@/components/codeBlock';
import './index.scss';
const App = () => {
  const [select, setSelect] = useState('Input');
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
        <div className={`demo-item ${select === 'Icon' ? 'active' : ''}`} onClick={() => setSelect('Icon')}>
          图标
        </div>
        <div className={`demo-item ${select === 'Input' ? 'active' : ''}`} onClick={() => setSelect('Input')}>
          输入框
        </div>
      </div>
    );
  };

  return (
    <div className="pivot-design-docs">
      <div className="pivot-design-docs-title">
        <div className="title">Pivot-Design</div>
      </div>
      <div className="pivot-design-docs-content">
        {demoSelect()}
        <div className="demo-component">
          {select === 'Button' ? <ButtonMdx components={{ Button, CodeBlock }} /> : null}
          {select === 'Icon' ? <IconMdx components={{ Icon, CodeBlock }} /> : null}
          {select === 'Input' ? <InputMdx components={{ Input, CodeBlock }} /> : null}
          {select === 'Card' ? <CardMdx components={{ Card, CodeBlock }} /> : null}
          {select === 'Draggable' ? <Draggable /> : null}
        </div>
      </div>
    </div>
  );
};
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
