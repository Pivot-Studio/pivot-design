import { useCallback, useEffect, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { DragNode, UniqueIdentifier } from '../types';
import useDndContext from './useDndContext';

interface UseDroppableProps {
  id: UniqueIdentifier;
  index: number;
}

export const useDroppable = ({ id, index }: UseDroppableProps) => {
  const { dispatch, collisions: collisionsRef, manager } = useDndContext();
  const collisions = collisionsRef?.current;
  // const node = manager.getNode(id, 'droppables');
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

  const attributes = {};

  useEffect(() => {
    dispatch({
      type: DragActionEnum.PUSH_NODE,
      payload: { node: { id, index, node: dropNode }, type: 'droppables' },
    });
    // manager.push({ id, index, node: dragNode });
    return () => {
      dispatch({
        type: DragActionEnum.REMOVE_NODE,
        payload: { id, type: 'droppables' },
      });
    };
  }, [dispatch, id, index, manager]);

  return { over, dropNode, attributes, setDropNode: setDropNodeRef };
};
