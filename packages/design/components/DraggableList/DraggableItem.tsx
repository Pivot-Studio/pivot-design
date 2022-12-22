import React from 'react';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import { useDraggable } from '../hooks/useDraggable';
import './DraggableItem.scss';
import { useUniqueId } from '../hooks/useUniqueId';
function DraggableItem(props: DraggableItemProps) {
  const { className, children } = props;
  const { isDragging, setDragNode } = useDraggable(useUniqueId());
  return (
    <div
      ref={setDragNode}
      className={classnames(`${prefix}-draggable-item`, className, {
        [`__${prefix}_dragging`]: isDragging,
      })}
    >
      {children}
    </div>
  );
}

const Item = React.forwardRef(DraggableItem);
export default Item;
