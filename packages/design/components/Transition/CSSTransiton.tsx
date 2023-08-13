import { forceReflow, removeClass, addClass } from '../utils/domClass';
import Transition from './index';
// import useStateRef from '../utils/useStateRef';
import { CSSTransitionPropsTypes } from 'pivot-design-props';
import { useState } from 'react';
import { useEvent } from '../utils/useEvent';

const CSSTransition: React.FC<CSSTransitionPropsTypes> = (props) => {
  const [appliedClasses, setAppliedClasses] = useState({
    appear: {},
    enter: {},
    exit: {},
  });

  const onEnter = (maybeNode: HTMLElement, maybeAppearing?: boolean) => {
    const [node, appearing] = [maybeNode, maybeAppearing];
    removeClasses(node, 'exit');
    addClasses(node, appearing ? 'appear' : 'enter', 'base');

    if (props.onEnter) {
      props.onEnter(maybeNode, maybeAppearing);
    }
  };

  const onEntering = (maybeNode: HTMLElement, maybeAppearing?: boolean) => {
    const [node, appearing] = resolveArguments(maybeNode, maybeAppearing);
    const type = appearing ? 'appear' : 'enter';
    addClasses(node, type, 'active');

    if (props.onEntering) {
      props.onEntering(maybeNode, maybeAppearing);
    }
  };

  const onEntered = (maybeNode: HTMLElement, maybeAppearing: boolean) => {
    const [node, appearing] = resolveArguments(maybeNode, maybeAppearing);
    const type = appearing ? 'appear' : 'enter';
    removeClasses(node, type);
    addClasses(node, type, 'done');

    if (props.onEntered) {
      props.onEntered(maybeNode, maybeAppearing);
    }
  };

  const onExit = (maybeNode: HTMLElement) => {
    const [node] = resolveArguments(maybeNode);
    removeClasses(node, 'appear');
    removeClasses(node, 'enter');
    addClasses(node, 'exit', 'base');

    if (props.onExit) {
      props.onExit(maybeNode);
    }
  };

  const onExiting = (maybeNode: HTMLElement) => {
    const [node] = resolveArguments(maybeNode);
    addClasses(node, 'exit', 'active');

    if (props.onExiting) {
      props.onExiting(maybeNode);
    }
  };

  const onExited = (maybeNode: HTMLElement) => {
    const [node] = resolveArguments(maybeNode);
    removeClasses(node, 'exit');
    addClasses(node, 'exit', 'done');

    if (props.onExited) {
      props.onExited(maybeNode);
    }
  };

  // 如果外层绑定了ref，就使用外层传入的nodeRef
  const resolveArguments = (maybeNode: HTMLElement, maybeAppearing?: boolean) =>
    props.nodeRef
      ? ([props.nodeRef.current, maybeNode] as unknown as [HTMLElement, boolean])
      : ([maybeNode, maybeAppearing] as [HTMLElement, boolean]);

  const getClassNames = (type: string) => {
    const { classNames = '' } = props;
    const isStringClassNames = typeof classNames === 'string';
    const prefix = isStringClassNames && classNames ? `${classNames}-` : '';

    let baseClassName = isStringClassNames ? `${prefix}${type}` : classNames[type];

    let activeClassName = isStringClassNames ? `${baseClassName}-active` : classNames[`${type}Active`];

    let doneClassName = isStringClassNames ? `${baseClassName}-done` : classNames[`${type}Done`];

    return {
      baseClassName,
      activeClassName,
      doneClassName,
    };
  };

  // 添加对应的类型
  const addClasses = (node: HTMLElement, type: string, phase = '') => {
    let className = getClassNames(type)[`${phase}ClassName`];
    const { doneClassName } = getClassNames('enter');

    if (type === 'appear' && phase === 'done' && doneClassName) {
      className += ` ${doneClassName}`;
    }

    // 强制刷新
    if (phase === 'active') {
      if (node) forceReflow(node);
    }

    if (className) {
      setAppliedClasses((prevAppliedClasses) => {
        return {
          ...prevAppliedClasses,
          [type]: {
            ...prevAppliedClasses[type],
            [phase]: className,
          },
        };
      });
      addClass(node, className);
    }
    //
  };

  // 移除所有class
  const removeClasses = useEvent((node: HTMLElement, type: string) => {
    const newAppliedClasses = appliedClasses || {};
    const { base: baseClassName, active: activeClassName, done: doneClassName } = newAppliedClasses[type];

    setAppliedClasses((prevAppliedClasses) => {
      return {
        ...prevAppliedClasses,
        [type]: {},
      };
    });

    if (baseClassName) {
      removeClass(node, baseClassName);
    }
    if (activeClassName) {
      removeClass(node, activeClassName);
    }
    if (doneClassName) {
      removeClass(node, doneClassName);
    }
  });

  const { classNames: _, ...restProps } = props;

  return (
    <Transition
      {...restProps}
      onEnter={onEnter}
      onEntered={onEntered}
      onEntering={onEntering}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    />
  );
};

export default CSSTransition;
