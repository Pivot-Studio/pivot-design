import { useCallback, useEffect, useMemo, useRef } from 'react';
import { DragActionEnum } from '../context/types';
import { Data, UniqueIdentifier } from '../types';
import useDndContext from '../context/useDndContext';

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

export const useDroppable = ({ id, data: customData }: UseDroppableProps) => {
  const { dispatch, manager, container } = useDndContext();
  let over = container === id;

  const dropNode = useRef<HTMLElement>();
  const setDropNodeRef = useCallback((currentNode: HTMLElement | null) => {
    dropNode.current = currentNode as HTMLElement;
  }, []);
  const data = useMemo(() => ({ id, ...customData }), [customData, id]); // sortable needed

  const attributes = {};

  useEffect(() => {
    dispatch({
      type: DragActionEnum.PUSH_NODE,
      payload: { node: { id, node: dropNode, data }, type: 'droppables' },
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
