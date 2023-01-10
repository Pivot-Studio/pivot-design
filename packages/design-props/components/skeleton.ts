import React from 'react';
import { PivotDesignProps } from './';

export interface SkeletonProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 自定义样式
   * @default undefined
   */
  style?: React.CSSProperties & CardCssTokens;
  /**
   * @version 1.0.0
   * @description 是否展示动画效果
   * @default false
   */
  active?: boolean;
  /**
   * @version 1.0.0
   * @description 头像占位
   * @default false
   */
  avatar?: boolean;
  /**
   * @version 1.0.0
   * @description 是否加载
   * @default undefined
   */
  loading?: boolean;
  /**
   * @version 1.0.0
   * @description 自定义样式
   * @default 4
   */
  row?: number;
}
interface CardCssTokens {
  /**
   * @version 1.0.0
   * @description 卡片背景颜色
   *@default --pivot-card-background-color
   */
  '--card-background-color'?: string;
}
