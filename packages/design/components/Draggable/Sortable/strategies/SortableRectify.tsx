import { Data, UniqueIdentifier } from '../../types';
import { verticalSortStrategy } from './verticalSortStrategy';
import { horizenSortStrategy } from './horizenSortStrategy';
import { gridSortStrategy } from './gridSortStrategy';
import { SortableData } from './types';
import { DroppableRectMap } from '../../../Draggable/context/types';
interface SortableRectifyProps {
  droppableRects: DroppableRectMap;
  index: number;
  type: 'vertical' | 'horizen' | 'grid';
  over?: Data<SortableData>;
  active?: Data<SortableData>;
  containerId: UniqueIdentifier;
}
export interface SortStrategyProps {
  droppableRects: DroppableRectMap;
  index: number;
  containerId: UniqueIdentifier;
  active?: SortableData;
  over?: SortableData;
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
