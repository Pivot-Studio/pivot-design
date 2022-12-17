import React from 'react';
import { PivotDesignProps } from './';
export interface DraggableListProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 列表默认插槽
   * @default undefined
   */
  children?: React.ReactNode[];
  transitionDuration?: number;
  onDragEnd?: (oldIndex: number, newIndex: number) => void;
}

export interface DraggableItemProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 列表子项默认插槽
   * @default undefined
   */
  children?: React.ReactNode;
  id?: number;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  onDragEnter?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDragEnd?: React.DragEventHandler<HTMLDivElement>;
}
