import classNames from 'classnames';
import { prefix } from '../../../constants';
import { ReactNode, useRef, useState } from 'react';
import { DndContext } from '../../context/DndContext';
import SortableItem from '../../components/Draggable/SortableItem';
import { arrayMove } from '../../utils';
import { DragEndEvent } from '../../sensors/events';
import './Sortable.scss';
import { useDroppable } from '../../hooks/useDroppable';
import { createPortal } from 'react-dom';

const ListContainer = ({ children, id }) => {
  const { setDropNode } = useDroppable({ id, data: { sortable: { type: 'container' } } });
  return (
    <div ref={setDropNode} className={classNames(`${prefix}-sortable-wrap`, `__${prefix}-sortable-vertical`)}>
      {children}
    </div>
  );
};

export function Sortable(props: any) {
  const { items: initialItems, itemClassName, direction, Container = ListContainer, containerId = 'A' } = props;
  const [items, setItems] = useState<ReactNode[]>(() => initialItems ?? [1, 2, 3, 4, 5]);
  const renderDragOverlay = ({ id, index }) => {
    return createPortal(
      <SortableItem className={itemClassName} isDragOverlay={true} id={id}>
        {items[index]}
      </SortableItem>,
      document.body
    );
  };
  const reorderItems = ({ activeNode, overNode }: DragEndEvent) => {
    const activeSortable = activeNode && activeNode.current && activeNode.current['sortable'];
    const overSortable = overNode && overNode.current && overNode.current['sortable'];
    setItems((items) => arrayMove(items, activeSortable.index, overSortable.index));
  };
  return (
    <DndContext
      sortable={{ direction, containerId }}
      onDragMove={() => {
        console.log();
      }}
      onDragEnd={reorderItems}
      hasDragOverlay
      DragOverlay={renderDragOverlay}
    >
      <Container id={containerId}>
        {items.map((item, index) => {
          return (
            <SortableItem className={itemClassName} index={index} key={index} id={item} containerId={containerId}>
              {item}
            </SortableItem>
          );
        })}
      </Container>
    </DndContext>
  );
}
