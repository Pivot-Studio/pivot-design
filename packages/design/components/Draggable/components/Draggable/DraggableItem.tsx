import React from 'react';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../../../constants';
import classnames from 'classnames';
import { useDraggable } from '../../hooks/useDraggable';
import './DraggableItem.scss';
import Handle from '../Handle/Handle';
function DraggableItem(props: DraggableItemProps) {
  const { className, children, top, left, handle = false, id } = props;
  const { isDragging, setDragNode, listener, attributes, hasDragOverlay } = useDraggable({
    id: id ? id : 'draggable',
  });
  return (
    <>
      <div
        ref={setDragNode}
        className={classnames(`${prefix}-draggable-item`, className, {
          [`__${prefix}_hidden`]: isDragging && hasDragOverlay,
          [`__${prefix}_dragging`]: isDragging,
          [`__${prefix}_handle`]: handle,
        })}
        style={{ top, left, ...attributes }}
        {...(handle ? {} : listener)}
      >
        {children}
        {handle ? <Handle {...(handle ? listener : {})} isDragging={isDragging} /> : null}
      </div>
    </>
  );
}

export default DraggableItem;
