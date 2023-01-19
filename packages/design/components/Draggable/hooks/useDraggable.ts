import { useCallback, useEffect, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { DragNode, UniqueIdentifier } from '../types';
import { useSyntheticListeners } from './useSyntheticListeners';
import useDndContext from './useDndContext';
import { setTransform } from '../utils';

interface UseDraggableProps {
  id: UniqueIdentifier;
  index: number;
}

export const useDraggable = ({ id, index }: UseDraggableProps) => {
  const { activeId, transform, dispatch, activeRect, activator, manager } = useDndContext();
  const isDragging = activeId == id;
  const node = manager.getNode(id, 'draggables');
  const nodeTransform = node?.transform;
  const transition = node?.transition;
  const dragNode = useRef<DragNode>();
  const listener = useSyntheticListeners(activator, id);
  const setDragNodeRef = useCallback((currentNode: HTMLElement | null) => {
    dragNode.current = currentNode as DragNode;
  }, []);

  const attributes = { ...setTransform(nodeTransform), transition: transition ? '300ms' : '' };
  // TODO: 导致更新两次
  useEffect(() => {
    dispatch({
      type: DragActionEnum.PUSH_NODE,
      payload: { node: { id, index, node: dragNode }, type: 'draggables' },
    });
    // manager.push({ id, index, node: dragNode });
  }, [dispatch, id, index, manager]);

  return { isDragging, dragNode, transform, attributes, activeRect, listener, setDragNode: setDragNodeRef };
};
