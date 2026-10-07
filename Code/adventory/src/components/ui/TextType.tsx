import { useEffect, useState, useMemo } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface TextTypeProps {
  text: string | string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
}

/**
 * TextType Component
 * Renders a smooth typewriter effect across one or multiple strings,
 * respecting prefers-reduced-motion with customizable cursor and speeds.
 */
export function TextType({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  deletingSpeed = 30,
  showCursor = true,
  cursorCharacter = '|',
  loop = true,
  className = '',
  cursorClassName = '',
}: TextTypeProps) {
  const items = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const reducedMotion = usePrefersReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    if (items.length === 0) return;

    const currentWord = items[currentIndex] || '';

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentWord.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Word complete; pause before deleting
        if (items.length > 1 || loop) {
          const timer = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
          return () => clearTimeout(timer);
        }
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Word deleted; pause briefly before moving to next word
        const timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [
    items,
    currentIndex,
    displayText,
    isDeleting,
    typingSpeed,
    pauseDuration,
    deletingSpeed,
    loop,
    reducedMotion,
  ]);

  const displayedContent = reducedMotion ? (items[0] || '') : displayText;

  return (
    <span className={`inline-flex items-center ${className}`.trim()}>
      <span>{displayedContent}</span>
      {showCursor && !reducedMotion && (
        <span
          className={`inline-block ml-0.5 animate-pulse font-normal opacity-85 select-none ${cursorClassName}`.trim()}
          aria-hidden="true"
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}

export default TextType;
