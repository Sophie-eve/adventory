import { useEffect } from 'react';

export function useKeyboard(key: string, callback: () => void, meta = false) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (meta && !(e.metaKey || e.ctrlKey)) return;
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [key, callback, meta]);
}
