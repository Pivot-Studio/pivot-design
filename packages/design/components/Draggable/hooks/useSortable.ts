import { UniqueIdentifier, Data } from '../types';
import { useDraggable } from './useDraggable';
import { useDroppable } from './useDroppable';
import { useCombinedRefs } from './useCombinedRefs';
import { useMemo, useRef } from 'react';
import { SortableData } from '../strategies/types';
import useDndContext from './useDndContext';
import { getElementMargin, overlayStyle } from '../utils';
import { useSyntheticListeners } from './useSyntheticListeners';

interface UseSortableProps {
  id: UniqueIdentifier;
  index?: number;
}
// todo
export const useSortable = ({ id, index, containerId, items, isDragOverlay }: any) => {
  const data = useMemo<SortableData & Data>(
    () => ({ sortable: { containerId, index, items } }),
    [containerId, index, items]
  );
  // todo
  if (isDragOverlay) {
    const { transform, manager, activeRect, activator } = useDndContext();
    const node = manager.getNode(id, 'draggables');
    const attributes = overlayStyle(activeRect?.current.clientRect, getElementMargin(node?.node.current!), transform);
    const listener = useSyntheticListeners(activator, id);

    return { transform, attributes, isDragging: true, listener };
  }
  const { isDragging, setDragNode, listener, transform, attributes, hasDragOverlay } = useDraggable({
    id,
    data,
  });
  const { setDropNode } = useDroppable({ id, data });
  const setSortNode = useCombinedRefs(setDragNode, setDropNode);
  return {
    hasDragOverlay,
    isDragging,
    setSortNode,
    listener,
    transform,
    attributes,
  };
};
