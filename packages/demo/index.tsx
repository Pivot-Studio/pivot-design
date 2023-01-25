import { useState } from 'react';
import ReactDom from 'react-dom/client';
import ButtonMdx from './src/components/Button/index.mdx';
import Draggable from '@/examples/Draggable/Draggable';
import { Button } from 'pivot-design';
import CodeBlock from '@/components/codeBlock';
import './index.scss';
const App = () => {
  const [select, setSelect] = useState('Draggable');
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <div className={`demo-item ${select === 'Button' ? 'active' : ''}`} onClick={() => setSelect('Button')}>
          按钮
        </div>
        <div className={`demo-item ${select === 'Draggable' ? 'active' : ''}`} onClick={() => setSelect('Draggable')}>
          拖拽列表
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
          {select === 'Draggable' ? <Draggable /> : null}
        </div>
      </div>
    </div>
  );
};
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
