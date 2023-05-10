import { MutableRefObject } from 'react';
import Manager from '../context/manager';
import { Coordinate, UniqueIdentifier } from '../types';
import { isCollision } from '../utils/collisionDetection';
import { getRectDelta } from '../utils/getRectDelta';

interface ActiveInfo {
  activeId: UniqueIdentifier;
  manager: Manager;
  coordinates: Coordinate;
  newIndexRef: MutableRefObject<number>;
}

export const gridSortStrategy = (activeInfo: ActiveInfo) => {
  const { activeId, manager, newIndexRef, coordinates } = activeInfo;
  const activeNode = manager.getNode(activeId, 'draggables')!;
  const activeNodeIndex = activeNode.index;
  const draggables = manager.getAll('draggables');
  const rectDraggables: DOMRect[] = [];
  for (let draggable of draggables) {
    draggable.transition = true;
    rectDraggables.push(draggable.clientRect!);
  }
  // i 是 以位置计算，碰撞位置的索引
  for (let i = 0; i < rectDraggables.length; i++) {
    if (i !== newIndexRef.current && isCollision(rectDraggables[i]!, coordinates)) {
      if (newIndexRef.current < i) {
        // 从前往后
        for (let j = newIndexRef.current; j < i; j++) {
          const draggable = draggables[j]!;
          if (j < activeNodeIndex) {
            // 先从后往前，再从前往后的时候
            draggable.transform = { x: 0, y: 0 };
          } else {
            const nextNode = draggables[j + 1]!;
            nextNode.transform = getRectDelta('grid', 1, draggable.clientRect, nextNode.clientRect);
          }
        }
      } else if (newIndexRef.current > i) {
        // 从后往前
        for (let j = i; j < newIndexRef.current; j++) {
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
      newIndexRef.current = i;

      break;
    }
  }
};