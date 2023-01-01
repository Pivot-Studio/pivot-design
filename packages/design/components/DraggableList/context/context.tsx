import { createContext, useState } from 'react';
import { DraggableNode, SortableContextDescriptor, SortableContextProps, UniqueIdentifier } from '../utils/types';

//TODO:不改变dom结构，使用transform动画来实现效果
//在ctx记录每一个DraggableItem的坐标
const initDraggableContext: SortableContextDescriptor = {
  activeId: '',
  node: {},
};
function dragReducer(
  state: SortableContextDescriptor,
  action: {
    type: string;
    payload?: Partial<SortableContextDescriptor>;
  }
) {
  switch (action.type) {
    case '': {
      break;
    }
    default:
      return state;
  }
}

export const Context = createContext<SortableContextDescriptor>(initDraggableContext);

export function SortableContext({ children }: SortableContextProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier>('');
  const [node, setNode] = useState<Record<UniqueIdentifier, DraggableNode>>({});
  const initDraggableContext: SortableContextDescriptor = {
    activeId,
    setActiveId,
    node,
    setNode,
  };
  return <Context.Provider value={initDraggableContext}>{children}</Context.Provider>;
}
