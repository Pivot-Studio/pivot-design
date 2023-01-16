import React from 'react';
import { createPortal } from 'react-dom';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import { useDraggable } from './hooks/useDraggable';
import './DraggableItem.scss';
import { useUniqueId } from '../hooks/useUniqueId';
import { overlayStyle } from './utils';

function DraggableItem(props: DraggableItemProps) {
  const { className, children, index, top, left } = props;
  const { id, index: globalIndex } = useUniqueId();
  const { isDragging, setDragNode, listener, transform, attributes, activeRect } = useDraggable({
    index: index !== undefined ? index : globalIndex,
    id,
  });
  return (
    <>
      <div
        ref={setDragNode}
        className={classnames(`${prefix}-draggable-item`, className, {
          [`__${prefix}_dragging`]: isDragging,
        })}
        style={{ top, left, ...attributes }}
        {...listener}
      >
        {children}
      </div>
      {isDragging
        ? createPortal(
            <div
              className={classnames(`${prefix}-draggable-item`, `${prefix}-draggable-overlay`, className)}
              style={overlayStyle(activeRect!.current, transform)}
            >
              {children}
            </div>,
            document.body
          )
        : null}
    </>
  );
}

const Item = React.forwardRef(DraggableItem);
export default Item;
