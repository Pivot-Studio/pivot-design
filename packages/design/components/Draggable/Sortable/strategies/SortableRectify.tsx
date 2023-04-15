import { UniqueIdentifier } from '../../types';
import { verticalSortStrategy } from './verticalSortStrategy';
import { horizenSortStrategy } from './horizenSortStrategy';
import { gridSortStrategy } from './gridSortStrategy';
import { SortableData } from './types';
interface SortableRectifyProps {
  droppableRects: DOMRect[];
  index: number;
  type: 'vertical' | 'horizen' | 'grid';
  over?: SortableData;
  active?: SortableData;
  containerId: UniqueIdentifier;
}
export function sortableRectify(props: SortableRectifyProps) {
  const { index, over, active, containerId, droppableRects, type } = props;

  if (type === 'vertical') {
    return verticalSortStrategy({ index, active, over, containerId, droppableRects });
  } else if (type === 'horizen') {
    return horizenSortStrategy({ index, active, over, containerId, droppableRects });
  } else {
    return gridSortStrategy({ index, active, over, containerId, droppableRects });
  }
}
