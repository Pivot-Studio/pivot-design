import React from 'react';
import { PivotDesignProps } from '.';
interface postion {
  x?: number;
  y?: number;
}

export interface ModalProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 自定义样式
   * @default undefined
   */
  style?: React.CSSProperties & ModalCssTokens;
  /**
   * @version 1.0.0
   * @description 自定义大小
   * @default undefined
   */
  size?: 'small' | 'normal';
   /**
   * @version 1.0.0
   * @description 自定义蒙层
   * @default undefined
   */
  maskstyle?: React.CSSProperties & ModalCssTokens;
  /**
   * @version 1.0.0
   * @description 卡片内容是否加载
   * @default normal
   */
  loading?: boolean;
  /**
   * @version 1.0.0
   * @description 对话框标题
   * @default undefined
   */
  title?: String | React.ReactNode;
  /**
   * @version 1.0.0
   * @description 对话框内容
   * @default undefined
   */
  content?: String | React.ReactNode;
  /**
   * @version 1.0.0
   * @description 确定函数
   * @default undefined
   */
  ModalOK?: Function;
  /**
   * @version 1.0.0
   * @description 取消函数
   * @default undefined
   */
  ModalCancel?: Function;
  /**
   * @version 1.0.0
   * @description 对话框是否开启
   * @default undefined
   */
  open: boolean;
  /**
   * @version 1.0.0
   * @description 对话框是否开启
   * @default undefined
   */
  footer?: null | React.ReactNode;
  /**
   * @version 1.0.0
   * @description 对话框是否开启
   * @default undefined
   */
  closed?: null | React.ReactNode;
  /**
   * @version 1.0.0
   * @description 对话框位置
   * @default undefined
   */
  postion?: postion;
  /**
   * @version 1.0.0
   * @description 是否开启蒙层
   * @default undefined
   */
   isMask?: boolean;
}

interface ModalCssTokens {
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
