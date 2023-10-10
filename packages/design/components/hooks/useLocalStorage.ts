import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, options: any) => {
  const uniqueKey = `pivot_editor_${key}`;
  const needToJson = typeof options.defaultValue === 'object';

  const storedValue = localStorage.getItem(uniqueKey);

  const defaultValue = needToJson
    ? JSON.stringify(options.defaultValue)
    : options.defaultValue;

  const [value, _setValue] = useState(storedValue || defaultValue);

  useEffect(() => {
    console.log('set');

    localStorage.setItem(uniqueKey, value);
  }, [uniqueKey, value]);
  const setValue = (value: any) => {
    if (typeof value === 'function') {
      _setValue(needToJson ? JSON.stringify(value()) : value());
      return;
    }
    _setValue(needToJson ? JSON.stringify(value) : value);
  };
  return [needToJson ? JSON.parse(value) : value, setValue];
};

export default useLocalStorage;
