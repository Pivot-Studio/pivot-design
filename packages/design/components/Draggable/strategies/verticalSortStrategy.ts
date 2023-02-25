import Manager from '../context/manager';
import { Coordinate, UniqueIdentifier } from '../types';
import { getRectDelta } from '../utils/getRectDelta';

interface ActiveInfo {
  activeId: UniqueIdentifier;
  manager: Manager;
  transform: Coordinate;
}

export const verticalSortStrategy = (activeInfo: ActiveInfo) => {
  const { activeId, manager, transform } = activeInfo;
  const activeNode = manager.getNode(activeId, 'draggables')!;
  const activeNodeRect = activeNode.clientRect!;
  const activeNodeIndex = activeNode.index;
  let newIndex = activeNode.index;

  for (let draggable of manager.getAll('draggables')) {
    const { id } = draggable;
    if (id === activeId) continue;

    draggable.transform = { x: 0, y: 0 };
    draggable.transition = true;
    const targetIndex = draggable.index;
    if (
      activeNode.index < targetIndex &&
      activeNodeRect.top + activeNodeRect.height / 2 + transform.y > draggable.clientRect!.top
    ) {
      draggable.transform = getRectDelta(
        'vertical',
        Math.abs(activeNodeIndex - targetIndex),
        activeNodeRect,
        draggable.clientRect
      );
      newIndex = targetIndex;
    } else if (
      activeNode.index > targetIndex &&
      activeNodeRect.top + transform.y < draggable.clientRect!.top + draggable.clientRect!.height / 2
    ) {
      draggable.transform = getRectDelta(
        'vertical',
        Math.abs(activeNodeIndex - targetIndex),
        activeNodeRect,
        draggable.clientRect
      );
      if (newIndex === activeNode.index) {
        newIndex = targetIndex;
      }
    }
  }
  return newIndex;
};
