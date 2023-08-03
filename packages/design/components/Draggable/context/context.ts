import { createContext } from 'react';
import Manager from './manager';
import { DndContextDescriptor } from './types';

// eslint-disable-next-line no-unused-vars
const noop = (...args: any[]) => {};

export const defaultDndContext = {
  activeId: '',
  manager: new Manager(),
  dispatch: noop,
  transform: {
    x: 0,
    y: 0,
  },
  activeRect: null,
  activator: null,
  collisions: null,
  droppableRects: [],
  overNodeRef: null,
  hasDragOverlay: false,
  container: '',
};
export const Context = createContext<DndContextDescriptor>(defaultDndContext);
