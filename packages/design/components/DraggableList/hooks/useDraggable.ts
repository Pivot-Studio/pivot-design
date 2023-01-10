import { useCallback, useEffect, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { DragNode, UniqueIdentifier } from '../types';
import { useListeners } from './useListeners';
import useSortableContext from './useSortableContext';
interface UseDraggableProps {
  id: UniqueIdentifier;
  index: number;
}
export const useDraggable = ({ id, index }: UseDraggableProps) => {
  const { activeId, transform, dispatch, activeRect, activator } = useSortableContext();
  const isDragging = activeId == id;
  const dragNode = useRef<DragNode>();
  const listener = useListeners(activator, id);
  const setDragNodeRef = useCallback((currentNode: HTMLElement | null) => {
    dragNode.current = currentNode as DragNode;
  }, []);
  // TODO: 导致更新两次
  useEffect(() => {
    dispatch({
      type: DragActionEnum.PUSH_NODE,
      payload: { id, index, node: dragNode },
    });
  }, [dispatch, id, index]);

  return { isDragging, dragNode, transform, activeRect, listener, setDragNode: setDragNodeRef };
};
