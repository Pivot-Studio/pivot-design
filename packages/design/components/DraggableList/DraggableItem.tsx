import React from 'react';
import { createPortal } from 'react-dom';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import { useDraggable } from './hooks/useDraggable';
import './DraggableItem.scss';
import { useUniqueId } from '../hooks/useUniqueId';
import { Coordinate } from './types';
import { vendorPrefix } from '../utils';
function overlayStyle(
  activeRect: {
    marginRect: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    } | null;
    clientRect: DOMRect | null;
  },
  transform: Coordinate
): React.CSSProperties {
  const { marginRect, clientRect } = activeRect;
  const { height, width, x, y } = clientRect!;
  const { top, left } = marginRect!;
  return {
    height: `${height}px`,
    left: `${x - left}px`,
    top: `${y - top}px`,
    width: `${width}px`,
    boxSizing: 'border-box',
    position: 'fixed',
    [`${vendorPrefix}Transform`]: `translate3d(${transform.x}px,${transform.y}px,0)`,
  };
}

function DraggableItem(props: DraggableItemProps) {
  const { className, children, top, left } = props;
  const { isDragging, setDragNode, listener, transform, activeRect } = useDraggable(useUniqueId());
  return (
    <>
      <div
        ref={setDragNode}
        className={classnames(`${prefix}-draggable-item`, className, {
          [`__${prefix}_dragging`]: isDragging,
        })}
        style={{ top, left }}
        {...listener}
      >
        {children}
      </div>
      {isDragging
        ? createPortal(
            <div
              className={classnames(`${prefix}-draggable-item`, `${prefix}-draggable-overlay`, className)}
              style={overlayStyle(activeRect.current, transform)}
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
