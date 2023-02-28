import { MutableRefObject } from 'react';
import Manager from '../context/manager';
import { Coordinate, UniqueIdentifier } from '../types';
import { Collision } from '../utils/collisionDetection';
import { getRectDelta } from '../utils/getRectDelta';

interface ActiveInfo {
  activeId: UniqueIdentifier;
  manager: Manager;
  transform: Coordinate;
  collisions: Collision[];
  newIndexRef: MutableRefObject<number>;
}

export const gridSortStrategy = (activeInfo: ActiveInfo) => {
  const { activeId, manager, transform, collisions, newIndexRef } = activeInfo;
  const activeNode = manager.getNode(activeId, 'draggables')!;
  const activeNodeRect = activeNode.clientRect!;
  const activeNodeIndex = activeNode.index;
  if (collisions.length === 0) return activeNodeIndex;
  const collisionIndex = collisions[0]?.index || 0;
  const draggables = manager.getAll('draggables');

  for (let draggable of draggables) {
    draggable.transition = true;
  }

  if (newIndexRef.current < collisionIndex) {
    // 从前往后
    for (let i = newIndexRef.current; i < collisionIndex; i++) {
      const draggable = draggables[i]!;
      if (i < activeNodeIndex) {
        draggable.transform = { x: 0, y: 0 };
      } else {
        const nextNode = draggables[i + 1]!;
        nextNode.transform = getRectDelta('grid', 1, draggable.clientRect, nextNode.clientRect);
      }
    }
  } else if (newIndexRef.current > collisionIndex) {
    // 从后往前
    for (let i = collisionIndex; i < newIndexRef.current; i++) {
      const draggable = draggables[i]!;
      if (i >= activeNodeIndex) {
        const nextNode = draggables[i + 1]!;
        nextNode.transform = { x: 0, y: 0 };
      } else {
        const nextNode = draggables[i + 1]!;
        draggable.transform = getRectDelta('grid', 1, nextNode.clientRect, draggable.clientRect);
      }
    }
  }

  newIndexRef.current = collisionIndex;
  // else {
  //   if (index >= newIndex && index < activeNodeIndex) {
  //     const nextNode = draggables[index + 1]!;
  //     // const targetIndex = draggable.index;
  //     draggable.transform = getRectDelta('grid', 1, nextNode.clientRect, draggable.clientRect);
  //   } else {
  //     draggable.transform = { x: 0, y: 0 };
  //   }
  // }
};

// i = 1;
// drag.index = 0;
// DragEvent.firstIndex = 0;
