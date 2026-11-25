import { useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T, isValid: (value: unknown) => value is T) {
  const [value, setValue] = useState<T>(() => {
    const stored = readJSON(key);
    return stored !== undefined && isValid(stored) ? stored : initialValue;
  });

  useEffect(() => {
    writeJSON(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
