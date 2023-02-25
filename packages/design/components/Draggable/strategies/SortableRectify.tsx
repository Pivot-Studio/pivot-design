import { Coordinate, UniqueIdentifier } from '../types';
import Manager from '../context/manager';
import { verticalSortStrategy } from './verticalSortStrategy';
import { horizenSortStrategy } from './horizenSortStrategy';
interface SortableRectifyProps {
  transform: Coordinate;
  activeId: UniqueIdentifier;
  manager: Manager;
  sortable: {
    direction: 'vertical' | 'horizen';
  };
}
export function sortableRectify(props: SortableRectifyProps) {
  const { transform, activeId, manager, sortable } = props;
  const { direction = 'vertical' } = sortable;
  if (direction === 'vertical') {
    return verticalSortStrategy({ transform, activeId, manager });
  } else {
    return horizenSortStrategy({ transform, activeId, manager });
  }
}
