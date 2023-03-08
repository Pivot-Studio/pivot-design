import React, { ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef, useState } from 'react';
import classNames from 'classnames';
import { InputProps } from 'pivot-design-props';

import Icon from '../Icon';
import './index.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, icon, prepend, append, onClick, style, onChange, iconOnClick, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);

  const classes = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });
  return (
    <div className={classes} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && (
        <div
          className="icon-wrapper"
          onClick={() => {
            console.log(1);
            iconOnClick && iconOnClick();
          }}
        >
          <Icon icon={icon} />
        </div>
      )}
      <input
        ref={ref}
        className="input-inner"
        disabled={disabled}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange && onChange(e);
        }}
        value={inputValue}
        {...restProps}
      />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
