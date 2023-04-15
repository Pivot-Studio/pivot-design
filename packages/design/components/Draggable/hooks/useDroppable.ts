import { useCallback, useEffect, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { Data, DragNode, UniqueIdentifier } from '../types';
import useDndContext from './useDndContext';

interface UseDroppableProps {
  id: UniqueIdentifier;
  /**
   * sortable container needed，example below：
   * ```js
   * data: { sortable: { type: 'container' } }
   * ```
   */
  data?: Data;
}

export const useDroppable = ({ id, data }: UseDroppableProps) => {
  const { dispatch, manager, container } = useDndContext();
  let over = container === id;

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
