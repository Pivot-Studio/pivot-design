import classNames from 'classnames';
import { prefix } from '../../constants';
import { ReactNode, useState } from 'react';
import { DndContext } from '../context/DndContext';
import SortableItem from '../components/Draggable/SortableItem';
import { arrayMove } from '../utils';
import { DragEndEvent } from '../sensors/events';
import './Sortable.scss';
export function Sortable(props: any) {
  const { items: initialItems, itemClassName, direction } = props;
  const [items, setItems] = useState<ReactNode[]>(() => initialItems ?? [1, 2, 3, 4, 5]);
  const reorderItems = ({ newIndex, oldIndex }: DragEndEvent) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };
  // TODO：container的用户自定义
  return (
    <DndContext sortable={{ direction }} onDragEnd={reorderItems}>
      <div
        className={classNames(`${prefix}-sortable-wrap`, {
          [`__${prefix}-sortable-vertical`]: direction === 'vertical',
          [`__${prefix}-sortable-horizen`]: direction === 'horizen',
          [`__${prefix}-sortable-grid`]: direction === 'grid',
        })}
      >
        {items.map((item, index) => {
          return (
            <SortableItem className={itemClassName} index={index} key={index}>
              {item}
            </SortableItem>
          );
        })}
      </div>
    </DndContext>
  );
}
