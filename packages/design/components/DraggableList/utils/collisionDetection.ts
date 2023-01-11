import { Coordinate } from '../../utils/types';
import Manager from '../context/manager';

interface CollisionDetectionProps {
  manager: Manager;
  /**
   * 当前激活元素的坐标位置
   */
  coordinates: Coordinate;
}
export const collisionDetection = (props: CollisionDetectionProps) => {
  const { manager, coordinates } = props;
  const collisions = [];
  console.log(manager.getAll());

  for (let draggable of manager.getAll()) {
    // console.log(draggable);
  }
};
