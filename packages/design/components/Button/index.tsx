import React from 'react';
import { ButtonProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
const Button: React.FC<ButtonProps> = (props) => {
  const { className } = props;
  return (
    <div className={classnames(`${prefix}-button`, className)}>
      button component
    </div>
  );
};
export default Button;
