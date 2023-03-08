import { MutableRefObject } from 'react';
import Manager from '../context/manager';
import { Coordinate, DraggableNode, UniqueIdentifier } from '../types';
import { getRectDelta } from '../utils/getRectDelta';

interface ActiveInfo {
  activeId: UniqueIdentifier;
  manager: Manager;
  transform: Coordinate;
  overNodeRef: MutableRefObject<DraggableNode>;
}

export const verticalSortStrategy = (activeInfo: ActiveInfo) => {
  const { activeId, manager, transform, overNodeRef } = activeInfo;
  const activeNode = manager.getNode(activeId, 'draggables')!;
  const activeNodeRect = activeNode.clientRect!;
  const activeNodeIndex = activeNode.index;
  overNodeRef.current = activeNode;

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
      overNodeRef.current = draggable;
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
      if (overNodeRef.current.index === activeNode.index) {
        overNodeRef.current = draggable;
      }
    }
  }
};
