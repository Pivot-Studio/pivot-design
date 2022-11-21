import React from 'react';
import { ButtonProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
const Button: React.FC<ButtonProps> = (props) => {
  const { className, style, children } = props;
  return (
    <button className={classnames(`${prefix}-button`, className)} style={style}>
      {children}
    </button>
  );
};
export default Button;
