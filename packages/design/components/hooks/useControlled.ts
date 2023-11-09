/* eslint-disable no-redeclare */
import { useCallback, useState, SetStateAction, useEffect } from 'react';

export interface Options<T> {
  defaultValue?: T;
  defaultValuePropName?: string;
  valuePropName?: string;
  changeName?: string;
}

export interface StandardProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (val: T, ...args: any[]) => void;
}

type Props = Record<string, any>;

function useControlled<T = any>(
  props: StandardProps<T>
): [T, (v: SetStateAction<T>) => void];
function useControlled<T = any>(
  props?: StandardProps<T>,
  options?: Options<T>
): [T, (v: SetStateAction<T>, ...args: any[]) => void];

function useControlled<T = any>(props: Props = {}, options: Options<T> = {}) {
  const {
    defaultValue: defaultOptionsValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    changeName = 'onChange',
  } = options;

  // 获取外部传入的value，判断是否受控
  const value = props[valuePropName] as T;
  const defaultPropsValue = props[defaultValuePropName] ?? defaultOptionsValue;
  const propsOnChange = props[changeName];
  const isControlled = Object.hasOwn(props, valuePropName);
  const [state, setState] = useState<T>(
    isControlled ? value : defaultPropsValue
  );

  const setValue = useCallback((v: T, ...args: any[]) => {
    if (isControlled) {
      propsOnChange(v, args);
    }
    setState(v);
  }, []);

  return [state, setValue];
}

export default useControlled;
