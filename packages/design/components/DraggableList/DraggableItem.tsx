import React, { useContext } from 'react';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import { DndContext } from './utils/context';
import './DraggableItem.scss';

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
  const { activeId } = useContext(DndContext);
  return (
    <div
      onDragEnd={(e) => onDragEnd(e)}
      onDragEnter={(e) => onDragEnter(e)}
      onDragOver={(e) => onDragOver(e)}
      onDragStart={(e) => onDragStart(e)}
      className={classnames(`${prefix}-draggable-item`, className, {
        ['moving']: activeId === id,
      })}
      draggable
    >
      {children}
    </div>
  );
}
const Item = React.forwardRef(DraggableItem);
export default Item;
