import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // Default to dark if no preference, or respect system preference if light is preferred
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed z-50 flex items-center justify-between gap-1 p-1 rounded-full bg-[var(--t-surface-raised)] border border-[var(--t-border-subtle)] shadow-lg backdrop-blur-md transition-colors hover:border-[var(--t-border-default)] cursor-pointer"
      style={{
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        left: 'max(1.5rem, env(safe-area-inset-left))'
      }}
      aria-label="Toggle theme"
    >
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
          theme === 'light'
            ? 'bg-[var(--t-accent-solid)] text-[var(--t-accent-text)]'
            : 'text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)]'
        }`}
      >
        <Sun className="w-4 h-4" />
      </div>
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
          theme === 'dark'
            ? 'bg-[var(--t-accent-solid)] text-[var(--t-accent-text)]'
            : 'text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)]'
        }`}
      >
        <Moon className="w-4 h-4" />
      </div>
    </button>
  );
}
