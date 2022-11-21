import React from 'react';
import { PivotDesignProps } from './';
export interface ButtonProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 按钮默认插槽
   */
  children?: React.ReactNode;
  /**
   * @version 1.0.0
   * @description 自定义样式
   */
  style?: React.CSSProperties & ButtonCssTokens;
}

interface ButtonCssTokens {
  /**
   * @version 1.0.0
   * @description 按钮背景颜色
   */
  '--button-background-color': string;
}
