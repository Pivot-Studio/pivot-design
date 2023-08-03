import React from 'react';
import { PivotDesignProps } from '.';

export interface DraggableItemProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 列表子项唯一标识（必填）
   * @default undefined
   */
  id: number | string;
  /**
   * @version 1.0.0
   * @description 列表子项默认插槽
   * @default undefined
   */
  children?: React.ReactNode;
  /**
   * @version 1.0.0
   * @description 是否设置拖动点
   * @default false
   */
  handle?: boolean;
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
// test
export interface DraggableProps extends PivotDesignProps {
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
