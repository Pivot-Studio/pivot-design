import { useState } from 'react';
import ReactDom from 'react-dom/client';
import DraggableListMdx from './src/components/DraggableList/index.mdx';
import ButtonMdx from './src/components/Button/index.mdx';
import { Button, DraggableItem, arrayMove, SortableContext } from 'pivot-design';
import CodeBlock from '@/components/codeBlock';
import './index.scss';
const App = () => {
  const [select, setSelect] = useState('DraggableList');
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const onDragEnd = ({ delta }) => {
    setCoordinates(({ x, y }) => {
      return {
        x: x + delta.x,
        y: y + delta.y,
      };
    });
  };
  const reorderItems = (oldIndex: number, newIndex: number) =>
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <div className={`demo-item ${select === 'Button' ? 'active' : ''}`} onClick={() => setSelect('Button')}>
          按钮
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
          {select === 'DraggableList' ? (
            <DraggableListMdx
              reorderItems={reorderItems}
              items={items}
              coordinates={coordinates}
              onDragEnd={onDragEnd}
              components={{
                SortableContext,
                DraggableItem,
                CodeBlock,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
