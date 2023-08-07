import React from 'react';

// 传入的动画时间参数
export type timeoutType = number | { enter?: number, exit?: number, appear?: number };

export interface TransitionPropTypes {
  /**
   * @version 1.0.0
   * @description 用来控制进场、出场状态切换
   * @default true
   */
  in?: boolean;
  /**
   *  子组件，是一个函数或者ReactNode，
   *  如果为函数时其接受参数为刚刚介绍到的entering、entered 、exiting、exited 四个状态值
   */
  /**
   * @version 1.0.0
   * @description 子组件，是一个函数或者ReactNode，如果为函数时其接受参数为entering、entered 、exiting、exited
   */
  children?: React.ReactNode | ((status: string) => React.ReactNode);
  /**
   * @version 1.0.0
   * @description 动画执行时间
   */
  timeout: timeoutType;
  /**
   * @version 1.0.0
   * @description 首次挂载是是否展示动画
   * @default false
   */
  appear?: boolean;
  /**
   * @version 1.0.0
   * @description 是否展示进场动画
   * @default true
   */
  enterAnimation?: boolean;
  /**
   * @version 1.0.0
   * @description 是否展示出场动画
   * @default true
   */
  exitAnimation?: boolean;
  /**
   * @version 1.0.0
   * @description exit状态时是否卸载组件
   * @default false
   */
  unmountOnExit?: boolean;
  /**
   * @version 1.0.0
   * @description 初始化时是否卸载组件
   * @default false
   */
  mountOnEnter?: boolean;
  /**
   * @version 1.0.0
   * @description 进场动画执行前调用回调函数
   * @default () => {}
   */
  onEnter?: (node?: Element, isAppearing?: boolean) => void;
  /**
   * @version 1.0.0
   * @description 进场动画执行中调用
   * @default () => {}
   */
  onEntering?: (node?: Element, isAppearing?: boolean) => void;
  /**
   * @version 1.0.0
   * @description 进场动画执行完毕调用
   * @default () => {}
   */
  onEntered?: (node?: Element, isAppearing?: boolean) => void;
  /**
   * @version 1.0.0
   * @description 退场动画开始执行时调用
   * @default () => {}
   */
  onExit?: (node?: Element) => void;
  /**
   * @version 1.0.0
   * @description 退场动画执行中时调用
   * @default () => {}
   */
  onExiting?: (node?: Element) => void;
  /**
   * @version 1.0.0
   * @description 退场动画执行完毕调用
   * @default () => {}
   */
  onExited?: (node?: Element) => void;
}
