import React from 'react';
import { PivotDesignProps } from './';
export interface CardProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 自定义样式
   * @default undefined
   */
  style?: React.CSSProperties
  /**
   * @version 1.0.0
   * @description 自定义大小
   * @default undefined
   */
  size?: 'small' | 'middle' | 'large'
  /**
  * @version 1.0.0
  * @description 卡片内容是否加载
  * @default middle
  */
  loading?: boolean
  /**
  * @version 1.0.0
  * @description 卡片标题
  * @default undefined
  */
  title?: string
  /**
  * @version 1.0.0
  * @description 卡片底部的操作组
  * @default undefined
  */
  actions?: Array<React.ReactNode>
  /**
  * @version 1.0.0
  * @description 是否有边框
  * @default true
  */
  bordered?: boolean
  /**
  * @version 1.0.0
  * @description 卡片右上角标签
  * @default undefined
  */
  extra?: React.ReactNode
  /**
   * @version 1.0.0
   * @description 时间标签
   * @default undefined
   */
  time?: string
  /**
  * @version 1.0.0
  * @description 内容
  * @default undefined
  */
  children?: React.ReactNode
   /**
  * @version 1.0.0
  * @description 文字最大显示长度
  * @default 4
  */
 maxLength?: number
  /**
  * @version 1.0.0
  * @description 展开按钮文字
  * @default 展开
  */
 expandText?: string
  /**
  * @version 1.0.0
  * @description 收起按钮文字
  * @default 收起
  */
 collapseText?: string
}