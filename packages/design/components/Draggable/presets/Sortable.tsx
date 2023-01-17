import classNames from 'classnames';
import { prefix } from '../../constants';
import { ReactNode, useState } from 'react';
import { DndContext } from '../context/DndContext';
import { DraggableItem } from '..';
import { arrayMove } from '../utils';
import { DragEndEvent } from '../sensors/events';
import './Sortable.scss';
export function Sortable(props: any) {
  const { items: initialItems, itemClassName } = props;
  const [items, setItems] = useState<ReactNode[]>(() => initialItems ?? [1, 2, 3, 4, 5]);
  const reorderItems = ({ newIndex, oldIndex }: DragEndEvent) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };
  return (
    <DndContext sortable onDragEnd={reorderItems}>
      <div className={classNames(`${prefix}-sortable-wrap`)}>
        {items.map((item, index) => {
          return (
            <DraggableItem className={itemClassName} index={index} key={index}>
              {item}
            </DraggableItem>
          );
        })}
      </div>
    </DndContext>
  );
}
