import { createContext } from 'react';
import Manager from './manager';
import { SortableContextDescriptor } from './types';

// eslint-disable-next-line no-unused-vars
const noop = (...args: any[]) => {};

export const defaultSortableContext = {
  activeId: '',
  manager: new Manager(),
  dispatch: noop,
  transform: {
    x: 0,
    y: 0,
  },
  activeRect: null,
  activator: null,
};
export const Context = createContext<SortableContextDescriptor>(defaultSortableContext);
