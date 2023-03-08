import { useCallback, useEffect, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { DragNode, UniqueIdentifier } from '../types';
import { useSyntheticListeners } from './useSyntheticListeners';
import useDndContext from './useDndContext';
import { setTransform } from '../utils';
import { useUniqueId } from './useUniqueId';

interface UseDraggableProps {
  id?: UniqueIdentifier;
  index?: number;
}

export const useDraggable = ({ id: propId, index: propsIndex }: UseDraggableProps) => {
  const { activeId, transform, dispatch, activeRect, activator, manager } = useDndContext();
  const { id: innerId, index: innerIndex } = useUniqueId(propId);
  const id = innerId;
  const index = propsIndex ?? innerIndex;

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
  useEffect(() => {
    dispatch({
      type: DragActionEnum.PUSH_NODE,
      payload: { node: { id, index, node: dragNode }, type: 'draggables' },
    });
    return () => {
      dispatch({
        type: DragActionEnum.REMOVE_NODE,
        payload: { id, type: 'draggables' },
      });
    };
  }, [dispatch, id, index, manager]);

  return { isDragging, dragNode, transform, attributes, activeRect, listener, setDragNode: setDragNodeRef };
};
