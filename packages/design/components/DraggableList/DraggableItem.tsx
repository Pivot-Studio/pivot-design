import React from 'react';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './DraggableItem.scss';

function DraggableItem(props: DraggableItemProps) {
  const { className, style, children } = props;
  return (
    <div
      className={classnames(`${prefix}-draggable-item`, className)}
      draggable
      style={style}
    >
      {children}
    </div>
  );
}
const Item = React.forwardRef(DraggableItem);
export default Item;
