import classNames from 'classnames';
import { prefix } from '../../../constants';
import { ReactNode, useState } from 'react';
import { DndContext } from '../../context/DndContext';
import SortableItem from '../../components/Draggable/SortableItem';
import { arrayMove } from '../../utils';
import { DragEndEvent } from '../../sensors/events';
import './Sortable.scss';

const ListContainer = ({ children }) => (
  <div className={classNames(`${prefix}-sortable-wrap`, `__${prefix}-sortable-vertical`)}>{children}</div>
);

export function Sortable(props: any) {
  const { items: initialItems, itemClassName, direction, Container = ListContainer } = props;
  const [items, setItems] = useState<ReactNode[]>(() => initialItems ?? [1, 2, 3, 4, 5]);
  const reorderItems = ({ activeNode, overNode }: DragEndEvent) => {
    const activeSortable = activeNode && activeNode.current && activeNode.current['sortable'];
    const overSortable = overNode && overNode.current && overNode.current['sortable'];
    setItems((items) => arrayMove(items, activeSortable.index, overSortable.index));
  };
  return (
    <DndContext sortable={{ direction }} onDragEnd={reorderItems}>
      <Container>
        {items.map((item, index) => {
          return (
            <SortableItem className={itemClassName} index={index} key={index} id={item}>
              {item}
            </SortableItem>
          );
        })}
      </Container>
    </DndContext>
  );
}
