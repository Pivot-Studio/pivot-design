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
  // todo: overinto 别的container时，由于重新渲染导致rectClient变化，导致动画不流畅
  // 【同时】重新计算rectClient和transform
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
    </>
  );
}

export default SortableItem;
