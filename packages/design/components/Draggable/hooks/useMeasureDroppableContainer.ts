import { useMemo } from 'react';
import Manager from '../context/manager';
import { UniqueIdentifier } from '../types';

export const useMeasureDroppableContainer = (manager: Manager, activeId: UniqueIdentifier) => {
  return useMemo(() => {
    if (!activeId) {
      return [];
    }
    const droppableContainers = manager
      .getAll('droppables')
      .sort((a, b) => a.data['sortable'].index - b.data['sortable'].index);
    return droppableContainers.map((droppable) => {
      return {
        clientRect: droppable.node.current!.getBoundingClientRect(),
        id: droppable.id,
      };
    });
  }, [activeId, manager]);
};
