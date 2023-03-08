import { Coordinate, UniqueIdentifier } from '../types';
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
  newIndexRef: MutableRefObject<number>;
  sortable: {
    direction: 'vertical' | 'horizen' | 'grid';
  };
}
export function sortableRectify(props: SortableRectifyProps) {
  const { transform, activeId, manager, sortable, newIndexRef, coordinates } = props;
  const { direction = 'vertical' } = sortable;
  if (direction === 'vertical') {
    return verticalSortStrategy({ transform, activeId, manager, newIndexRef });
  } else if (direction === 'grid') {
    return gridSortStrategy({ activeId, manager, newIndexRef, coordinates });
  } else {
    return horizenSortStrategy({ transform, activeId, manager, newIndexRef });
  }
}
