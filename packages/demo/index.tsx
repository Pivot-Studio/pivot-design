import { useState } from 'react';
import ReactDom from 'react-dom/client';
import ButtonMdx from './src/components/Button/index.mdx';
import CardMdx from './src/components/Card/index.mdx';
import SkeletonMdx from './src/components/Skeleton/index.mdx';
import { Skeleton } from 'pivot-design';
import { Card } from 'pivot-design';
import Draggable from '@/examples/Draggable/Draggable.tsx';
import { Button } from 'pivot-design';
import CodeBlock from '@/components/codeBlock';
import './index.scss';
const App = () => {
  const [select, setSelect] = useState('Button');
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
          {select === 'Card' ? <CardMdx components={{ Card, CodeBlock }} /> : null}

          {select === 'Draggable' ? <Draggable /> : null}
          {select === 'Skeleton' ? <SkeletonMdx components={{ Skeleton, CodeBlock }} /> : null}
        </div>
      </div>
    </div>
  );
};
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
