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

  for (let draggable of manager.getAll()) {
    // active draggable node
    if (activeId === draggable.id) {
      continue;
    }
    // inactive draggable node
    const node = draggable.node.current!;
    draggable.clientRect = node?.getBoundingClientRect();
    const { clientRect } = draggable;
    // if (draggable.id === 'PIVOT-2') {
    //   console.log(
    //     '移动y:',
    //     coordinates.y,
    //     'PIVOT2:top:',
    //     clientRect.top,
    //     'height:',
    //     clientRect.height,
    //     coordinates.x >= clientRect.left &&
    //       clientRect.left + clientRect.width >= coordinates.x &&
    //       coordinates.y >= clientRect.top &&
    //       clientRect.top + clientRect.height >= coordinates.y
    //   );
    // }

    if (
      coordinates.x >= clientRect.left &&
      clientRect.left + clientRect.width >= coordinates.x &&
      coordinates.y >= clientRect.top &&
      clientRect.top + clientRect.height >= coordinates.y
    ) {
      collisions.push({ id: draggable.id, index: draggable.index, clientRect });
    }
  }
  return collisions;
};
