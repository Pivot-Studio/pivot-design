import React from 'react';
import { DraggableListProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import DraggableItem from './DraggableItem';
import './DraggableList.scss';
const DraggableList: React.FC<DraggableListProps> & {
  Item: React.FC;
} = (props) => {
  // eslint-disable-next-line react/prop-types
  const { className, style, children } = props;
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const { target } = e;
    (target as any).isDragging = true;
  };
  return (
    <div
      className={classnames(`${prefix}-draggable-list`, className)}
      style={style}
      onDragStart={(e) => dragStartHandler(e)}
    >
      {children}
    </div>
  );
};
DraggableList.Item = DraggableItem;
export default DraggableList;
