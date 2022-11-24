import React from 'react';
import { ButtonProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
const Button: React.FC<ButtonProps> = (props) => {
  const { className, style, children, onClick, type='default' } = props;
  const triggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
  };
  return (
    <button
      className={classnames(`${prefix}-button`, className, {
        [`${prefix}-button-${type}`]: type ? true : false,
      })}
      style={style}
      onClick={(e) => triggerClick(e)}
    >
      {children}
    </button>
  );
};
export default Button;
