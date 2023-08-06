import React, { useEffect, useRef, useState } from 'react';
import useUnmountedRef from '../utils/useUnmountedRef';
import usePrevious from '../utils/usePrevious';
const TransitionGroupContext = React.createContext(null);

export type timeoutType = number | { enter?: number; exit?: number; appear?: number };

export interface TransitionPropTypes {
  /**
   * 用来控制进场、出场状态切换
   * 默认为 false
   */
  in?: boolean;
  /**
   *  子组件，是一个函数或者ReactNode，
   *  如果为函数时其接受参数为刚刚介绍到的entering、entered 、exiting、exited 四个状态值
   */
  children?: React.ReactNode | ((status: string) => React.ReactNode);
  /**
   * 动画执行时间
   */
  timeout: timeoutType;
  /**
   * 首次挂载是是否展示动画
   */
  appear?: boolean;
  /**
   * 是否展示进场动画
   */
  enterAnimation?: boolean;
  /**
   * 是否展示出场动画
   */
  exitAnimation?: boolean;
  /**
   * exit状态时是否卸载组件
   */
  unmountOnExit?: boolean;
  /**
   * 初始化时是否卸载组件
   */
  mountOnEnter?: boolean;
  /**
   * 进场动画执行前调用
   */
  onEnter?: (node?: Element, isAppearing?: boolean) => void;
  /**
   * 进场动画执行中调用
   */
  onEntering?: (node?: Element, isAppearing?: boolean) => void;
  /**
   *    进场动画执行完毕调用
   */
  onEntered?: (node?: Element, isAppearing?: boolean) => void;
  /**
   *    退场动画开始执行时调用
   */
  onExit?: (node?: Element) => void;
  /**
   *    退场动画执行中时调用
   */
  onExiting?: (node?: Element) => void;
  /**
   *    退场动画执行完毕调用
   */
  onExited?: (node?: Element) => void;
}

export enum StatusEnum {
  UNMOUNTED = 'unmounted',
  EXITED = 'exited',
  ENTERING = 'entering',
  ENTERED = 'entered',
  EXITING = 'exiting',
}

