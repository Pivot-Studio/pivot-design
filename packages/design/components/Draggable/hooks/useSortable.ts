import { UniqueIdentifier } from '../types';
import { useUniqueId } from './useUniqueId';
import { useDraggable } from './useDraggable';
import { useDroppable } from './useDroppable';
import { useCombinedRefs } from './useCombinedRefs';

interface UseSortableProps {
  id?: UniqueIdentifier;
  index?: number;
}

export const useSortable = ({ id: propId, index: propsIndex }: UseSortableProps) => {
  const { id: innerId, index: innerIndex } = useUniqueId(propId);
  const id = innerId;
  const index = propsIndex ?? innerIndex;

  const { isDragging, setDragNode, listener, transform, attributes, activeRect } = useDraggable({
    index,
    id,
  });
  const { setDropNode } = useDroppable({ index, id });
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
