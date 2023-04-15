import { UniqueIdentifier, Data } from '../types';
import { useDraggable } from '../hooks/useDraggable';
import { useDroppable } from '../hooks/useDroppable';
import { useCombinedRefs } from '../hooks/useCombinedRefs';
import { useMemo } from 'react';
import { SortableData } from './strategies/types';
import useSortableContext from './context/useSortableContext';
import { sortableRectify } from './strategies/SortableRectify';
import { setTransform } from '../utils';
interface UseSortableProps {
  id: UniqueIdentifier;
  index: number;
}
export const useSortable = ({ id, index }: UseSortableProps) => {
  const { items, containerId, over, active, type, droppableRects, dragging, transitionTime } = useSortableContext();
  const data = useMemo<SortableData & Data>(
    () => ({ sortable: { containerId, index, items } }),
    [containerId, index, items]
  );
  const sortableTransform = sortableRectify({ index, active, over, containerId, droppableRects, type });

  const { isActive, setDragNode, listener, transform, attributes, hasDragOverlay } = useDraggable({
    id,
    data,
  });
  const finalAttributes = {
    // useDraggable 返回的是当前正在拖拽元素的transform，
    ...attributes,
    ...(active && id === active['id'] ? {} : setTransform(sortableTransform)),
    transition: !isActive && dragging ? transitionTime : '',
  };

  const { setDropNode } = useDroppable({ id, data });
  const setSortNode = useCombinedRefs(setDragNode, setDropNode);

  return {
    hasDragOverlay,
    isActive,
    setSortNode,
    listener,
    transform,
    attributes: finalAttributes,
  };
};
