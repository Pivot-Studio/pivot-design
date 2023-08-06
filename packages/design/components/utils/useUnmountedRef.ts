import { useEffect, useRef } from 'react';

/* 获取当前组件是否还挂载的ref */
const useUnmountedRef = () => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false; // 默认为 true
    return () => {
      unmountedRef.current = true; // 组件被卸载后，返回 false
    };
  }, []);
  return unmountedRef;
};

export default useUnmountedRef;
