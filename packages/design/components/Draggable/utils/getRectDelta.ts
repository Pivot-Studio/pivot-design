import { Coordinate } from '../types';

export function getRectDelta(
  direction: 'vertical' | 'horizen',
  scale: number,
  rect1?: DOMRect,
  rect2?: DOMRect
): Coordinate {
  return rect1 && rect2
    ? {
        x: direction === 'horizen' ? (rect1.left - rect2.left) / scale : 0,
        y: direction === 'vertical' ? (rect1.top - rect2.top) / scale : 0,
      }
    : {
        x: 0,
        y: 0,
      };
}
