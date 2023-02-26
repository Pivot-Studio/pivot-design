/**
 * 节流
 * @param {function | null} fn      节流函数
 * @param {number} delay            节流时间间隔
 * @param {number} boolean          是否立即执行
 * @return {function}               返回函数
 */
export function throttle(
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
      if (!timer) {
        // 头节流，立即执行
        if (immediate) {
          fn.apply(this, ...args);
          timer = setTimeout(() => {
            timer = null;
          }, delay);
        } else {
          // 尾节流，延迟执行
          timer = setTimeout(() => {
            timer = null;
            fn.apply(this, ...args);
          }, delay);
        }
      }
    };
  }
  