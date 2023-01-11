import React from 'react';
import { PivotDesignProps } from './';
export interface DraggableListProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 列表默认插槽
   * @default undefined
   */
  children?: React.ReactNode[];
  /**
   * @version 1.0.0
   * @description 元素排序时移动的动画时长(ms)
   * @default 300
   */
  transitionDuration?: number;
  /**
   * @version 1.0.0
   * @description 拖拽结束时的回调函数
   * @param oldIndex 激活元素原本的索引
   * @param newIndex 激活元素移动到所在位置的索引
   * @default undefined
   */
  onDragEnd?: (oldIndex: number, newIndex: number) => void;
}

export interface DraggableItemProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 列表子项默认插槽
   * @default undefined
   */
  children?: React.ReactNode;
  /**
   * @version 1.0.0
   * @description 列表子项索引值
   * @default undefined
   */
  index?: number;
  /**
   * @version 1.0.0
   * @description 拖动元素相对定位的top偏移值
   * @default undefined
   */
  top?: number;
  /**
   * @version 1.0.0
   * @description 拖动元素相对定位的left偏移值
   * @default undefined
   */
  left?: number;
}
