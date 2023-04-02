import { useCallback, useEffect, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { Data, DragNode, UniqueIdentifier } from '../types';
import { useSyntheticListeners } from './useSyntheticListeners';
import useDndContext from './useDndContext';
import { setTransform } from '../utils';
import { useLatestValue } from './useLastValue';

interface UseDraggableProps {
  id: UniqueIdentifier;
  data?: Data; // useSortable needed
}

export const useDraggable = ({ id, data }: UseDraggableProps) => {
  const { activeId, transform, dispatch, activeRect, activator, manager, hasDragOverlay } = useDndContext();
  const rect = useRef<DOMRect>();
  const isDragging = activeId == id;
  const node = manager.getNode(id, 'draggables');
  const nodeTransform = node?.transform;
  const transition = node?.transition;
  const dragNode = useRef<DragNode>();
  const listener = useSyntheticListeners(activator, id);
  const setDragNodeRef = useCallback((currentNode: HTMLElement | null) => {
    dragNode.current = currentNode as DragNode;
    if (currentNode && !rect.current) {
      rect.current = currentNode.getBoundingClientRect(); // initialize draggables position
    }
  }, []);
  const dataRef = useLatestValue({ id, ...data });

  const attributes = {
    ...setTransform(nodeTransform),
    ...(isDragging && !hasDragOverlay ? setTransform(transform) : {}),
    transition: transition ? '300ms' : '',
  };

  useEffect(() => {
    dispatch({
      type: DragActionEnum.PUSH_NODE,
      payload: {
        node: {
          id,
          node: dragNode,
          data: dataRef,
          clientRect: rect,
        },
        type: 'draggables',
      },
    });

    return () => {
      dispatch({
        type: DragActionEnum.REMOVE_NODE,
        payload: { id, type: 'draggables' },
      });
    };
  }, [dispatch, id, manager, dragNode, dataRef]);

  return {
    hasDragOverlay,
    isDragging,
    dragNode,
    transform,
    attributes,
    activeRect,
    listener,
    setDragNode: setDragNodeRef,
  };
};
