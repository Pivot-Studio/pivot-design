import { useEffect, useState } from 'react';

const useLocalStorage = <T>(
  key: string,
  options: {
    defaultValue: T;
  }
): [T, (v: T) => void] => {
  const uniqueKey = `pivot_editor_${key}`;
  const needToJson = typeof options.defaultValue === 'object';

  const storedValue = localStorage.getItem(uniqueKey);

  const defaultValue = needToJson
    ? JSON.stringify(options.defaultValue)
    : (options.defaultValue as string);

  const [value, _setValue] = useState<string>(storedValue || defaultValue);

  useEffect(() => {
    localStorage.setItem(uniqueKey, value);
  }, [uniqueKey, value]);

  const setValue = (value) => {
    if (typeof value === 'function') {
      _setValue(needToJson ? JSON.stringify(value()) : value());
      return;
    }
    _setValue(needToJson ? JSON.stringify(value) : value);
  };

  return [needToJson ? JSON.parse(value) : value, setValue];
};

export default useLocalStorage;
