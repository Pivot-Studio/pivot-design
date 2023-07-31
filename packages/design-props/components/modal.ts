import React from 'react';
import { PivotDesignProps } from '.';
import { ButtonProps } from './button';
interface postion {
  x?: number;
  y?: number;
}

interface ModalCssTokens {}
export interface ModalProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 自定义样式
   * @default undefined
   */
  style?: React.CSSProperties & ModalCssTokens;
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
  modalOK?: Function;
  /**
   * @version 1.0.0
   * @description 取消函数
   * @default undefined
   */
  modalCancel?: Function;
  /**
   * @version 1.0.0
   * @description 对话框是否开启
   * @default false
   */
  open: boolean;
  /**
   * @version 1.0.0
   * @description 底部内容
   * @default undefined
   */
  footer?: null | React.ReactNode;
  /**
   * @version 1.0.0
   * @description 底部按钮排列方向
   * @default 'col'
   */
  footerButtonDirection?: 'col' | 'row';
  /**
   * @version 1.0.0
   * @description 内容
   * @default undefined
   */
  children?: React.ReactNode;
  /**
   * @version 1.0.0
   * @description 是否有关闭图标
   * @default  false
   */
  isClose?: boolean;
  /**
   * @version 1.0.0
   * @description 对话框位置
   * @default {x: 0, y: 0}
   */
  position?: postion;
  /**
   * @version 1.0.0
   * @description 关闭图标
   * @default undefined
   */
  closeIcon?: React.ReactNode;
  /**
   * @version 1.0.0
   * @description 是否开启蒙层
   * @default true
   */
  isMask?: boolean;
  /**
   * @version 1.0.0
   * @description 取消按钮参数
   * @default undefined
   */
  cancelButtonProps?: ButtonProps;
  /**
   * @version 1.0.0
   * @description 确定按钮参数
   * @default undefined
   */
  OkButtonProps?: ButtonProps;
  /**
   * @version 1.0.0
   * @description 自定义对话框
   * @default undefined
   */
  modalRender?: (node: React.ReactNode) => React.ReactNode;
}
