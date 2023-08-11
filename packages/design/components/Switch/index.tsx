import classnames from 'classnames';
import { prefix } from '../constants';
import './index.scss';
import useControlled from '../hooks/useControlled';

interface SwitchProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (e: boolean) => void;
}

function Switch(props: SwitchProps) {
  const [value, setValue] = useControlled(props);

  return (
    <div
      className={classnames(`${prefix}-switch`, {
        checked: value,
      })}
    >
      <div className={classnames(`${prefix}-switch-pole`)} />
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
