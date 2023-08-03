import React from 'react';
import { PivotDesignProps } from '.';

export type PlaceType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

export interface PopoverProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 触发popover的内容
   * @default undefined
   */
  children: React.ReactElement;

  /**
   * @version 1.0.0
   * @description popover的内容
   * @default undefined
   */
  content?: string | React.ReactNode;

  /**
   * @version 1.0.0
   * @description 设置popover的位置
   * @default undefined
   */
  placement?: PlaceType;

  /**
   * @version 1.0.0
   * @description 为popover添加类名
   * @default undefined
   */
  popoverClass?: string;

  /**
   * @version 1.0.0
   * @description popover是否可用
   * @default false
   */
  disabled?: boolean;

  /**
   * @version 1.0.0
   * @description 是否显示箭头
   * @default true
   */
  arrowShow?: boolean;

  /**
   * @version 1.0.0
   * @description 触发popover的方式
   * @default 'hover'
   */
  triggerType?: 'hover' | 'click';
}
