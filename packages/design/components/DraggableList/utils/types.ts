import React, { MutableRefObject } from 'react';
export type UniqueIdentifier = number | string;
export interface DragNode extends HTMLElement {
  dragitemid: UniqueIdentifier;
}
export type DraggableNode = {
  id: UniqueIdentifier;
  index: number;
  node: MutableRefObject<DragNode | undefined>;
  // cache position
  clientRect?: DOMRect;
  // key: UniqueIdentifier;
  // activatorNode: MutableRefObject<HTMLElement | null>;
  // data: DataRef;
};
export interface SortableContextDescriptor {
  /**
   * 每个子组件是否处于拖拽状态
   */
  activeId: UniqueIdentifier;
  setActiveId?: React.Dispatch<React.SetStateAction<UniqueIdentifier>>;
  /**
   * 记录每一个拖拽元素
   */
  node: Record<UniqueIdentifier, DraggableNode>;
  setNode?: React.Dispatch<React.SetStateAction<Record<UniqueIdentifier, DraggableNode>>>;
}

export interface SortableContextProps {
  children: React.ReactNode;
}
