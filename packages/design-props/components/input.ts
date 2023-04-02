import { ChangeEvent } from 'react';
import { PivotDesignProps } from '.';

type InputSize = 'lg' | 'sm' | 'md';

export interface InputProps extends PivotDesignProps, HTMLInputElement {
  /**
   * @version 1.0.0
   * @description 是否禁用 Input
   * @default false
   */
  disabled?: boolean;
  /**
   * @version 1.0.0
   * @description 图标尺寸
   * @default '16'
   */
  size?: InputSize;
  /**
   * @version 1.0.0
   * @description input内容修改时的回调
   * @default undefined
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * @version 1.0.0
   * @description 右侧悬浮图标
   * @default undefined
   */
  icon?: string;
  /**
   * @version 1.0.0
   * @description 固定前缀
   * @default undefined
   */
  prepend?: string;
  /**
   * @version 1.0.0
   * @description 固定后缀
   * @default undefined
   */
  append?: string;
  /**
   * @version 1.0.0
   * @description 点击输入框的回调
   * @default undefined
   */
  onClick?: any;
  /**
   * @version 1.0.0
   * @description 点击图标的回调
   * @default undefined
   */
  iconOnClick?: any;
  /**
   * @version 1.0.0
   * @description 输入框的值，单向绑定
   * @default undefined
   */
  value?: string;
}
