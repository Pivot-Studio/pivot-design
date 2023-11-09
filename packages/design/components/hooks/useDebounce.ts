import { DependencyList, useCallback, useEffect, useRef } from 'react';

/**
 *  使用Hooks进行防抖函数的包装
 * @param fn 要封装的函数
 * @param delay 防抖延迟时间
 * @param dep
 * @returns
 */
export function useDebounce(
  fn: (...args: any[]) => void,
  delay = 400,
  dep: DependencyList = []
) {
  const { current } = useRef<{
    fn: (...args: any[]) => void;
    timer: number | null;
  }>({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(
    function f(...args: any[]) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    },
    [current, delay, ...dep]
  );
}
