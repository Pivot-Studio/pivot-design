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
   * @description 自定义条数
   * @default 4
   */
  row?: number;
  /**
   * @version 1.0.0
   * @description 标题
   * @default false
   */
  title?: boolean;
  /**
   * @version 1.0.0
   * @description 块状
   * @default false
   */
  brick?: boolean;
}

interface CardCssTokens {
  /**
   * @version 1.0.0
   * @description 背景颜色
   *@default --pivot-Skeleton-background-color
   */
  '--skeleton-background-color'?: string;
  /**
   * @version 1.0.0
   * @description 自定义段落宽度
   * @default 0.8
   */
  '--skeleton-paragraph-size'?: number;
  /**
   * @version 1.0.0
   * @description 是否展示动画效果
   * @default active
   */
  '--skeleton-active'?: string;
  /**
   * @version 1.0.0
   * @description 标题长度
   * @default 1
   */
  '--skeleton-title-height'?: number;
  /**
   * @version 1.0.0
   * @description 标题宽度
   * @default 40%
   */
  '--skeleton-title-width'?: number;
}
