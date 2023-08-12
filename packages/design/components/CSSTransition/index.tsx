import React from 'react';
import Transition from '../Transition';
import { TransitionPropTypes } from 'pivot-design-props';
import { addClassNames, removeClassNames } from './utils';

interface CSSTransitionPropTypes extends TransitionPropTypes {
  classNames: string;
}

export default function CSSTransition(props: CSSTransitionPropTypes) {
  const { classNames, onEnter, onEntering, onEntered, onExit, onExiting, onExited, ...otherProps } = props;

  // 返回 base active done 状态的类名
  const getClassNames = (status: any) => {
    const { classNames } = props;
    const baseClassName = `${classNames}-${status}`;
    const activeClassName = `${classNames}-${status}-active`;
    const doneClassName = `${classNames}-${status}-done`;
    return {
      base: baseClassName,
      active: activeClassName,
      done: doneClassName,
    };
  };

  // 给给定的dom节点添加类名、并控制浏览器是否强制重绘
  const addClassNamesAndForceRepaint = (node, classNames, forceRepaint = false) => {
    // 此处主要是为了强制浏览器重绘
    if (forceRepaint) {
      node && node.offsetLeft;
    }
    addClassNames(node, classNames);
  };
  // 移除其他的类名并添加进场开始类名
  const _onEnter = (node, maybeAppear) => {
    // 移除上一次的类名
    const exitClassNames = Object.values(getClassNames('exit'));
    removeClassNames(node, exitClassNames);

    // 添加新的类名
    const enterClassName = getClassNames('enter').base;
    addClassNamesAndForceRepaint(node, enterClassName);

    if (onEnter) {
      onEnter(node, maybeAppear);
    }
  };
  // 添加进场进行时类名
  const _onEntering = (node, maybeAppear) => {
    // 添加新的类名
    const enteringClassName = getClassNames('enter').active;
    addClassNamesAndForceRepaint(node, enteringClassName, true);

    // 执行回调函数
    if (onEntering) {
      onEntering(node, maybeAppear);
    }
  };
  // 移除其他类名、添加进场结束类名
  const _onEntered = (node, maybeAppear) => {
    // 移除旧的类名
    const enteringClassName = getClassNames('enter').active;
    const enterClassName = getClassNames('enter').base;
    removeClassNames(node, [enterClassName, enteringClassName]);

    // 添加新的类名
    const enteredClassName = getClassNames('enter').done;
    addClassNamesAndForceRepaint(node, enteredClassName);

    // 执行回调函数
    if (onEntered) {
      onEntered(node, maybeAppear);
    }
  };

  // 移除其他类名、添加退场开始类名
  const _onExit = (node) => {
    // 移除上一次的类名
    const enteredClassNames = Object.values(getClassNames('enter'));
    removeClassNames(node, enteredClassNames);

    // 添加新的类名
    const exitClassName = getClassNames('exit').base;

    addClassNamesAndForceRepaint(node, exitClassName);
    if (onExit) {
      onExit(node);
    }
  };

  // 添加退场进行时类名
  const _onExiting = (node) => {
    const exitingClassName = getClassNames('exit').active;
    addClassNamesAndForceRepaint(node, exitingClassName, true);

    if (onExit) {
      onExit(node);
    }
  };
  // 添加退场完成时类名
  const _onExited = (node) => {
    const exitingClassName = getClassNames('exit').active;
    const exitClassName = getClassNames('exit').base;
    removeClassNames(node, [exitClassName, exitingClassName]);

    const exitedClassName = getClassNames('exit').done;
    addClassNamesAndForceRepaint(node, exitedClassName);

    if (onExited) {
      onExited(node);
    }
  };

  return (
    <Transition
      {...otherProps}
      onEnter={_onEnter}
      onEntering={_onEntering}
      onEntered={_onEntered}
      onExit={_onExit}
      onExiting={_onExiting}
      onExited={_onExited}
    >
      {props.children}
    </Transition>
  );
}
