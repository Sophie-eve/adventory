import { useEffect, useRef, useState, useMemo, type CSSProperties, type ElementType } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface StaggeredTextProps {
  text: string;
  segmentBy?: 'characters' | 'words' | 'lines';
  staggerDirection?: 'forward' | 'reverse' | 'center';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  duration?: number;
  delay?: number;
  blur?: boolean;
  threshold?: number;
  rootMargin?: string;
  tag?: ElementType;
  className?: string;
  style?: CSSProperties;
  onAnimationComplete?: () => void;
}

/**
 * StaggeredText (React Bits Pro component)
 * Text that staggers in by letter, word, or line.
 * Fully responsive, accessible (reduced-motion aware), and scroll-triggered.
 */
export function StaggeredText({
  text,
  segmentBy = 'words',
  staggerDirection = 'forward',
  direction = 'bottom',
  duration = 1.5,
  delay = 0.08,
  blur = true,
  threshold = 0.15,
  rootMargin = '0px',
  tag: Component = 'span',
  className = '',
  style,
  onAnimationComplete,
}: StaggeredTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(() => reducedMotion);

  // Viewport intersection observer to trigger entrance animation
  useEffect(() => {
    if (reducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reducedMotion]);

  // Segment text into characters, words, or lines
  const segments = useMemo(() => {
    if (!text) return [];
    if (segmentBy === 'characters') {
      return text.split('').map((char) => ({
        content: char === ' ' ? '\u00A0' : char,
        isSpace: char === ' ',
      }));
    }
    if (segmentBy === 'lines') {
      return text.split('\n').map((line) => ({
        content: line,
        isSpace: false,
      }));
    }
    // Default: words
    return text.split(' ').map((word) => ({
      content: word,
      isSpace: false,
    }));
  }, [text, segmentBy]);

  // Compute staggered delay ordering
  const total = segments.length;
  const getDelay = (index: number) => {
    if (reducedMotion) return 0;
    if (staggerDirection === 'reverse') {
      return (total - 1 - index) * delay;
    }
    if (staggerDirection === 'center') {
      const mid = (total - 1) / 2;
      return Math.abs(index - mid) * delay;
    }
    return index * delay;
  };

  // Determine transform offset by direction
  const getTransform = () => {
    if (direction === 'top') return 'translateY(-24px)';
    if (direction === 'bottom') return 'translateY(24px)';
    if (direction === 'left') return 'translateX(-24px)';
    if (direction === 'right') return 'translateX(24px)';
    return 'translateY(24px)';
  };

  // Trigger completion callback
  useEffect(() => {
    if (isVisible && onAnimationComplete) {
      const maxDelay = total * delay + duration;
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, maxDelay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, total, delay, duration, onAnimationComplete]);

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block ${className}`.trim()}
      style={style}
      aria-label={text}
    >
      {segments.map((segment, i) => {
        const itemDelay = getDelay(i);
        const transform = isVisible || reducedMotion ? 'none' : getTransform();
        const opacity = isVisible || reducedMotion ? 1 : 0;
        const blurFilter = blur && !isVisible && !reducedMotion ? 'blur(8px)' : 'blur(0px)';

        return (
          <span
            key={`${segment.content}-${i}`}
            className="inline-block whitespace-pre"
            style={{
              display: 'inline-block',
              transform,
              opacity,
              filter: blurFilter,
              transitionProperty: 'transform, opacity, filter',
              transitionDuration: `${duration}s`,
              transitionDelay: `${itemDelay}s`,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, opacity, filter',
            }}
            aria-hidden="true"
          >
            {segment.content}
            {segmentBy === 'words' && i < total - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </Component>
  );
}

export default StaggeredText;