const Transition: React.FC<TransitionPropTypes> = ({
  children,
  onEnter = () => {},
  onEntering = () => {},
  onEntered = () => {},
  onExit = () => {},
  onExiting = () => {},
  onExited = () => {},
  in: _in = true, // 获取外部传入的in，代表组件是否展示
  timeout: preTimeout,
  appear = false, // 第一次加载时，是否需要进场动画
  enterAnimation = true,
  exitAnimation = true,
  mountOnEnter = false,
  unmountOnExit = false,
  ...childProps
}) => {
  // 获取上下文
  const initialStatus = useRef<StatusEnum | null>(null); // 初始状态
  const appearStatus = useRef<StatusEnum | null>(null); // 初始状态

  // const { initialStatus, appearStatus } = getInitStatus(_in, appear);

  const [status, setStatus] = useState<StatusEnum | null>(initStatus()); // 设置初始化状态

  const unmountedRef = useUnmountedRef(); // 判断当前组件是否已被卸载
  const inRef = useRef<boolean | null>(null); // 用于props的in
  const isMountingRef = useRef<boolean>(false); // 用于props的in

  const nextStatusRef = useRef<StatusEnum | null>(null); // 预设下一个状态，便于取消之前已失效的safeSetStatus

  const preStatus = usePrevious(status);

  const timeouts = getFormateTimeouts(preTimeout); // 规范化后的时间，包括进场时间、退场时间、首次挂载进场时间

  // 控制 Transition 的子组件在首次挂载的时候是否执行进场动画
  useEffect(() => {
    let isMounting = false;
    if (initialStatus.current === StatusEnum.EXITED && appearStatus.current === StatusEnum.ENTERING) {
      isMounting = appear;
      isMountingRef.current = appear;
    }
    updateStatus(appearStatus.current, isMounting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // in 变化时组件状态
  useEffect(() => {
    // 初次挂载时，不执行
    if (isMountingRef.current) {
      return;
    }

    if (status === StatusEnum.UNMOUNTED) {
      if (_in) {
        setStatus(StatusEnum.EXITED); // 从卸载 unmounted 转为 exits
      }
      return;
    }

    // 状态为exited且需要卸载
    if (
      inRef.current === _in &&
      status === StatusEnum.EXITED &&
      (preStatus === StatusEnum.ENTERED || preStatus === StatusEnum.EXITING) &&
      unmountOnExit
    ) {
      setStatus(StatusEnum.UNMOUNTED);
      return;
    }

    let nextStatus = null; // status 下一个要变化的状态

    // 若in的值改变
    if (inRef.current !== _in) {
      if (_in) {
        // 变为「加载中」，执行加载动画
        if (status !== StatusEnum.ENTERING && status !== StatusEnum.ENTERED) {
          nextStatus = StatusEnum.ENTERING;
        }
      } else {
        // 变为「退场中」，执行加载动画
        if (status === StatusEnum.ENTERING || status === StatusEnum.ENTERED) {
          nextStatus = StatusEnum.EXITING;
        }
      }
    }
    inRef.current = _in;
    updateStatus(nextStatus); // 更新status状态，若为null可能是要卸载
  }, [_in, status]);

  function initStatus(): StatusEnum | null {
    let _initialStatus = StatusEnum.EXITED; // 初始状态，默认 exited
    let _appearStatus = null; // 首次出现的状态，即 initialStatus 需要切换的下一个状态
    if (_in) {
      if (appear) {
        // 首次挂载需要进场动画
        _initialStatus = StatusEnum.EXITED;
        _appearStatus = StatusEnum.ENTERING;
      } else {
        _initialStatus = StatusEnum.ENTERED;
      }
    } else {
      if (unmountOnExit || mountOnEnter) {
        _initialStatus = StatusEnum.UNMOUNTED; // 初始时未挂载
      } else {
        _initialStatus = StatusEnum.EXITED;
      }
    }
    appearStatus.current = _appearStatus;
    initialStatus.current = _initialStatus;

    return _initialStatus;
  }

  /** 更新 Status 和动画 */
  const updateStatus = (nextStatus: StatusEnum | null, isMounting = false) => {
    if (nextStatus !== null) {
      if (nextStatus === StatusEnum.ENTERING) {
        performEnter(isMounting); // 执行进场
      } else if (nextStatus === StatusEnum.EXITING) {
        performExit(); // 执行退场
      }
    }
  };

  /** 设置status并执行回调，确保在组件卸载后或组件状态变更后不会执行回调 */
  const safeSetStatus = (newStatus: StatusEnum | null, callback?: { (): void }) => {
    nextStatusRef.current = newStatus; // 先预设下一个状态，保证每次执行的callback都是最新的
    setStatus(newStatus);

    // 如果组件未被卸载
    if (unmountedRef && callback) {
      callback();
    }
  };

  /** 进场动画 isMounting表示是否为首次挂载 */
  const performEnter = (isMounting = false) => {
    const enterTimeout = isMounting && appear ? timeouts.appear : timeouts.enter;

    onEnter?.();
    if (!enterAnimation) {
      // 不执行进场动画，直接跳转到entered状态
      safeSetStatus(StatusEnum.ENTERED, () => {
        onEntered?.();
        if (isMounting) isMountingRef.current = false;
      });
      return;
    }

    // 先更新状态为ENTERING，然后在指定时间后更新状态为 StatusEnum.ENTERED
    safeSetStatus(StatusEnum.ENTERING, () => {
      onEntering?.();
      onTransitionEnd(enterTimeout, StatusEnum.ENTERING, () => {
        safeSetStatus(StatusEnum.ENTERED, () => {
          onEntered?.();
          if (isMounting) isMountingRef.current = false;
        });
      });
    });
  };

  /** 执行退场相关操作 */
  const performExit = () => {
    onExit?.();

    if (!exitAnimation) {
      // 不执行出场动画，直接跳转到exited状态
      safeSetStatus(StatusEnum.EXITED, () => {
        onExited?.();
        if (unmountOnExit) updateStatus(null); // 卸载组件
      });
      return;
    }

    // 先更新状态为EXITING、然后在指定时间后将状态更新为 StatusEnum.EXITED
    safeSetStatus(StatusEnum.EXITING, () => {
      onExiting?.();
      onTransitionEnd(timeouts.exit, StatusEnum.EXITING, () => {
        safeSetStatus(StatusEnum.EXITED, () => {
          onExited?.();
          if (unmountOnExit) updateStatus(null); // 卸载组件
        });
      });
    });
  };

  /** 在指定时间后执行callback */
  const onTransitionEnd = (timeout: number | null, nextStatus: StatusEnum, callback: any) => {
    if (timeout !== null && !unmountedRef.current) {
      setTimeout(() => {
        if (nextStatus !== nextStatusRef.current) return; // 如果状态已经改变，不执行callback
        callback();
      }, timeout);
    }
  };

  /** 统一转化timeout格式 */
  function getFormateTimeouts(timeout: timeoutType | null) {
    let exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout?.exit;
      enter = timeout?.enter;
      appear = timeout?.appear !== undefined ? timeout?.appear : enter;
    }
    return { exit, enter, appear } as { enter: number; exit: number; appear: number };
  }

  // 卸载状态
  if (status === StatusEnum.UNMOUNTED) {
    return null;
  }

  return (
    <TransitionGroupContext.Provider value={null}>
      {typeof children === 'function'
        ? children(status as StatusEnum)
        : React.cloneElement(React.Children.only(children) as React.ReactElement, childProps)}
    </TransitionGroupContext.Provider>
  );
};

export default Transition;
