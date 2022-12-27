import { useState } from 'react';
import ReactDom from 'react-dom/client';
import DraggableListMdx from './src/components/DraggableList/index.mdx';
import ButtonMdx from './src/components/Button/index.mdx';
import CardMdx from './src/components/Card/index.mdx';
import { Button, DraggableList, DraggableItem, arrayMove, Card } from 'pivot-design';
import CodeBlock from '@/components/codeBlock';
import './index.scss';
const App = () => {
  const [select, setSelect] = useState('DraggableList');
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const reorderItems = (oldIndex: number, newIndex: number) =>
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <div className={`demo-item ${select === 'Button' ? 'active' : ''}`} onClick={() => setSelect('Button')}>
          按钮
        </div>
        <div className={`demo-item ${select === 'Card' ? 'active' : ''}`} onClick={() => setSelect('Card')}>
          卡片
        </div>
        <div
          className={`demo-item ${select === 'DraggableList' ? 'active' : ''}`}
          onClick={() => setSelect('DraggableList')}
        >
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
          {/* <<<<<< HEAD */}
          {select === 'Card' ? <CardMdx components={{ Card, CodeBlock }} /> : null}
          {/* ======= */}
          {select === 'DraggableList' ? (
            <DraggableListMdx
              reorderItems={reorderItems}
              items={items}
              components={{
                DraggableList,
                DraggableItem,
                CodeBlock,
              }}
            />
          ) : // >>>>>>> c8b6e485e39e8e151ec5e9b313998d9198079c02
            null}
        </div>
      </div>
    </div>
  );
};
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
