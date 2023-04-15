import React from 'react';
import { prefix } from '../../constants';
import classnames from 'classnames';
import './SortableItem.scss';
import Handle from '../components/Handle/Handle';
import { useSortable } from './useSortable';

function SortableItem(props: any) {
  const { className, children, id, index, handle = false } = props;
  const { setSortNode, hasDragOverlay, isActive, listener, attributes } = useSortable({
    id,
    index,
  });
  return (
    <>
      <div
        ref={setSortNode}
        className={classnames(`${prefix}-sortable-item`, className, {
          [`__${prefix}_dragging`]: !hasDragOverlay && isActive,
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
