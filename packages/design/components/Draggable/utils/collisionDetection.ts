import { Coordinate } from '../../utils/types';
import Manager from '../context/manager';
import { UniqueIdentifier } from '../types';

interface CollisionDetectionProps {
  activeId: UniqueIdentifier;
  manager: Manager;
  /**
   * 当前激活元素的坐标位置
   */
  coordinates: Coordinate;
}
export interface Collision {
  id: UniqueIdentifier;
  index: number;
  clientRect: DOMRect;
}

export const collisionDetection = (props: CollisionDetectionProps): Collision[] => {
  const { manager, coordinates, activeId } = props;
  if (!activeId) return [];
  const collisions = [];

  for (let droppable of manager.getAll('droppables')) {
    // active droppable node
    if (activeId === droppable.id) {
      continue;
    }
    // inactive droppable node
    const node = droppable.node.current!;
    droppable.clientRect = node?.getBoundingClientRect();
    const { clientRect } = droppable;

    if (
      coordinates.x >= clientRect.left &&
      clientRect.left + clientRect.width >= coordinates.x &&
      coordinates.y >= clientRect.top &&
      clientRect.top + clientRect.height >= coordinates.y
    ) {
      collisions.push({ id: droppable.id, index: droppable.index, clientRect });
    }
  }
  return collisions;
};
