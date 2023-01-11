import DraggableListMdx from '../components/DraggableList/index.mdx';
import { DraggableItem, arrayMove, SortableContext } from 'pivot-design';
import CodeBlock from '@/components/codeBlock';
import { useState } from 'react';

const Draggable = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const onDragEnd = ({ delta }: { delta: { x: number; y: number }; event: Event }) => {
    setCoordinates(({ x, y }) => {
      return {
        x: x + delta.x,
        y: y + delta.y,
      };
    });
  };
  const reorderItems = (oldIndex: number, newIndex: number) =>
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  return (
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
  );
};

export default Draggable;
