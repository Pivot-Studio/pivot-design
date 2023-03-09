import { MutableRefObject } from 'react';
import Manager from '../context/manager';
import { Coordinate, Data, UniqueIdentifier } from '../types';
import { isCollision } from '../utils/collisionDetection';
import { getRectDelta } from '../utils/getRectDelta';
import { SortableData } from './types';

interface ActiveInfo {
  activeId: UniqueIdentifier;
  manager: Manager;
  coordinates: Coordinate;
  overNodeRef: MutableRefObject<Data>;
}

export const gridSortStrategy = (activeInfo: ActiveInfo) => {
  const { activeId, manager, overNodeRef, coordinates } = activeInfo;
  const activeNode = manager.getNode(activeId, 'draggables')!;
  const activeNodeData = activeNode.data as MutableRefObject<SortableData>;
  const activeNodeIndex = activeNodeData.current.sortable.index;
  const draggables = manager.getAll('draggables');
  const rectDraggables = manager.getAll('draggables').map((draggable) => draggable.clientRect);
  for (let draggable of draggables) {
    draggable.transition = true;
  }

  // i 是 以位置计算，碰撞位置的索引
  for (let i = 0; i < rectDraggables.length; i++) {
    if (i !== overNodeRef.current['sortable'].index && isCollision(rectDraggables[i]!, coordinates)) {
      if (overNodeRef.current['sortable'].index < i) {
        // 从前往后
        for (let j = overNodeRef.current['sortable'].index; j < i; j++) {
          const draggable = draggables[j]!;
          if (j < activeNodeIndex) {
            // 先从后往前，再从前往后的时候
            draggable.transform = { x: 0, y: 0 };
          } else {
            const nextNode = draggables[j + 1]!;
            nextNode.transform = getRectDelta('grid', 1, draggable.clientRect, nextNode.clientRect);
          }
        }
      } else if (overNodeRef.current['sortable'].index > i) {
        // 从后往前
        for (let j = i; j < overNodeRef.current['sortable'].index; j++) {
          const draggable = draggables[j]!;
          if (j >= activeNodeIndex) {
            const nextNode = draggables[j + 1]!;
            nextNode.transform = { x: 0, y: 0 };
          } else {
            const nextNode = draggables[j + 1]!;
            draggable.transform = getRectDelta('grid', 1, nextNode.clientRect, draggable.clientRect);
          }
        }
      }
      overNodeRef.current = draggables.find((draggable) => draggable.data.current!['sortable'].index === i)!.data
        .current as Data;
      break;
    }
  }
};
