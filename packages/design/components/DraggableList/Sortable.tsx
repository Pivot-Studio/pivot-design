import classNames from 'classnames';
import { prefix } from '../constants';
import { ReactNode, useState } from 'react';
import { SortableContext } from './context/SortableContext';
import { DraggableItem } from '.';

export function Sortable(props: any) {
  const { items: initialItems, itemClassName } = props;
  const [items, setItems] = useState<ReactNode[]>(() => initialItems ?? [1, 2, 3, 4, 5]);
  return (
    <SortableContext>
      <div className={classNames(`${prefix}-sortable-wrap`)}>
        {items.map((item, index) => {
          return (
            <DraggableItem className={itemClassName} index={index}>
              {item}
            </DraggableItem>
          );
        })}
      </div>
    </SortableContext>
  );
}
