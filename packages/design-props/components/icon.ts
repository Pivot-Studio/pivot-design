import React, { SVGProps } from 'react';
import { PivotDesignProps } from '.';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'rotate'>, PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 自定义样式
   * @default undefined
   */
  style?: React.CSSProperties;
  /**
   * @version 1.0.0
   * @description 图标类型
   * @default 'primary'
   */
  theme?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
  /**
   * @version 1.0.0
   * @description 图标尺寸
   * @default '16'
   */
  size?: string;
  /**
   * @version 1.0.0
   * @description 图标颜色
   * @default '#212529'
   */
  color?: string;
  /**
   * @version 1.0.0
   * @description 图标来源
   * @default undefined
   */
  icon?: string;
  /**
   * @version 1.0.0
   * @description 自定义导入的icon链接
   * @default undefined
   */
  url?: string;
  /**
   * @version 1.0.0
   * @description 是否旋转
   * @default false
   */
  rotating?: boolean;
}
