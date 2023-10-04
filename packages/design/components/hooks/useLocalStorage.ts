import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, options: any) => {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState(storedValue || options.defaultValue);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
