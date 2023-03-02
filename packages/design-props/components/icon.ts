import React from 'react';
import { PivotDesignProps } from '.';
// interface IconCssTokens {
//   /**
//    * @version 1.0.0
//    * @description 图标颜色
//    * @default --pivot-icon-background-color
//    */
//   '--icon-background-color'?: string;
// }
export interface IconProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 自定义样式
   * @default undefined
   */
  style?: React.CSSProperties;
  /**
   * @version 1.0.0
   * @description 图标类型
   * @default 'default'
   */
  type?: 'primary' | 'default' | 'text' | 'link';
  /**
   * @version 1.0.0
   * @description 按钮是否禁用
   * @default 'middle'
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * @version 1.0.0
   * @description 按钮尺寸
   * @default false
   */
  disabled?: boolean;
  /**
   * @version 1.0.0
   * @description 按钮是否正在加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * @version 1.0.0
   * @description 按钮是否防抖，可选择是否立即执行
   * @default 0
   */
  debounce?: number | { delay: number; immediate: boolean };
  /**
   * @version 1.0.0
   * @description 按钮是否节流
   * @default false
   */
  throttle?: number | { delay: number; immediate: boolean };
}
