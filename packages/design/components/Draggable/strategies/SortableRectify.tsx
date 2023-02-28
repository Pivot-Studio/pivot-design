import { Coordinate, UniqueIdentifier } from '../types';
import Manager from '../context/manager';
import { verticalSortStrategy } from './verticalSortStrategy';
import { horizenSortStrategy } from './horizenSortStrategy';
import { gridSortStrategy } from './gridSortStrategy';
import { Collision } from '../utils/collisionDetection';
import { MutableRefObject } from 'react';
interface SortableRectifyProps {
  transform: Coordinate;
  activeId: UniqueIdentifier;
  manager: Manager;
  collisions: Collision[];
  newIndexRef: MutableRefObject<number>;
  sortable: {
    direction: 'vertical' | 'horizen' | 'grid';
  };
}
export function sortableRectify(props: SortableRectifyProps) {
  const { transform, activeId, manager, sortable, collisions, newIndexRef } = props;
  const { direction = 'vertical' } = sortable;
  if (direction === 'vertical') {
    return verticalSortStrategy({ transform, activeId, manager, newIndexRef });
  } else if (direction === 'grid') {
    return gridSortStrategy({ transform, activeId, manager, collisions, newIndexRef });
  } else {
    return horizenSortStrategy({ transform, activeId, manager, newIndexRef });
  }
}
