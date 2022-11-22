import React from 'react';
import { PivotDesignProps } from './';
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
}

interface ButtonCssTokens {
  /**
   * @version 1.0.0
   * @description 按钮背景颜色
   * @default undefined
   */
  '--button-background-color'?: string;
}
