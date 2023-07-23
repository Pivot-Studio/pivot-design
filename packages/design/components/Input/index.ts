import InternelInput from './Input';
import Password from './Password';
import React from 'react';
import { InputProps } from 'pivot-design-props';

interface ComputedComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> {
  Password: typeof Password;
}

const Input = InternelInput as ComputedComponent;

Input.Password = Password;

export default Input;
