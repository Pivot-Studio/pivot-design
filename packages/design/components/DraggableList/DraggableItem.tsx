import React, { useContext, useRef } from 'react';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import { Context } from './utils/context';
import { useDraggable } from './hooks/useDraggable';

import './DraggableItem.scss';
import { useUniqueId } from './hooks/useUniqueId';

function DraggableItem(props: DraggableItemProps) {
  const {
    className,
    children,
    id,
    onDragEnd = () => {},
    onDragEnter = () => {},
    onDragOver = () => {},
    onDragStart = () => {},
  } = props;
  // const contextValue = useContext(Context);
  // const { activeId } = contextValue;
  const { isDragging, dragNode, setDragNode } = useDraggable(useUniqueId());
  return (
    <div
      ref={setDragNode}
      onDragEnd={(e) => onDragEnd(e)}
      onDragEnter={(e) => onDragEnter(e)}
      onDragOver={(e) => onDragOver(e)}
      onDragStart={(e) => onDragStart(e)}
      className={classnames(`${prefix}-draggable-item`, className, {
        ['moving']: isDragging,
      })}
      // draggable
    >
      {children}
    </div>
  );
}

const Item = React.forwardRef(DraggableItem);
export default Item;
