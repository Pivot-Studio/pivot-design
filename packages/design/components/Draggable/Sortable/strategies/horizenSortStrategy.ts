import { UniqueIdentifier } from '../../types';
import { SortableData } from './types';

interface HorizenSortStrategyProps {
  droppableRects: DOMRect[];
  index: number;
  containerId: UniqueIdentifier;
  active: SortableData;
  over: SortableData;
}

function getItemGap(clientRects: DOMRect[], index: number, activeIndex: number) {
  const currentRect: DOMRect | undefined = clientRects[index];
  const previousRect: DOMRect | undefined = clientRects[index - 1];
  const nextRect: DOMRect | undefined = clientRects[index + 1];

  if (!currentRect) {
    return 0;
  }

  if (activeIndex < index) {
    return previousRect
      ? currentRect.left - (previousRect.left + previousRect.width)
      : nextRect
      ? nextRect.left - (currentRect.left + currentRect.width)
      : 0;
  }

  return nextRect
    ? nextRect.left - (currentRect.left + currentRect.width)
    : previousRect
    ? currentRect.left - (previousRect.left + previousRect.width)
    : 0;
}

export const horizenSortStrategy = ({
  index,
  active,
  over,
  containerId,
  droppableRects: rects,
}: HorizenSortStrategyProps) => {
  if (!active || !over) {
    return {
      x: 0,
      y: 0,
    };
  }
  const activeSortable = active.sortable;
  const overSortable = over.sortable;
  const { index: activeIndex, containerId: activeContainer } = activeSortable;
  const { index: overIndex, containerId: overContainer } = overSortable;

  const activeRect = rects[activeIndex];
  const overRect = rects[overIndex];
  if (!activeRect) {
    return {
      x: 0,
      y: 0,
    };
  }
  if (activeContainer === overContainer) {
    if (index === activeIndex) {
      return {
        x: 0,
        y: 0,
      };
    }

    if (index < activeIndex && index >= overIndex) {
      return {
        x: activeRect.width + getItemGap(rects, index, activeIndex),
        y: 0,
      };
    }
    // active node is moving down
    if (index > activeIndex && index <= overIndex) {
      return {
        x: -(activeRect.width + getItemGap(rects, index, activeIndex)),
        y: 0,
      };
    }
    return {
      x: 0,
      y: 0,
    };
  } else {
    return {
      x: 0,
      y: 0,
    };
  }
};
