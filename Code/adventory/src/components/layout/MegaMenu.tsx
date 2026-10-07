import { useEffect, useRef, useCallback } from 'react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Database, Search, Brain, Zap, Plug,
  TrendingUp, PackageX, Rocket,
  Megaphone, DollarSign, Settings,
  Flame, Globe, Layers, Building2,
  BookOpen, MessageSquare, ArrowRight,
} from 'lucide-react';
import type { MegaMenuData } from '../../config/brand';

interface MegaMenuProps {
  menu: MegaMenuData;
  align?: 'left' | 'center' | 'right';
  onClose: () => void;
}

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  LayoutDashboard, Database, Search, Brain, Zap, Plug,
  TrendingUp, PackageX, Rocket,
  Megaphone, DollarSign, Settings,
  Flame, Globe, Layers, Building2,
  BookOpen, MessageSquare,
};

function getIcon(name: string) {
  const IconComponent = ICON_MAP[name];
  return IconComponent ? <IconComponent className="w-4 h-4 text-[#d4d4d4] flex-shrink-0" /> : null;
}

export function MegaMenu({ menu, align = 'left', onClose }: MegaMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const focusIndex = useRef(-1);

  const allItems = menu.columns.flatMap((c) => c.items);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusIndex.current = Math.min(focusIndex.current + 1, allItems.length - 1);
      itemRefs.current[focusIndex.current]?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusIndex.current = Math.max(focusIndex.current - 1, 0);
      itemRefs.current[focusIndex.current]?.focus();
    }
  }, [onClose, allItems.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => document.addEventListener('click', handler), 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handler);
    };
  }, [onClose]);

  let itemCounter = 0;

  const alignmentClass =
    align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : align === 'right'
        ? 'right-0'
        : 'left-0';

  return (
    <div
      ref={ref}
      className={`absolute top-full pt-4 z-50 pointer-events-auto ${alignmentClass}`}
      style={{
        animation: 'prescient-menu-enter 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
      role="menu"
    >
      <style>{`
        @keyframes prescient-menu-enter {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Prescient Dropdown Panel with 2 columns + Featured teaser */}
      <div
        className="p-8 rounded-2xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)] shadow-[0_24px_60px_rgba(0,0,0,0.3)] flex gap-10"
        style={{
          backdropFilter: 'blur(28px)',
          minWidth: menu.columns.length > 1 ? '860px' : '420px',
        }}
      >
        {/* Navigation Columns */}
        <div className={`grid gap-10 flex-1 ${menu.columns.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {menu.columns.map((col) => (
            <div key={col.heading || 'default'}>
              {col.heading && (
                <p className="px-3 text-[11px] font-semibold tracking-wider uppercase text-[var(--t-text-muted)] font-mono mb-4">
                  {col.heading}
                </p>
              )}
              <div className="flex flex-col gap-2">
                {col.items.map((item) => {
                  const currentIdx = itemCounter++;
                  return (
                    <Link
                      key={item.href}
                      ref={(el) => { if (el) itemRefs.current[currentIdx] = el; }}
                      to={item.href}
                      onClick={onClose}
                      className="group flex items-start gap-4 p-4 rounded-xl transition-all hover:bg-[var(--t-icon-bg)] cursor-pointer"
                      role="menuitem"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[var(--t-icon-bg)] border border-[var(--t-border-subtle)] grid place-items-center flex-shrink-0 group-hover:border-[var(--t-border-default)] transition-colors">
                        {getIcon(item.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 font-semibold text-sm text-[var(--t-text-primary)] group-hover:text-[var(--t-accent-green)] transition-colors">
                          <span>{item.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--t-accent-green)]" />
                        </div>
                        <p className="text-xs text-[var(--t-text-muted)] line-clamp-2 mt-1 font-normal leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Prescient Featured Teaser Card (Right Column) */}
        {menu.columns.length > 1 && (
          <div className="w-[260px] rounded-xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-raised)] p-6 flex flex-col justify-between">
            <div>
              <span className="brag-pill text-[10px] py-0.5 px-2.5 mb-3 inline-block">
                Featured
              </span>
              <h4 className="text-[15px] font-semibold text-[var(--t-text-primary)] mb-2 leading-snug">
                The 2026 MMM Forecast Benchmark
              </h4>
              <p className="text-xs text-[var(--t-text-muted)] leading-relaxed">
                How top D2C growth teams reallocated \$140M in ad spend with 91% predictive accuracy.
              </p>
            </div>
            <Link
              to="/product/overview"
              onClick={onClose}
              className="mt-6 flex items-center justify-between text-xs font-semibold text-[var(--t-accent-green)] hover:underline pt-4 border-t border-[var(--t-border-subtle)]"
            >
              <span>Explore Benchmark</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
