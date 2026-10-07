import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Search, ChevronRight } from 'lucide-react';
import { BRAND, MEGA_MENUS } from '../../config/brand';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { BrandLogo } from './BrandLogo';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  onDemoClick: () => void;
  onLoginClick: () => void;
  onSearchClick: () => void;
}

export function MobileDrawer({
  open,
  onClose,
  onDemoClick,
  onLoginClick,
  onSearchClick,
}: MobileDrawerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open);

  const isMac = typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac');

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{
        background: 'rgba(7, 8, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        animation: 'drawer-fade 0.2s ease forwards',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <style>{`
        @keyframes drawer-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Drawer content */}
      <div
        ref={ref}
        className="w-full max-w-md h-full bg-[var(--t-surface-raised)] border-l border-[var(--t-border-subtle)] flex flex-col p-6 overflow-y-auto"
      >
        {/* Top bar: Brand + Close */}
        <div className="flex items-center justify-between pb-5 border-b border-[var(--t-border-subtle)]">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <BrandLogo size={28} showText={true} />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="link-box w-9 h-9 grid place-items-center"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4 text-[var(--t-text-primary)]" />
          </button>
        </div>

        {/* Top search entry (Requirement 1) */}
        <div className="py-5 border-b border-[var(--t-border-subtle)]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSearchClick();
            }}
            className="link-box w-full h-11 px-3.5 flex items-center justify-between text-xs text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)] cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 opacity-70" />
              <span>Search pages...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[rgba(255,255,255,0.06)] border border-[var(--t-border-subtle)] text-[var(--t-text-muted)]">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
        </div>

        {/* Navigation Categories with bounded row cards */}
        <nav className="flex-1 py-6 flex flex-col gap-6" aria-label="Mobile Menu Links">
          {/* Home Link Box */}
          <Link
            to="/"
            onClick={onClose}
            className="link-box w-full h-11 px-4 flex items-center justify-between text-sm font-semibold text-[var(--t-text-primary)] hover:text-[var(--t-accent-green)]"
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4 text-[var(--t-text-muted)]" />
          </Link>

          {MEGA_MENUS.map((menu) => (
            <div key={menu.label} className="flex flex-col gap-2">
              <p className="f-mono-label text-[var(--t-text-muted)] px-1">{menu.label}</p>
              <div className="flex flex-col gap-1.5">
                {menu.columns.map((col) =>
                  col.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onClose}
                      className="link-box w-full p-3 flex items-center justify-between gap-3 text-left hover:border-[var(--accent-border)] transition-colors group"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--t-text-primary)] group-hover:text-[var(--t-accent-green)] truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--t-text-muted)] line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[var(--t-text-muted)] group-hover:text-[var(--t-accent-green)] flex-shrink-0 transition-colors" />
                    </Link>
                  ))
                )}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Actions: Log in + Book a demo */}
        <div className="pt-6 border-t border-[var(--t-border-subtle)] flex flex-col gap-3">
          <button
            type="button"
            onClick={onDemoClick}
            className="btn-primary w-full h-11 text-sm font-bold cursor-pointer"
          >
            Book a demo
          </button>
          <button
            type="button"
            onClick={onLoginClick}
            className="btn-secondary w-full h-11 text-sm font-semibold cursor-pointer"
          >
            Log in
          </button>
          <p className="text-[11px] font-mono text-[var(--t-text-muted)] text-center mt-2">
            {BRAND.email}
          </p>
        </div>
      </div>
    </div>
  );
}
