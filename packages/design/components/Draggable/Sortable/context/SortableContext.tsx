import { Data, UniqueIdentifier } from '../../types';
import { createContext, ReactNode, useMemo } from 'react';
import useDndContext from '../../hooks/useDndContext';
import Manager from '../../context/manager';

interface SortableContextProps {
  /**
   * Sortable Container‘s id
   */
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
  children: ReactNode;
  type?: 'vertical' | 'horizen' | 'grid';
}

export interface SortableContextDescriptor {
  items: UniqueIdentifier[];
  containerId: UniqueIdentifier;
  droppableRects: DOMRect[];
  /**
   * 当前是否处于拖拽过程中
   * Whether an element is currently being dragged
   */
  dragging: boolean;
  type: 'vertical' | 'horizen' | 'grid';
  over?: Data;
  active?: Data;
}

const defaultSortableContext = {
  items: [],
  containerId: '',
  dragging: false,
  over: {},
  active: {},
  type: 'vertical' as const,
  droppableRects: [],
};

export const Context = createContext<SortableContextDescriptor>(defaultSortableContext);

export const SortableContext = (props: SortableContextProps) => {
  const { id = 'Sortable', children, items: propsItems, type = 'vertical' } = props;
  const { activeId, transform, manager, overNodeRef, droppableRects: globalDroppableRects } = useDndContext();
  const droppableRects = useMemo(() => {
    return globalDroppableRects.map((rect) => rect.clientRect);
  }, [globalDroppableRects]);
  const activeNode = manager.getNode(activeId, 'draggables');
  const dragging = !!activeId;
  // sortable Id 由context来控制
  const items = useMemo<UniqueIdentifier[]>(() => {
    return propsItems.map((item) => (item && typeof item === 'object' && 'id' in item ? item.id : item));
  }, [propsItems]);

  const initialContextValue: SortableContextDescriptor = {
    items,
    containerId: id,
    over: overNodeRef.current,
    dragging,
    active: activeNode?.data.current,
    droppableRects,
    type,
  };

  return <Context.Provider value={initialContextValue}>{children}</Context.Provider>;
};
