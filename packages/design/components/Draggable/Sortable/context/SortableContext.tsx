import { Data, UniqueIdentifier } from '../../types';
import { createContext, ReactNode, useEffect, useLayoutEffect, useMemo } from 'react';
import useDndContext from '../../context/useDndContext';
import { SortableData } from '../strategies/types';
import { DroppableRectMap } from '../../../Draggable/context/types';
import { useLatestValue } from '../../../Draggable/hooks/useLastValue';
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
  droppableRects: DroppableRectMap;
  transitionTime: string;
  /**
   * 当前是否处于拖拽过程中
   *
   * Whether an element is currently being dragged
   */
  dragging: boolean;
  type: 'vertical' | 'horizen' | 'grid';
  over?: Data<SortableData>;
  active?: Data<SortableData>;
}

const defaultSortableContext = {
  items: [],
  containerId: '',
  dragging: false,
  over: {
    sortable: {
      containerId: '',
      index: 0,
      items: [],
    },
  },
  active: {
    sortable: {
      containerId: '',
      index: 0,
      items: [],
    },
  },
  type: 'vertical' as const,
  droppableRects: new Map(),
  transitionTime: '300ms',
};

export const Context = createContext<SortableContextDescriptor>(defaultSortableContext);

export const SortableContext = (props: SortableContextProps) => {
  const { id = 'Sortable', children, items: propsItems, type = 'vertical', transitionTime = '300ms' } = props;
  const { activeId, manager, overNodeRef, droppableRects, updateDroppableRects } = useDndContext();

  const activeNode = manager.getNode(activeId, 'draggables');

  const dragging = !!activeId;

  const items = useMemo<UniqueIdentifier[]>(() => {
    return propsItems.map((item) => (item && typeof item === 'object' && 'id' in item ? item['id'] : item));
  }, [propsItems]);
  const prevItems = useLatestValue(items);
  // 使用useEffect将不行，执行顺序问题
  useLayoutEffect(() => {
    if (items !== prevItems.current && dragging) {
      // dispatch
      updateDroppableRects();
    }
  }, [dragging, items, prevItems, updateDroppableRects]);

  const initialContextValue: SortableContextDescriptor = {
    items,
    containerId: id,
    over: overNodeRef.current as Data<SortableData>,
    dragging,
    active: activeNode?.data as Data<SortableData>,
    droppableRects,
    type,
    transitionTime,
  };

  return <Context.Provider value={initialContextValue}>{children}</Context.Provider>;
};
