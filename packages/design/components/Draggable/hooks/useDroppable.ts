import { useCallback, useEffect, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { Data, DragNode, UniqueIdentifier } from '../types';
import useDndContext from './useDndContext';

interface UseDroppableProps {
  id: UniqueIdentifier;
  data?: Data;
}

export const useDroppable = ({ id, data }: UseDroppableProps) => {
  const { dispatch, collisions: collisionsRef, manager } = useDndContext();
  const collisions = collisionsRef?.current;

  let over = false;
  if (collisions && collisions.length > 0) {
    for (let collision of collisions) {
      if (collision.id === id) {
        over = true;
      }
    }
  }
  const dropNode = useRef<DragNode>();
  const setDropNodeRef = useCallback((currentNode: HTMLElement | null) => {
    dropNode.current = currentNode as DragNode;
  }, []);
  const dataRef = useRef({ id, ...data });
  const attributes = {};

  useEffect(() => {
    dispatch({
      type: DragActionEnum.PUSH_NODE,
      payload: { node: { id, node: dropNode, data: dataRef }, type: 'droppables' },
    });
    return () => {
      dispatch({
        type: DragActionEnum.REMOVE_NODE,
        payload: { id, type: 'droppables' },
      });
    };
  }, [dispatch, id, manager]);

  return { over, dropNode, attributes, setDropNode: setDropNodeRef };
};
