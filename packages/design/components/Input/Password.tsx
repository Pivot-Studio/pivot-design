import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import Input from './Input';
import { InputPasswdProps } from 'pivot-design-props';

export const Password = forwardRef<HTMLInputElement, InputPasswdProps>((props, ref) => {
  const { visibilityToggle = false } = props;
  let [isVisible, setIsVisible] = useState(false);
  if (visibilityToggle == true) setIsVisible(true);
  else if (typeof visibilityToggle == 'object') {
    isVisible = visibilityToggle.visible;
    setIsVisible = visibilityToggle.onVisibleChange;
  }

  const icon = isVisible ? 'PasswordShow' : 'PasswordHidden';
  const type = isVisible ? 'text' : 'password';

  const iconOnClick = () => {
    setIsVisible(!isVisible);
  };

  const omittedProps = { ...props, icon, type, iconOnClick };
  return <Input ref={ref} {...omittedProps} />;
});

Password.displayName = 'Password';

export default Password;
