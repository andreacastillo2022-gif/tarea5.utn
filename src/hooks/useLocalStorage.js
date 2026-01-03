import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {

  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : [];

    // combinar iniciales + guardadas sin duplicar IDs
    const ids = new Set(parsed.map(t => t.id));
    const merged = [
      ...initialValue.filter(t => !ids.has(t.id)),
      ...parsed
    ];

    return merged;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
