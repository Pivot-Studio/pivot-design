import { useMemo } from 'react';
import { prefix } from '../../constants';
let _id = 0;

export function useUniqueId(value?: string) {
  return useMemo(() => {
    if (value) {
      return { id: value, index: _id + 1 };
    }
    // eslint-disable-next-line no-plusplus
    const id = _id++;
    return { id: `${prefix}-${id}`, index: id };
  }, [prefix, value]);
}
