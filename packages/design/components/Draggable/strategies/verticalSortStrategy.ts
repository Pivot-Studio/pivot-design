import Manager from '../context/manager';
import { Coordinate, UniqueIdentifier } from '../types';

interface ActiveInfo {
  activeId: UniqueIdentifier;
  manager: Manager;
  transform: Coordinate;
  margin: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

export const rectSortStrategy = (activeInfo: ActiveInfo) => {
  const { activeId, manager, margin, transform } = activeInfo;
  const activeNode = manager.getNode(activeId, 'draggables')!;
  const activeNodeRect = activeNode.clientRect!;
  let newIndex = activeNode.index;
  for (let draggable of manager.getAll('draggables')) {
    const { id } = draggable;
    if (id === activeId) continue;
    const draggableNode = manager.getNode(id, 'draggables')!;
    draggableNode.transform = { x: 0, y: 0 };
    draggableNode.transition = true;
    if (
      activeNode.index < draggable.index &&
      activeNodeRect.top + activeNodeRect.height / 2 + transform.y > draggableNode.clientRect!.top
    ) {
      draggableNode.transform = {
        x: 0,
        y: -(Math.max(margin.bottom, margin.bottom) + (activeNode.clientRect?.height ?? 0)),
      };
      newIndex = draggable.index;
    } else if (
      activeNode.index > draggable.index &&
      activeNodeRect.top + transform.y < draggableNode.clientRect!.top + draggableNode.clientRect!.height / 2
    ) {
      draggableNode.transform = {
        x: 0,
        y: Math.max(margin.bottom, margin.bottom) + (activeNode.clientRect?.height ?? 0),
      };
      if (newIndex === activeNode.index) {
        newIndex = draggable.index;
      }
    }
  }
  return newIndex;
};
