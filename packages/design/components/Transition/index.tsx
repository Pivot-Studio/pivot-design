import React, { useEffect, useRef, useState } from 'react';
import useUnmountedRef from '../utils/useUnmountedRef';
import usePrevious from '../utils/usePrevious';
import { getFormateTimeouts } from './initTimeouts';
import { TransitionPropTypes } from 'pivot-design-props';

export enum StatusEnum {
  UNMOUNTED = 'unmounted',
  EXITED = 'exited',
  ENTERING = 'entering',
  ENTERED = 'entered',
  EXITING = 'exiting',
}

const Transition: React.FC<TransitionPropTypes> = ({
  children,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
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

  const [status, setStatus] = useState<StatusEnum | null>(initStatus()); // 设置组件初始化状态
  const preStatus = usePrevious(status); // status变量改变前的值
  const nextStatusRef = useRef<StatusEnum | null>(null); // 预设下一个状态，便于取消之前已失效的safeSetStatus

  const inRef = useRef<boolean | null>(null); // 用于props的in
  const isMountingRef = useRef<boolean>(false); // 是否是初次挂载，初次挂载在in或status要特殊判断

  const nodeRef = useRef<HTMLDivElement>(null); // 用于获取组件实际的dom节点
  const unmountedRef = useUnmountedRef(); // 判断当前组件是否已被卸载
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

  // in 或 status 变化时组件状态
  useEffect(() => {
    // 初次挂载时，不执行
    if (isMountingRef.current) {
      return;
    }

    if (status === StatusEnum.UNMOUNTED) {
      if (!_in) return;

      setStatus(StatusEnum.EXITED); // 从卸载 unmounted 转为 exits
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
    updateStatus(nextStatus); // 更新status状态
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  /** 设置status并执行回调，确保在组件卸载后或组件状态变更后不会执行回调 */
  const safeSetStatus = (newStatus: StatusEnum | null, callback?: { (): void }) => {
    nextStatusRef.current = newStatus; // 先预设下一个状态，保证每次执行的callback都是最新的
    setStatus(newStatus);

    // 如果组件未被卸载
    if (unmountedRef && callback) {
      callback();
    }
  };

  /** 在指定时间后执行callback */
  const onTransitionEnd = async (timeout: number | null, nextStatus: StatusEnum | null, callback: any) => {
    if (timeout !== null && !unmountedRef.current) {
      setTimeout(() => {
        if (nextStatus && nextStatus !== nextStatusRef.current) return; // 如果状态已经改变，不执行callback
        callback();
      }, timeout);
    }
  };

  /** 进场动画 isMounting表示是否为首次挂载 */
  const performEnter = async (isMounting = false) => {
    const enterTimeout = isMounting && appear ? timeouts.appear : timeouts.enter;

    const node = nodeRef.current;

    onEnter?.(node, isMounting);
    if (!enterAnimation) {
      // 不执行进场动画，直接跳转到entered状态
      safeSetStatus(StatusEnum.ENTERED, () => {
        onEntered?.(node, isMounting);
        if (isMounting) isMountingRef.current = false;
      });
      return;
    }

    // 需要先保持一段时间的 exit, 不然无法展示从卸载到出现的动画
    setTimeout(() => {
      // 先更新状态为ENTERING，然后在指定时间后更新状态为 StatusEnum.ENTERED
      safeSetStatus(StatusEnum.ENTERING, () => {
        onEntering?.(node, isMounting);

        onTransitionEnd(enterTimeout, StatusEnum.ENTERING, () => {
          safeSetStatus(StatusEnum.ENTERED, () => {
            onEntered?.(node, isMounting);
            if (isMounting) isMountingRef.current = false;
          });
        });
      });
    }, 10);
  };

  /** 执行退场相关操作 */
  const performExit = () => {
    const node = nodeRef.current;

    onExit?.(node);

    if (!exitAnimation) {
      // 不执行出场动画，直接跳转到exited状态
      safeSetStatus(StatusEnum.EXITED, () => {
        onExited?.(node);
      });
      return;
    }

    // 先更新状态为EXITING、然后在指定时间后将状态更新为 StatusEnum.EXITED
    safeSetStatus(StatusEnum.EXITING, () => {
      onExiting?.(node);
      onTransitionEnd(timeouts.exit, StatusEnum.EXITING, () => {
        safeSetStatus(StatusEnum.EXITED, () => {
          onExited?.(node);
        });
      });
    });
  };

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

  // 卸载状态
  if (status === StatusEnum.UNMOUNTED) {
    return null;
  }

  return (
    // <TransitionGroupContext.Provider value={null}>
    <div ref={nodeRef}>
      {typeof children === 'function'
        ? children(status as StatusEnum)
        : React.cloneElement(React.Children.only(children) as React.ReactElement, childProps)}
    </div>
    // </TransitionGroupContext.Provider>
  );
};

export default Transition;
