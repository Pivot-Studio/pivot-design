import { UniqueIdentifier, Data } from '../types';
import { useDraggable } from '../hooks/useDraggable';
import { useDroppable } from '../hooks/useDroppable';
import { useCombinedRefs } from '../hooks/useCombinedRefs';
import { useMemo, useRef } from 'react';
import { SortableData } from './strategies/types';
import useSortableContext from './context/useSortableContext';
import { sortableRectify } from './strategies/SortableRectify';
import { setTransform } from '../utils';
interface UseSortableProps {
  id: UniqueIdentifier;
  index?: number;
}
export const useSortable = ({ id, index }: any) => {
  const { items, containerId, over, active, type, droppableRects, dragging } = useSortableContext();
  const data = useMemo<SortableData & Data>(
    () => ({ sortable: { containerId, index, items } }),
    [containerId, index, items]
  );
  const sortableTransform = sortableRectify({ index, active, over, containerId, droppableRects, type });

  //todo: transition
  const { isDragging, setDragNode, listener, transform, attributes, hasDragOverlay } = useDraggable({
    id,
    data,
  });

  // todo: transform分开
  const finalAttributes = {
    ...attributes,
    ...(active && id === active.id ? {} : setTransform(sortableTransform)),
    transition: !isDragging && dragging ? '300ms' : '',
  };

  const { setDropNode } = useDroppable({ id, data });
  const setSortNode = useCombinedRefs(setDragNode, setDropNode);

  return {
    hasDragOverlay,
    isDragging,
    setSortNode,
    listener,
    transform,
    attributes: finalAttributes,
  };
};
