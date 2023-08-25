import { isNumber } from '../utils/type-guards/isNumber';
import { timeoutType } from 'pivot-design-props';

/** 统一转化timeout格式 */
export function getFormateTimeouts(timeout?: timeoutType) {
  if (isNumber(timeout)) {
    return {
      exit: timeout,
      enter: timeout,
      appear: timeout,
    };
  } else {
    return { exit: timeout?.exit, enter: timeout?.enter, appear: timeout?.appear ?? timeout?.enter };
  }
}
