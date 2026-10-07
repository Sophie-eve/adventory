import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useTypewriter(messages: readonly string[], intervalMs = 3000) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (reduced) return;

    const msg = messages[index];
    if (isTyping) {
      if (displayed.length < msg.length) {
        const timer = setTimeout(() => setDisplayed(msg.slice(0, displayed.length + 1)), 35);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsTyping(false), intervalMs);
        return () => clearTimeout(timer);
      }
    } else {
      if (displayed.length > 0) {
        const timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 20);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIndex((i) => (i + 1) % messages.length);
          setIsTyping(true);
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [messages, index, displayed, isTyping, intervalMs, reduced]);

  return reduced ? messages[0] : displayed;
}
