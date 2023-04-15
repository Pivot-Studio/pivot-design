import { Coordinate, Data, UniqueIdentifier } from '../../types';
import Manager from '../../context/manager';
import { verticalSortStrategy } from './verticalSortStrategy';
import { horizenSortStrategy } from './horizenSortStrategy';
import { gridSortStrategy } from './gridSortStrategy';
import { MutableRefObject } from 'react';
interface SortableRectifyProps {
  droppableRects: { clientRect: DOMRect; id: UniqueIdentifier }[];
}
export function sortableRectify(props: any) {
  const { index, over, active, containerId, droppableRects, type } = props;

  // if (direction === 'vertical') {
  //   return verticalSortStrategy({ transform, activeId, manager, overNodeRef, overContainerId, activeRectRef });
  // } else if (direction === 'grid') {
  //   return gridSortStrategy({ activeId, manager, overNodeRef, coordinates });
  // } else {
  //   return horizenSortStrategy({ transform, activeId, manager, overNodeRef });
  // }
  if (type === 'vertical') {
    return verticalSortStrategy({ index, active, over, containerId, droppableRects });
  } else if (type === 'horizen') {
    return horizenSortStrategy({ index, active, over, containerId, droppableRects });
  } else {
    return gridSortStrategy({ index, active, over, containerId, droppableRects });
  }
}
