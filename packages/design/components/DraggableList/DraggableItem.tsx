import React, { ForwardRefExoticComponent } from 'react';
import { DraggableItemProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './DraggableItem.scss';
export interface ListItemTypeProps
  extends ForwardRefExoticComponent<
    DraggableItemProps & React.RefAttributes<HTMLElement>
  > {
  isDraggable: boolean;
}
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
const Item = React.forwardRef(DraggableItem) as ListItemTypeProps;
Item.isDraggable = false;
export default Item;
