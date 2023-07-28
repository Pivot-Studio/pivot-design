import { arrayMove, DndContext, SortableContext, SortableItem } from 'pivot-design';
import { DragEndEvent } from 'pivot-design/components/Draggable/sensors/events';
import { useState } from 'react';
import './VerticalSortable.scss';
const Container = ({ children }) => {
  return <div className={'demo-sortable-wrap __demo-sortable-vertical'}>{children}</div>;
};
const VerticalSortable = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const reorderItems = ({ active, over }: DragEndEvent) => {
    setItems((items) => arrayMove(items, active.index, over.index));
  };
  return (
    <DndContext onDragEnd={reorderItems}>
      <SortableContext items={items} id="A">
        <Container>
          {items.map((item, index) => {
            return (
              <SortableItem id={item} className="demo-sortable-item" key={index} index={index}>
                {item}
              </SortableItem>
            );
          })}
        </Container>
      </SortableContext>
    </DndContext>
  );
};

export default VerticalSortable;
