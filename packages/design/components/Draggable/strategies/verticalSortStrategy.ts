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

    const targetNode = manager.getNode(id, 'draggables')!;
    targetNode.transform = { x: 0, y: 0 };
    targetNode.transition = true;
    const targetIndex = targetNode.index;
    if (
      activeNode.index < draggable.index &&
      activeNodeRect.top + activeNodeRect.height / 2 + transform.y > targetNode.clientRect!.top
    ) {
      targetNode.transform = getRectDelta(
        'vertical',
        Math.abs(activeNodeIndex - targetIndex),
        activeNodeRect,
        targetNode.clientRect
      );
      newIndex = draggable.index;
    } else if (
      activeNode.index > draggable.index &&
      activeNodeRect.top + transform.y < targetNode.clientRect!.top + targetNode.clientRect!.height / 2
    ) {
      targetNode.transform = getRectDelta(
        'vertical',
        Math.abs(activeNodeIndex - targetIndex),
        activeNodeRect,
        targetNode.clientRect
      );
      if (newIndex === activeNode.index) {
        newIndex = draggable.index;
      }
    }
  }
  return newIndex;
};
