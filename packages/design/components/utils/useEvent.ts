import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * 用于定义一个函数，该函数具有两个特性
 * 1. 在组件多次render的时候也会保持一致
 * 2. 能够获取到当前组件最新的props和state
 * @param fn
 * @returns memorizeFn
 */
export const useEvent = (fn: (...args: any[]) => void) => {
  const eventRef = useRef<((...args: any[]) => void) | null>(null);
  useLayoutEffect(() => {
    eventRef.current = fn;
  });

  return useCallback((...args: any[]) => {
    return eventRef.current && eventRef.current(...args);
  }, []);
};
