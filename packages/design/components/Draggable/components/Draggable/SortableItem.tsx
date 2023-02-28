import React from 'react';
import { createPortal } from 'react-dom';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../../../constants';
import classnames from 'classnames';
import { useDraggable } from '../../hooks/useDraggable';
import './DraggableItem.scss';
import { useUniqueId } from '../../hooks/useUniqueId';
import { overlayStyle } from '../../utils';
import Handle from '../Handle/Handle';
import { useDroppable } from '../../hooks/useDroppable';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
// TODO: 慢慢改吧，顺便sortStrategy那里也改成manager.get（droppable）
function DraggableItem(props: DraggableItemProps) {
  const { className, children, id, index, top, left, handle = false } = props;
  const { id: _id, index: globalIndex } = useUniqueId(id);
  const { isDragging, setDragNode, listener, transform, attributes, activeRect } = useDraggable({
    index: index !== undefined ? index : globalIndex,
    id: _id,
  });
  const { setDropNode } = useDroppable({ index: index !== undefined ? index : globalIndex, id: _id });
  const setNodeRef = useCombinedRefs(setDragNode, setDropNode);
  return (
    <>
      <div
        ref={setNodeRef}
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
