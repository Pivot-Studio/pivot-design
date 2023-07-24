import { isWindow } from '../../utils/type-guards/isWindow';
import { isNode } from '../../utils/type-guards/isNode';

export function getWindow(target: Event['target']): typeof window {
  if (!target) {
    return window;
  }

  if (isWindow(target)) {
    return target;
  }

  if (!isNode(target)) {
    return window;
  }

  return target.ownerDocument?.defaultView ?? window;
}
