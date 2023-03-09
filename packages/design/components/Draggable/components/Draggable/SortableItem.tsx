import React from 'react';
import { createPortal } from 'react-dom';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../../../constants';
import classnames from 'classnames';
import './DraggableItem.scss';
import { overlayStyle } from '../../utils';
import Handle from '../Handle/Handle';
import { useSortable } from '../../hooks/useSortable';

function SortableItem(props: any) {
  const { className, children, id, index, handle = false } = props;
  const { setSortNode, isDragging, listener, activeRect, attributes, transform } = useSortable({ id, index });

  return (
    <>
      <div
        ref={setSortNode}
        className={classnames(`${prefix}-draggable-item`, className, {
          [`__${prefix}_dragging`]: isDragging,
          [`__${prefix}_handle`]: handle,
        })}
        style={{ ...attributes }}
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
