import { useCallback, useEffect, useMemo, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { Data, UniqueIdentifier } from '../types';
import { useSyntheticListeners } from './useSyntheticListeners';
import useDndContext from '../context/useDndContext';
import { setTransform } from '../utils';

interface UseDraggableProps {
  id: UniqueIdentifier;
  data?: Data;
}

export const useDraggable = ({ id, data: customData }: UseDraggableProps) => {
  const { activeId, transform, dispatch, activator, manager, hasDragOverlay } = useDndContext();
  const rect = useRef<DOMRect>();
  const isActive = activeId == id;

  const dragNode = useRef<HTMLElement>();
  const listener = useSyntheticListeners(activator, id);

  const setDragNodeRef = useCallback((currentNode: HTMLElement) => {
    dragNode.current = currentNode;
    if (currentNode) {
      rect.current = currentNode.getBoundingClientRect(); // initialize draggables position
    }
  }, []);

  const data = useMemo(() => {
    return { id, ...customData };
  }, [customData, id]);

  const attributes = {
    // When there is no dragOverlay, the dragging element is setting `transform`
    ...(isActive && !hasDragOverlay ? setTransform(transform) : {}),
  };

  useEffect(() => {
    dispatch({
      type: DragActionEnum.PUSH_NODE,
      payload: {
        node: {
          id,
          node: dragNode,
          data,
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
  }, [dispatch, id, manager, dragNode]);

  return {
    hasDragOverlay,
    isActive,
    dragNode,
    transform,
    attributes,
    listener,
    setDragNode: setDragNodeRef,
  };
};
