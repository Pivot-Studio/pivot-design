import { Coordinate, Data, UniqueIdentifier } from '../types';
import Manager from '../context/manager';
import { verticalSortStrategy } from './verticalSortStrategy';
import { horizenSortStrategy } from './horizenSortStrategy';
import { gridSortStrategy } from './gridSortStrategy';
import { MutableRefObject } from 'react';
interface SortableRectifyProps {
  transform: Coordinate;
  coordinates: Coordinate;
  activeId: UniqueIdentifier;
  manager: Manager;
  overNodeRef: MutableRefObject<Data>;
  sortable: {
    direction: 'vertical' | 'horizen' | 'grid';
  };
}
export function sortableRectify(props: SortableRectifyProps) {
  const { transform, activeId, manager, sortable, overNodeRef, coordinates, containerRef } = props;

  const overContainerId = containerRef.current;
  const { direction = 'vertical' } = sortable;
  if (direction === 'vertical') {
    return verticalSortStrategy({ transform, activeId, manager, overNodeRef, overContainerId });
  } else if (direction === 'grid') {
    return gridSortStrategy({ activeId, manager, overNodeRef, coordinates });
  } else {
    return horizenSortStrategy({ transform, activeId, manager, overNodeRef });
  }
}
