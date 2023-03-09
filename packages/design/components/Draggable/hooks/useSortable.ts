import { UniqueIdentifier, Data } from '../types';
import { useDraggable } from './useDraggable';
import { useDroppable } from './useDroppable';
import { useCombinedRefs } from './useCombinedRefs';
import { useMemo } from 'react';
import { SortableData } from '../strategies/types';

interface UseSortableProps {
  id: UniqueIdentifier;
  index?: number;
}
// todo
export const useSortable = ({ id, index, containerId, items }: any) => {
  const data = useMemo<SortableData & Data>(
    () => ({ sortable: { containerId, index, items } }),
    [containerId, index, items]
  );

  const { isDragging, setDragNode, listener, transform, attributes, activeRect } = useDraggable({
    id,
    data,
  });
  const { setDropNode } = useDroppable({ id, data });
  const setSortNode = useCombinedRefs(setDragNode, setDropNode);
  return {
    isDragging,
    setSortNode,
    listener,
    transform,
    activeRect,
    attributes,
  };
};
