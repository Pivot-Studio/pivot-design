import React from 'react';

// 传入的动画时间参数
export type timeoutType = number | { enter?: number, exit?: number, appear?: number };

export interface TransitionPropTypes {
  /**
   * @version 1.0.0
   * @description 动画绑定的元素
   */
  nodeRef?: React.RefObject<HTMLElement | null>;
  /**
   * @version 1.0.0
   * @description 用来控制进场、出场状态切换
   * @default true
   */
  in?: boolean;
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
   */
  onEnter?: (node?: HTMLElement | null, isAppearing?: boolean) => void;
  /**
   * @version 1.0.0
   * @description 进场动画执行中调用
   */
  onEntering?: (node?: HTMLElement | null, isAppearing?: boolean) => void;
  /**
   * @version 1.0.0
   * @description 进场动画执行完毕调用
   */
  onEntered?: (node?: HTMLElement | null, isAppearing?: boolean) => void;
  /**
   * @version 1.0.0
   * @description 退场动画开始执行时调用
   */
  onExit?: (node?: HTMLElement | null) => void;
  /**
   * @version 1.0.0
   * @description 退场动画执行中时调用
   */
  onExiting?: (node?: HTMLElement | null) => void;
  /**
   * @version 1.0.0
   * @description 退场动画执行完毕调用
   */
  onExited?: (node?: HTMLElement | null) => void;
}

export interface CSSTransitionPropsTypes extends TransitionPropTypes {
  /**
   * @version 1.0.0
   * @description class类型，可以传入对应的class类名，在元素不同阶段会自动变更
   */
  classNames?:
    | string
    | {
        appear?: string,
        appearActive?: string,
        appearDone?: string,
        enter?: string,
        enterActive?: string,
        enterDone?: string,
        exit?: string,
        exitActive?: string,
        exitDone?: string,
      };
}
