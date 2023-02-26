/**
 * 防抖函数
 * @param {function | null} fn      防抖函数
 * @param {number} delay            防抖时间间隔
 * @param {number} boolean          是否立即执行
 * @return {function}               返回函数
 */
export function debounce(
    fn: Function | null,
    delay: number = 100,
    immediate: boolean = false
  ) {
    // 如果是 fn === null 返回空函数
    if (fn === null) {
      return function () {};
    }
    // 如果 delay === 0 返回原函数
    if (delay === 0) {
      return function (this: any, ...args: any[]) {
        fn.apply(this, ...args);
      };
    }
  
    let timer: number | null = null;
    return function (this: any, ...args: any[]) {
      if (timer) {
        clearTimeout(timer);
      }
  
      if (immediate) {
        // 如果定时器已结束，执行回调
        if (!timer) fn.apply(this, ...args);
        // 重新计时
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      } else {
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, ...args);
        }, delay);
      }
    };
  }
  