import { useCallback, useEffect, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { DragNode, UniqueIdentifier } from '../types';
import useSortableContext from './useSortableContext';
interface UseDraggableProps {
  id: UniqueIdentifier;
  index: number;
}
export const useDraggable = ({ id, index }: UseDraggableProps) => {
  const { activeId, transform, dispatch, activeRect } = useSortableContext();
  const isDragging = activeId == id;
  const dragNode = useRef<DragNode>();
  const setDragNodeRef = useCallback(
    (currentNode: HTMLElement | null) => {
      dragNode.current = currentNode as DragNode;
      if (dragNode.current) {
        dragNode.current.dragitemid = id;
      }
    },
    [id]
  );
  // TODO: 导致更新两次
  useEffect(() => {
    dispatch({
      type: DragActionEnum.PUSH_NODE,
      payload: { id, index, node: dragNode },
    });
  }, [dispatch, id, index]);

  return { isDragging, dragNode, transform, activeRect, setDragNode: setDragNodeRef };
};
