/* eslint-disable prefer-destructuring */
import { hasViewportRelativeCoordinates } from '../../utils/hasViewportRelativeCoordinates';
import { isTouchEvent } from './isTouchEvent';
import { Coordinate } from '../../utils/types';

/**
 * Returns the normalized x and y coordinates for mouse and touch events.
 */
export function getEventCoordinates(event: Event): Coordinate | null {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length > 0) {
      const { clientX: x, clientY: y } = event.touches[0]!;

      return {
        x,
        y,
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const { clientX: x, clientY: y } = event.changedTouches[0]!;

      return {
        x,
        y,
      };
    }
  }

  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  return null;
}
