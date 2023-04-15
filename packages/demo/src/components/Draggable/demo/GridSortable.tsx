import { arrayMove, DndContext, SortableContext, SortableItem } from 'pivot-design';
import { DragEndEvent } from 'pivot-design/components/Draggable/sensors/events';
import { useState } from 'react';
import './GridSortable.scss';
const Container = ({ children }) => {
  return <div className={'demo-sortable-wrap __demo-sortable-grid'}>{children}</div>;
};
const GridSortable = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const reorderItems = ({ activeNode, overNode }: DragEndEvent) => {
    const activeSortable = activeNode && activeNode['sortable'];
    const overSortable = overNode && overNode['sortable'];
    setItems((items) => arrayMove(items, activeSortable.index, overSortable.index));
  };
  return (
    <DndContext onDragEnd={reorderItems}>
      <SortableContext items={items} id="A" type="grid">
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

export default GridSortable;
