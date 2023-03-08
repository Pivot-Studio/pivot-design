import React from 'react';
import { createPortal } from 'react-dom';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../../../constants';
import classnames from 'classnames';
import './DraggableItem.scss';
import { overlayStyle } from '../../utils';
import Handle from '../Handle/Handle';
import { useSortable } from '../../hooks/useSortable';

// TODO: 慢慢改吧，顺便sortStrategy那里也改成manager.get（droppable）
function SortableItem(props: DraggableItemProps) {
  const { className, children, id, index, top, left, handle = false } = props;
  const { setSortNode, isDragging, listener, activeRect, attributes, transform } = useSortable({ id, index });
  return (
    <>
      <div
        ref={setSortNode}
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

export default SortableItem;
