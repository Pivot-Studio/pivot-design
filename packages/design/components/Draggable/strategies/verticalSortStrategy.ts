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
  overContainerId: UniqueIdentifier;
}
export const verticalSortStrategy = (activeInfo: ActiveInfo) => {
  const { activeId, manager, transform, overNodeRef, overContainerId } = activeInfo;
  const activeNode = manager.getNode(activeId, 'draggables')!;
  const activeNodeRect = activeNode.clientRect!.current!;
  const activeNodeData = activeNode.data as MutableRefObject<SortableData>;
  const { index: activeNodeIndex, containerId: activeNodeContainerId } = activeNodeData.current.sortable;
  overNodeRef.current = activeNodeData.current;

  for (let draggable of manager.getAll('draggables')) {
    // console.log(draggable.clientRect);

    const { id, data } = draggable;
    if (id === activeId) continue;
    draggable.transform = { x: 0, y: 0 };
    draggable.transition = true;

    // 只在自己的container下进行sort
    if (overContainerId && data.current!['sortable'].containerId !== overContainerId) {
      continue;
    }

    const targetIndex = data.current!['sortable'].index;

    if (
      activeNodeIndex < targetIndex &&
      activeNodeRect.top + activeNodeRect.height / 2 + transform.y > draggable.clientRect!.current!.top
    ) {
      draggable.transform = getRectDelta(
        'vertical',
        Math.abs(activeNodeIndex - targetIndex),
        activeNodeRect,
        draggable.clientRect?.current
      );
      overNodeRef.current = data.current!;
    } else if (
      activeNodeIndex > targetIndex &&
      activeNodeRect.top + transform.y < draggable.clientRect!.current!.top + draggable.clientRect!.current!.height / 2
    ) {
      draggable.transform = getRectDelta(
        'vertical',
        Math.abs(activeNodeIndex - targetIndex),
        activeNodeRect,
        draggable.clientRect?.current
      );
      if (overNodeRef.current['sortable'].index === activeNodeIndex) {
        overNodeRef.current = data.current!;
      }
    }
  }
};
