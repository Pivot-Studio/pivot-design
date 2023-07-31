import React from 'react';
import { PivotDesignProps } from './';
interface ButtonCssTokens {
  /**
   * @version 1.0.0
   * @description 按钮背景颜色
   * @default --pivot-button-background-color
   */
  '--button-background-color'?: string;
  /**
   * @version 1.0.0
   * @description 按钮禁用时背景颜色
   * @default --pivot-button-disabled-background-color
   */
  '--button-disabled-background-color'?: string;
}
export interface ButtonProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 按钮默认插槽
   * @default undefined
   */
  children?: React.ReactNode;
  /**
   * @version 1.0.0
   * @description 自定义样式
   * @default undefined
   */
  style?: React.CSSProperties & ButtonCssTokens;
  /**
   * @version 1.0.0
   * @description 点击事件
   * @default undefined
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * @version 1.0.0
   * @description 按钮类型
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
  debounce?: number | { delay: number, immediate: boolean };
  /**
   * @version 1.0.0
   * @description 按钮是否节流
   * @default false
   */
  throttle?: number | { delay: number, immediate: boolean };
}
