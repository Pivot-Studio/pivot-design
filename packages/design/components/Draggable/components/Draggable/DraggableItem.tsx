import React from 'react';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../../../constants';
import classnames from 'classnames';
import { useDraggable } from '../../hooks/useDraggable';
import './DraggableItem.scss';
import Handle from '../Handle/Handle';
import { setTransform } from '../../utils';
function DraggableItem(props: DraggableItemProps) {
  const { className, children, top, left, handle = false, id, isDragOverlay } = props;
  const { isDragging, setDragNode, listener, attributes, transform } = useDraggable({
    id: id ? id : 'draggable',
  });
  return (
    <>
      <div
        ref={setDragNode}
        className={classnames(`${prefix}-draggable-item`, className, {
          [`${prefix}-draggable-overlay`]: isDragging,
          [`__${prefix}_handle`]: handle,
        })}
        style={{ top, left, ...attributes, ...(isDragOverlay ? setTransform(transform) : {}) }}
        {...(handle ? {} : listener)}
      >
        {children}
        {handle ? <Handle {...(handle ? listener : {})} /> : null}
      </div>
    </>
  );
}

const Item = React.forwardRef(DraggableItem);
export default Item;
