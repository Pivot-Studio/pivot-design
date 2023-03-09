import { useEffect, useRef } from 'react';

export function useLatestValue<T extends any>(value: T) {
  const valueRef = useRef<T>(value);

  useEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, [value]);

  return valueRef;
}
