import { MutableRefObject } from 'react';
import Manager from '../context/manager';
import { Coordinate, Data, UniqueIdentifier } from '../types';
import { getRectDelta } from '../utils/getRectDelta';
import { SortableData } from './types';

interface ActiveInfo {
  activeId: UniqueIdentifier;
  manager: Manager;
  transform: Coordinate;
  overNodeRef: MutableRefObject<Data>;
}

export const horizenSortStrategy = (activeInfo: ActiveInfo) => {
  const { activeId, manager, transform, overNodeRef } = activeInfo;
  const activeNode = manager.getNode(activeId, 'draggables')!;
  const activeNodeRect = activeNode.clientRect?.current!;
  const activeNodeData = activeNode.data as MutableRefObject<SortableData>;
  const activeNodeIndex = activeNodeData.current.sortable.index;
  overNodeRef.current = activeNodeData.current;

  for (let draggable of manager.getAll('draggables')) {
    const { id } = draggable;
    if (id === activeId) continue;

    draggable.transform = { x: 0, y: 0 };
    draggable.transition = true;
    const draggableData = draggable.data as MutableRefObject<SortableData>;
    const targetIndex = draggableData.current.sortable.index;
    if (
      activeNodeIndex < targetIndex &&
      activeNodeRect.left + activeNodeRect.width / 2 + transform.x > draggable.clientRect!.current!.left
    ) {
      draggable.transform = getRectDelta(
        'horizen',
        Math.abs(activeNodeIndex - targetIndex),
        activeNodeRect,
        draggable.clientRect?.current
      );
      overNodeRef.current = draggableData.current;
    } else if (
      activeNodeIndex > targetIndex &&
      activeNodeRect.left + transform.x < draggable.clientRect!.current!.left + draggable.clientRect!.current!.width / 2
    ) {
      draggable.transform = getRectDelta(
        'horizen',
        Math.abs(activeNodeIndex - targetIndex),
        activeNodeRect,
        draggable.clientRect?.current
      );
      if (overNodeRef.current['sortable'].index === activeNodeIndex) {
        overNodeRef.current = draggableData.current;
      }
    }
  }
};
