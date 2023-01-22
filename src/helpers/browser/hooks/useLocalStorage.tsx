import { useEffect, useState } from 'react';

const getItem = (key: string, defaultValue: any) => {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  }
  return defaultValue;
};

const setItemToLocalStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [item, setItem] = useState<T>(() => getItem(key, defaultValue));

  useEffect(() => {
    if (item) {
      setItemToLocalStorage(key, item);
    }
  }, [item, key])

  return { item, setItem };
}
