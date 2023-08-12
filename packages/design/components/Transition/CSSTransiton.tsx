import { useState } from 'react';
import PropTypes from 'prop-types';
import { addOneClass, removeOneClass } from '../utils/domClass';
// import Transition from './Transition';
import Transition from './index';

import { classNamesShape } from '../utils/PropTypes';

const forceReflow = (node: any) => node.scrollTop;
const addClassF = (node: any, classes: any) =>
  node && classes && classes.split(' ').forEach((c: any) => addOneClass(node, c));
const removeClass = (node: any, classes: any) =>
  node && classes && classes.split(' ').forEach((c: any) => removeOneClass(node, c));

const CSSTransition: any = (props: any) => {
  const [appliedClasses, setAppliedClasses] = useState({
    appear: {},
    enter: {},
    exit: {},
  });

  const onEnter = (maybeNode: any, maybeAppearing: any) => {
    const [node, appearing] = resolveArguments(maybeNode, maybeAppearing);
    removeClasses(node, 'exit');
    addClass(node, appearing ? 'appear' : 'enter', 'base');

    if (props.onEnter) {
      props.onEnter(maybeNode, maybeAppearing);
    }
  };

  const onEntering = (maybeNode: any, maybeAppearing: any) => {
    const [node, appearing] = resolveArguments(maybeNode, maybeAppearing);
    const type = appearing ? 'appear' : 'enter';
    addClass(node, type, 'active');

    if (props.onEntering) {
      props.onEntering(maybeNode, maybeAppearing);
    }
  };

  const onEntered = (maybeNode: any, maybeAppearing: any) => {
    const [node, appearing] = resolveArguments(maybeNode, maybeAppearing);
    const type = appearing ? 'appear' : 'enter';
    removeClasses(node, type);
    addClass(node, type, 'done');

    if (props.onEntered) {
      props.onEntered(maybeNode, maybeAppearing);
    }
  };

  const onExit = (maybeNode: any) => {
    const [node] = resolveArguments(maybeNode);
    removeClasses(node, 'appear');
    removeClasses(node, 'enter');
    addClass(node, 'exit', 'base');

    if (props.onExit) {
      props.onExit(maybeNode);
    }
  };

  const onExiting = (maybeNode: any) => {
    const [node] = resolveArguments(maybeNode);
    addClass(node, 'exit', 'active');

    if (props.onExiting) {
      props.onExiting(maybeNode);
    }
  };

  const onExited = (maybeNode: any) => {
    const [node] = resolveArguments(maybeNode);
    removeClasses(node, 'exit');
    addClass(node, 'exit', 'done');

    if (props.onExited) {
      props.onExited(maybeNode);
    }
  };

  const resolveArguments = (maybeNode: any, maybeAppearing: any = null) =>
    props.nodeRef
      ? [props.nodeRef.current, maybeNode] // here `maybeNode` is actually `appearing`
      : [maybeNode, maybeAppearing]; // `findDOMNode` was used

  const getClassNames = (type: any) => {
    const { classNames } = props;
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

  const addClass = (node: any, type: any, phase: any = '') => {
    let className = getClassNames(type)[`${phase}ClassName`];
    const { doneClassName } = getClassNames('enter');

    if (type === 'appear' && phase === 'done' && doneClassName) {
      className += ` ${doneClassName}`;
    }

    // This is to force a repaint,
    // which is necessary in order to transition styles when adding a class name.
    if (phase === 'active') {
      if (node) forceReflow(node);
    }

    if (className) {
      setAppliedClasses((prevAppliedClasses) => ({
        ...prevAppliedClasses,
        [type]: {
          ...prevAppliedClasses[type],
          [phase]: className,
        },
      }));
      addClassF(node, className);
    }
  };

  const removeClasses = (node: any, type: any) => {
    const { base: baseClassName, active: activeClassName, done: doneClassName } = appliedClasses[type];

    setAppliedClasses((prevAppliedClasses) => ({
      ...prevAppliedClasses,
      [type]: {},
    }));

    if (baseClassName) {
      removeClass(node, baseClassName);
    }
    if (activeClassName) {
      removeClass(node, activeClassName);
    }
    if (doneClassName) {
      removeClass(node, doneClassName);
    }
  };

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

CSSTransition.propTypes = {
  ...Transition.propTypes,

  classNames: classNamesShape,

  onEnter: PropTypes.func,

  onEntering: PropTypes.func,

  onEntered: PropTypes.func,

  onExit: PropTypes.func,

  onExiting: PropTypes.func,

  onExited: PropTypes.func,
};

export default CSSTransition;
