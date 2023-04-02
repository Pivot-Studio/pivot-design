import React from 'react';
import { ButtonProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
import { debounce } from '../utils/debounce';
import { throttle } from '../utils/throttle';
import { Loading } from 'pivot-design-icon';

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    style,
    children,
    onClick,
    type = 'default',
    size = 'middle',
    disabled = false,
    loading = false,
    debounce: debounceProps = 0,
    throttle: throttleProps = 0,
  } = props;
  interface throttleOrDebounceProps {
    type: 'throttle' | 'debounce' | 'common';
    delay: number;
    immediate: boolean;
  }

  // 按钮加载状态
  const [buttonLoading, setButtonLoading] = React.useState<boolean>(loading);

  // 节流防抖属性，优先使用防抖
  const getThrottleOrDebounce = (): throttleOrDebounceProps => {
    if (debounceProps !== 0) {
      return typeof debounceProps === 'number'
        ? { type: 'debounce', delay: debounceProps, immediate: false }
        : { type: 'debounce', ...debounceProps };
    } else if (throttleProps !== 0) {
      return typeof throttleProps === 'number'
        ? { type: 'throttle', delay: throttleProps, immediate: false }
        : { type: 'throttle', ...throttleProps };
    }
    return { type: 'common', delay: 0, immediate: false };
  };
  const throttleOrDebounce: throttleOrDebounceProps = getThrottleOrDebounce();

  // 传入的 loading 更改
  React.useEffect(() => {
    setButtonLoading(loading);
  }, [loading]);

  const throttleOrDebounceRecord: Record<'throttle' | 'debounce' | 'common', any> = {
    throttle: throttle(onClick || null, throttleOrDebounce.delay, throttleOrDebounce.immediate),
    debounce: debounce(onClick || null, throttleOrDebounce.delay, throttleOrDebounce.immediate),
    common: onClick,
  };
  const clickThrottleOrDebounce = throttleOrDebounceRecord[throttleOrDebounce.type];

  // 点击事件回调
  const triggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 若还在加载状态，点击后不执行onClick的回调
    if (buttonLoading) {
      e.preventDefault();
      return;
    }
    // 节流或防抖
    onClick && clickThrottleOrDebounce(e);
  };

  // 按钮传入的加载是否在 loading 状态
  const loadingOrDelay: boolean = loading;

  return (
    <button
      className={classnames(`${prefix}-button`, className, `${prefix}-button-${size}`, {
        [`${prefix}-button-${type}`]: type ? true : false,
        [`${prefix}-button-disabled`]: disabled,
        [`${prefix}-button-loading`]: loadingOrDelay ? true : false,
      })}
      style={style}
      onClick={(e) => triggerClick(e)}
    >
      {buttonLoading && <Loading rotate />}
      {children}
    </button>
  );
};
export default Button;
