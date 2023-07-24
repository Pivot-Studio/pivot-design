import { DroppableRectMap } from '../../../Draggable/context/types';
import { Coordinate } from '../../../utils/types';
import Manager from '../../context/manager';
import { Data, UniqueIdentifier } from '../../types';

interface CollisionDetectionProps {
  activeId: UniqueIdentifier;
  manager: Manager;
  /**
   * 当前激活元素的坐标位置
   */
  coordinates: Coordinate;
  droppableRects: DroppableRectMap;
}
export interface Collision {
  id: UniqueIdentifier;
  data: Data;
  clientRect: DOMRect;
}

export const isCollision = (clientRect: DOMRect, coordinates: Coordinate) =>
  coordinates.x >= clientRect.left &&
  clientRect.left + clientRect.width >= coordinates.x &&
  coordinates.y >= clientRect.top &&
  clientRect.top + clientRect.height >= coordinates.y;

/**
 * 碰撞检测，会返回包括元素自身在内的droppable元素
 * @returns
 */
export const collisionDetection = (props: CollisionDetectionProps): Collision[] => {
  const { manager, coordinates, activeId, droppableRects } = props;

  if (!activeId) return [];
  const collisions: Collision[] = [];
  droppableRects.forEach((rects, container) => {
    rects.forEach((rect) => {
      if (isCollision(rect.clientRect, coordinates)) {
        const droppable = manager.getNode(rect.id, 'droppables')!;
        collisions.push({ id: droppable.id, data: droppable.data, clientRect: rect.clientRect });
      }
    });
  });

  return collisions;
};
