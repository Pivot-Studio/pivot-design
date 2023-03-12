import React from 'react';
import { createPortal } from 'react-dom';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../../../constants';
import classnames from 'classnames';
import { useDraggable } from '../../hooks/useDraggable';
import './DraggableItem.scss';
import { overlayStyle } from '../../utils';
import Handle from '../Handle/Handle';
function DraggableItem(props: DraggableItemProps) {
  const { className, children, top, left, handle = false, id } = props;
  const { isDragging, setDragNode, listener, transform, attributes, activeRect } = useDraggable({
    id: id ? id : 'draggable',
  });
  return (
    <>
      <div
        ref={setDragNode}
        className={classnames(`${prefix}-draggable-item`, className, {
          [`__${prefix}_dragging`]: isDragging,
          [`__${prefix}_handle`]: handle,
        })}
        style={{ top, left, ...attributes }}
        {...(handle ? {} : listener)}
      >
        {children}
        {handle ? <Handle {...(handle ? listener : {})} /> : null}
      </div>
      {isDragging
        ? createPortal(
            <div
              className={classnames(`${prefix}-draggable-item`, `${prefix}-draggable-overlay`, className, {
                [`__${prefix}_handle`]: handle,
              })}
              style={overlayStyle(activeRect!.current, transform)}
            >
              {children}
              {handle ? <Handle {...(handle ? listener : {})} /> : null}
            </div>,
            document.body
          )
        : null}
    </>
  );
}

const Item = React.forwardRef(DraggableItem);
export default Item;
