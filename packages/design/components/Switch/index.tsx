import classnames from 'classnames';
import { prefix } from '../constants';
import './index.scss';
import useControlled from '../hooks/useControlled';
import { ReactNode } from 'react';

interface SwitchProps {
  value?: boolean;
  defaultValue?: boolean;
  size?: 'normal' | 'large';
  checkedText?: ReactNode;
  uncheckedText?: ReactNode;
  onChange?: (e: boolean) => void;
}

function Switch(props: SwitchProps) {
  const [value, setValue] = useControlled(props);
  const { size = 'normal', checkedText, uncheckedText } = props;

  return (
    <div
      className={classnames(`${prefix}-switch`, [`${prefix}-switch-size-${size}`], {
        checked: value,
      })}
    >
      <div className={classnames(`${prefix}-switch-pole`)} />
      <div
        className={classnames(`${prefix}-switch-text`, {
          checked: value,
        })}
      >
        {value ? checkedText : uncheckedText}
      </div>
      <input
        type="checkbox"
        className={classnames(`${prefix}-switch-input`)}
        defaultChecked={value}
        onChange={(e) => setValue(e.target.checked)}
      />
    </div>
  );
}
export default Switch;
