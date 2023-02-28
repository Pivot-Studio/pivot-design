import { Coordinate } from '../types';

export function getRectDelta(
  direction: 'vertical' | 'horizen' | 'grid',
  scale: number,
  rect1?: DOMRect,
  rect2?: DOMRect
): Coordinate {
  let x = 0;
  let y = 0;
  if (rect1 && rect2) {
    if (direction !== 'vertical') {
      x = (rect1.left - rect2.left) / scale;
    }
    if (direction !== 'horizen') {
      y = (rect1.top - rect2.top) / scale;
    }
  }
  return {
    x,
    y,
  };
}
