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
// todo：如果container不一样要做额外处理:如A->B后，B的元素需要全部下移
export const verticalSortStrategy = (activeInfo: ActiveInfo) => {
  const { activeId, manager, transform, overNodeRef, overContainerId } = activeInfo;
  const activeNode = manager.getNode(activeId, 'draggables')!;
  const activeNodeRect = activeNode.clientRect!;
  const activeNodeData = activeNode.data as MutableRefObject<SortableData>;
  const { index: activeNodeIndex, containerId: activeNodeContainerId } = activeNodeData.current.sortable;
  overNodeRef.current = activeNodeData.current;

  // for (let draggable of manager.getAll('draggables')) {
  //   const { id, data } = draggable;
  //   if (id === activeId) continue;
  //   draggable.transform = { x: 0, y: 0 };
  //   draggable.transition = true;
  //   console.log(overContainerId, activeNodeRect, draggable.clientRect);

  //   // 只在自己的container下进行sort
  //   if (overContainerId && data.current!['sortable'].containerId !== overContainerId) {
  //     continue;
  //   }

  //   const targetIndex = data.current!['sortable'].index;

  //   if (
  //     activeNodeIndex < targetIndex &&
  //     activeNodeRect.top + activeNodeRect.height / 2 + transform.y > draggable.clientRect!.top
  //   ) {
  //     draggable.transform = getRectDelta(
  //       'vertical',
  //       Math.abs(activeNodeIndex - targetIndex),
  //       activeNodeRect,
  //       draggable.clientRect
  //     );
  //     overNodeRef.current = data.current!;
  //   } else if (
  //     activeNodeIndex > targetIndex &&
  //     activeNodeRect.top + transform.y < draggable.clientRect!.top + draggable.clientRect!.height / 2
  //   ) {
  //     draggable.transform = getRectDelta(
  //       'vertical',
  //       Math.abs(activeNodeIndex - targetIndex),
  //       activeNodeRect,
  //       draggable.clientRect
  //     );
  //     if (overNodeRef.current['sortable'].index === activeNodeIndex) {
  //       overNodeRef.current = data.current!;
  //     }
  //   }
  // }
};
