import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.15, rootMargin, root } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin, root }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, root]);

  return { ref, inView };
}
