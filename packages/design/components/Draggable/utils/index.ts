import { vendorPrefix } from '../../utils';
import { Coordinate } from '../types';
export { Listeners } from './Listener';

export function setTransform(transform?: Coordinate) {
  if (!transform) return {};
  return {
    [`${vendorPrefix}Transform`]: `translate3d(${transform.x}px,${transform.y}px,0)`,
  };
}

export const arrayMove = (array: any[], from: number, to: number) => {
  const resArray = array.slice();
  resArray.splice(to < 0 ? to + array.length : to, 0, resArray.splice(from, 1)[0]);
  return resArray;
};
