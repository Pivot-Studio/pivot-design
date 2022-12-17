import { useCallback, useContext, useEffect, useRef } from 'react';
import { Context } from '../utils/context';
import { DragNode, UniqueIdentifier } from '../utils/type';
interface UseDraggableProps {
  id: UniqueIdentifier;
  index: number;
}
export const useDraggable = ({ id, index }: UseDraggableProps) => {
  const { activeId, node: draggableNodes, setNode } = useContext(Context);
  const isDragging = activeId == id;
  const dragNode = useRef<DragNode>();
  const setDragNodeRef = useCallback((currentNode: HTMLElement | null) => {
    dragNode.current = currentNode as DragNode;
    if (dragNode.current) {
      dragNode.current.dragitemid = id;
    }
  }, []);

  useEffect(() => {
    draggableNodes[id] = { id, index, node: dragNode };
    setNode && setNode({ ...draggableNodes });
  }, []);
  return { isDragging, dragNode, setDragNode: setDragNodeRef };
};
