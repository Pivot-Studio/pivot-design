import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { InputProps } from 'pivot-design-props';
import './index.scss';
import { prefix } from '../constants';
import { Icon } from 'pivot-design-icon';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, icon, prepend, append, onClick, style, onChange, iconOnClick, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);

  function getIcon(): React.ReactNode {
    if (typeof icon !== 'string') return icon;
    else return <Icon icon={icon} />;
  }

  const classes = classNames([`${prefix}-input-wrapper`], {
    [`${prefix}-input-size-${size}`]: size,
    // 'is-disabled': disabled,
    [`${prefix}-input-disabled`]: disabled,
    [`${prefix}-input-group`]: prepend || append,
    [`${prefix}-input-group-append`]: !!append,
    [`${prefix}-input-group-prepend`]: !!prepend,
  });
  return (
    <div className={classes} style={style}>
      {prepend && <div className={`${prefix}-input-group-prepend`}>{prepend}</div>}
      {icon && (
        <div
          className={`${prefix}-icon-wrapper`}
          onClick={() => {
            iconOnClick?.();
          }}
        >
          {getIcon()}
        </div>
      )}
      <input
        ref={ref}
        className={`${prefix}-input-inner`}
        disabled={disabled}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange && onChange(e);
        }}
        value={inputValue}
        {...restProps}
      />
      {append && <div className={`${prefix}-input-group-append`}>{append}</div>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
