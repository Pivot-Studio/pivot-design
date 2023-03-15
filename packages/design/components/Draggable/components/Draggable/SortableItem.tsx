import React from 'react';
import { prefix } from '../../../constants';
import classnames from 'classnames';
import './DraggableItem.scss';
import Handle from '../Handle/Handle';
import { useSortable } from '../../hooks/useSortable';

function SortableItem(props: any) {
  const { className, children, id, containerId, index, handle = false, isDragOverlay } = props;
  const { setSortNode, hasDragOverlay, isDragging, listener, attributes } = useSortable({
    id,
    index,
    containerId,
    isDragOverlay,
  });
  return (
    <>
      <div
        ref={setSortNode}
        className={classnames(`${prefix}-draggable-item`, className, {
          [`${prefix}-draggable-overlay`]: isDragOverlay,
          [`__${prefix}_dragging`]: !isDragOverlay && hasDragOverlay && isDragging,
          [`__${prefix}_handle`]: handle,
        })}
        style={{ ...attributes }}
        {...(handle ? {} : listener)}
      >
        {children}
        {handle ? <Handle {...(handle ? listener : {})} /> : null}
      </div>
      {/* {isDragging
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
        : null} */}
    </>
  );
}

export default SortableItem;
