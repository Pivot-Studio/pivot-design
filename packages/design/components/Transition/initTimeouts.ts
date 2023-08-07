import { timeoutType } from 'pivot-design-props';

/** 统一转化timeout格式 */
export function getFormateTimeouts(timeout: timeoutType | null) {
  let exit, enter, appear;
  exit = enter = appear = timeout;

  if (timeout != null && typeof timeout !== 'number') {
    exit = timeout?.exit;
    enter = timeout?.enter;
    appear = timeout?.appear !== undefined ? timeout?.appear : enter;
  }
  return { exit, enter, appear } as { enter: number; exit: number; appear: number };
}
