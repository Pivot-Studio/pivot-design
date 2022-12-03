import { createContext } from 'react';
import { DraggableContextProps } from './type';

export const initDraggableContext: DraggableContextProps = {
  activeId: null,
};

export const DndContext =
  createContext<DraggableContextProps>(initDraggableContext);
