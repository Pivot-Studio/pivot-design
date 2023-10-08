import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, options: any) => {
  const uniqueKey = `pivot_editor_${key}`;
  const storedValue = localStorage.getItem(uniqueKey);
  const [value, setValue] = useState(storedValue || options.defaultValue);
  useEffect(() => {
    localStorage.setItem(uniqueKey, value);
  }, [uniqueKey, value]);
  return [value, setValue];
};

export default useLocalStorage;
