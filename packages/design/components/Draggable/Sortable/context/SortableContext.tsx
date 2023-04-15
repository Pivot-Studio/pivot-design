import { Data, UniqueIdentifier } from '../../types';
import { createContext, ReactNode, useMemo } from 'react';
import useDndContext from '../../context/useDndContext';
interface SortableContextProps {
  children: ReactNode;
  /**
   * Sortable Container‘s id
   */
  id: UniqueIdentifier;
  /**
   * Sortable items data
   */
  items: UniqueIdentifier[];
  /**
   * Sortable type
   */
  type?: 'vertical' | 'horizen' | 'grid';
  /**
   * Sortable items transfrom transition time when sorting
   */
  transitionTime?: string;
}

export interface SortableContextDescriptor {
  items: UniqueIdentifier[];
  containerId: UniqueIdentifier;
  droppableRects: DOMRect[];
  transitionTime: string;
  /**
   * 当前是否处于拖拽过程中
   *
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
  transitionTime: '300ms',
};

export const Context = createContext<SortableContextDescriptor>(defaultSortableContext);

export const SortableContext = (props: SortableContextProps) => {
  const { id = 'Sortable', children, items: propsItems, type = 'vertical', transitionTime = '300ms' } = props;
  const { activeId, manager, overNodeRef, droppableRects: globalDroppableRects } = useDndContext();

  const droppableRects = useMemo(() => {
    return globalDroppableRects.map((rect) => rect.clientRect);
  }, [globalDroppableRects]);

  const activeNode = manager.getNode(activeId, 'draggables');

  const dragging = !!activeId;

  const items = useMemo<UniqueIdentifier[]>(() => {
    return propsItems.map((item) => (item && typeof item === 'object' && 'id' in item ? item['id'] : item));
  }, [propsItems]);

  const initialContextValue: SortableContextDescriptor = {
    items,
    containerId: id,
    over: overNodeRef.current,
    dragging,
    active: activeNode?.data,
    droppableRects,
    type,
    transitionTime,
  };

  return <Context.Provider value={initialContextValue}>{children}</Context.Provider>;
};
