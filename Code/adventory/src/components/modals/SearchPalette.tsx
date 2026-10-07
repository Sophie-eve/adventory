import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUp, ArrowDown, CornerDownLeft, X } from 'lucide-react';
import { getAllSearchableItems } from '../../config/brand';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function SearchPalette({ open, onClose }: SearchPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useFocusTrap(containerRef, open);

  const allItems = useMemo(() => getAllSearchableItems(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Prevent background scroll when opened
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleClose = useCallback(() => {
    setQuery('');
    setActiveIndex(0);
    onClose();
  }, [onClose]);

  const selectItem = useCallback(
    (href: string) => {
      navigate(href);
      handleClose();
    },
    [navigate, handleClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        selectItem(filtered[activeIndex].href);
      }
    },
    [filtered, activeIndex, handleClose, selectItem]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
      onClick={handleClose}
      style={{
        background: 'rgba(7, 8, 10, 0.82)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-xl rounded-xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-raised)] shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden"
        style={{ animation: 'palette-enter 0.18s ease forwards' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search pages and platform capabilities"
        onKeyDown={handleKeyDown}
      >
        <style>{`
          @keyframes palette-enter {
            from { opacity: 0; transform: scale(0.97) translateY(-6px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Search input header */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-[var(--t-border-subtle)]">
          <Search className="w-4 h-4 text-[var(--t-text-muted)] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search pages and features..."
            className="flex-1 bg-transparent text-[var(--t-text-primary)] text-sm outline-none placeholder:text-[var(--t-text-muted)]"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={
              filtered[activeIndex] ? `search-item-${activeIndex}` : undefined
            }
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)] p-1"
              aria-label="Clear query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[rgba(255,255,255,0.06)] border border-[var(--t-border-subtle)] text-[var(--t-text-muted)]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results: spacious card items with clear hierarchy */}
        <div
          id="search-results"
          role="listbox"
          className="max-h-[380px] overflow-y-auto p-3.5 flex flex-col gap-2.5"
        >
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[var(--t-text-muted)] text-sm">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item, i) => {
              const isSelected = i === activeIndex;
              return (
                <div
                  key={item.href}
                  id={`search-item-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  className={`p-4 rounded-xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-raised)] cursor-pointer flex flex-col gap-2 transition-all ${
                    isSelected ? 'border-[var(--t-border-strong)] bg-[var(--t-icon-bg)] shadow-sm' : 'hover:border-[var(--t-border-default)]'
                  }`}
                  onClick={() => selectItem(item.href)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--t-text-primary)]">
                      {item.title}
                    </p>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--t-accent-green)] bg-[rgba(61,220,151,0.08)] border border-[rgba(61,220,151,0.2)] px-2.5 py-0.5 rounded-full flex-shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--t-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center gap-4 px-4 h-10 border-t border-[var(--t-border-subtle)] text-[10px] font-mono text-[var(--t-text-muted)] bg-[var(--t-surface-overlay)]">
          <span className="flex items-center gap-1">
            <ArrowUp className="w-3 h-3" />
            <ArrowDown className="w-3 h-3" />
            navigate
          </span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" />
            select
          </span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
