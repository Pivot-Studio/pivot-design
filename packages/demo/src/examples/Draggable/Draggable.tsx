import DraggableMdx from '../../components/Draggable/index.mdx';
import { DraggableItem, Droppable, arrayMove, DndContext, Sortable, MultipleContainer } from 'pivot-design';
import CodeBlock from '@/components/codeBlock';
import { useState } from 'react';

const Draggable = () => {
  const DraggableBlock = () => (
    <DraggableItem className="demo-draggable-item" id={'A'}>
      draggable
    </DraggableItem>
  );
  const [parent, setParent] = useState('');
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const onDragEnd = ({ delta, activeNode }: { delta: { x: number; y: number }; event: Event }) => {
    setCoordinates(({ x, y }) => {
      return {
        x: x + delta.x,
        y: y + delta.y,
      };
    });
  };
  const onDragEnd2 = ({ id, isDrop }: { id: string; isDrop: boolean }) => {
    setParent(isDrop ? id : '');
  };
  const reorderItems = (oldIndex: number, newIndex: number) =>
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  const HorizenContainer = ({ children }) => (
    <div className="PIVOT-sortable-wrap __PIVOT-sortable-horizen">{children}</div>
  );
  const GridContainer = ({ children }) => <div className="PIVOT-sortable-wrap __PIVOT-sortable-grid">{children}</div>;
  return (
    <DraggableMdx
      reorderItems={reorderItems}
      items={items}
      coordinates={coordinates}
      onDragEnd={onDragEnd}
      parent={parent}
      onDragEnd2={onDragEnd2}
      HorizenContainer={HorizenContainer}
      GridContainer={GridContainer}
      components={{
        DndContext,
        Droppable,
        DraggableItem,
        CodeBlock,
        Sortable,
        DraggableBlock,
        MultipleContainer,
      }}
    />
  );
};

export default Draggable;
