import classNames from 'classnames';
import { prefix } from '../constants';
import { ReactNode, useState } from 'react';
import { SortableContext } from './context/SortableContext';
import { DraggableItem } from '.';
import { arrayMove } from './utils';
import { DragEndEvent } from './sensors/events';

export function Sortable(props: any) {
  const { items: initialItems, itemClassName } = props;
  const [items, setItems] = useState<ReactNode[]>(() => initialItems ?? [1, 2, 3, 4, 5]);
  const reorderItems = ({ newIndex, oldIndex }: DragEndEvent) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };
  return (
    <SortableContext sortable onDragEnd={reorderItems}>
      <div className={classNames(`${prefix}-sortable-wrap`)}>
        {items.map((item, index) => {
          return (
            <DraggableItem className={itemClassName} index={index} key={index}>
              {item}
            </DraggableItem>
          );
        })}
      </div>
    </SortableContext>
  );
}
