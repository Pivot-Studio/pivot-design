import { SortStrategyProps } from './SortableRectify';

function getItemGap(clientRects: (DOMRect | undefined)[], index: number, activeIndex: number) {
  const currentRect: DOMRect | undefined = clientRects[index];
  const previousRect: DOMRect | undefined = clientRects[index - 1];
  const nextRect: DOMRect | undefined = clientRects[index + 1];

  if (!currentRect) {
    return 0;
  }

  if (activeIndex < index) {
    return previousRect
      ? currentRect.top - (previousRect.top + previousRect.height)
      : nextRect
      ? nextRect.top - (currentRect.top + currentRect.height)
      : 0;
  }

  return nextRect
    ? nextRect.top - (currentRect.top + currentRect.height)
    : previousRect
    ? currentRect.top - (previousRect.top + previousRect.height)
    : 0;
}

export const verticalSortStrategy = ({
  index,
  active,
  over,
  containerId,
  droppableRects: globalDroppableMap,
}: SortStrategyProps) => {
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

  // 这里需要对container的clientRects进行过滤
  const rects = globalDroppableMap
    .get(overContainer)
    ?.map((rect) => {
      if (rect.id === containerId || rect.id === activeContainer || rect.id === overContainer) return;
      return rect.clientRect;
    })
    .filter((r) => !!r);

  if (!rects || rects?.length === 0) {
    return {
      x: 0,
      y: 0,
    };
  }

  const activeRect = rects[activeIndex];
  // const overRect = rects[overIndex];

  if (!activeRect) {
    return {
      x: 0,
      y: 0,
    };
  }
  // ===================================== mutilple container logic ⬇️
  // if current node's container isn't same as the active container, don't move!
  if (containerId !== activeContainer) {
    return {
      x: 0,
      y: 0,
    };
  }
  // ===================================== mutilple container logic ⬆️

  if (activeContainer === overContainer) {
    if (index === activeIndex) {
      return {
        x: 0,
        y: 0,
      };
    }

    if (index < activeIndex && index >= overIndex) {
      return {
        x: 0,
        y: activeRect.height + getItemGap(rects, index, activeIndex),
      };
    }
    if (index > activeIndex && index <= overIndex) {
      return {
        x: 0,
        y: -(activeRect.height + getItemGap(rects, index, activeIndex)),
      };
    }
    // active node is moving down
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
