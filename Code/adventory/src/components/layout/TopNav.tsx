import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { BRAND, MEGA_MENUS } from '../../config/brand';
import { MegaMenu } from './MegaMenu';

import { BrandLogo } from './BrandLogo';

interface TopNavProps {
  onSearchClick: () => void;
  onLoginClick: () => void;
  onDemoClick: () => void;
  onBurgerClick: () => void;
}

export function TopNav({
  onSearchClick,
  onLoginClick,
  onDemoClick,
  onBurgerClick,
}: TopNavProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMac = typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac');

  const handleMouseEnter = (index: number) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null);
    }, 140);
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-40 w-full">
      {/* Main Prescient AI Navigation Bar */}
      <header className="w-full border-b border-[var(--t-border-subtle)] bg-[var(--t-nav-bg)] backdrop-blur-xl transition-all">
        <div className="container-page h-[72px] lg:h-[84px] flex items-center justify-between gap-8">
          {/* Left: Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 group cursor-pointer"
            aria-label={`${BRAND.name} Home`}
          >
            <BrandLogo size={32} showText={true} />
          </Link>

          {/* Center: Mega Menu Triggers with Chevron (Spacious Navigation Row) */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {MEGA_MENUS.map((menu, i) => {
              const isOpen = activeMenu === i;
              return (
                <div
                  key={menu.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setActiveMenu(isOpen ? null : i)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-medium tracking-tight transition-all cursor-pointer ${
                      isOpen
                        ? 'text-[var(--t-text-primary)] bg-[var(--t-text-primary)]/[0.08]'
                        : 'text-[var(--t-text-secondary)] hover:text-[var(--t-text-primary)] hover:bg-[var(--t-text-primary)]/[0.04]'
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <span>{menu.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 opacity-60 ${
                        isOpen ? 'rotate-180 opacity-100 text-[var(--t-accent-green)]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <MegaMenu
                      menu={menu}
                      align={i === 0 ? 'left' : i === 1 ? 'center' : 'right'}
                      onClose={() => setActiveMenu(null)}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Search Icon + Log In + Book a Demo */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* Search Icon */}
            <button
              type="button"
              onClick={onSearchClick}
              className="w-9 h-9 rounded-full grid place-items-center text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)] hover:bg-[var(--t-text-primary)]/[0.04] transition-all cursor-pointer"
              aria-label="Search pages"
              title={`Search (${isMac ? '⌘' : 'Ctrl'} K)`}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Log in: clean minimal text link (Prescient AI style) */}
            <button
              type="button"
              onClick={onLoginClick}
              className="text-sm font-medium text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)] px-2 py-1.5 transition-colors cursor-pointer"
            >
              Log in
            </button>

            {/* Book a demo: Prescient AI White Pill Button */}
            <button
              type="button"
              onClick={onDemoClick}
              className="btn-primary"
            >
              Book a demo
            </button>
          </div>

          {/* Mobile controls (< lg) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={onSearchClick}
              className="w-9 h-9 rounded-full border border-[var(--t-border-subtle)] grid place-items-center cursor-pointer md:hidden text-[var(--t-text-secondary)] hover:text-[var(--t-text-primary)]"
              aria-label="Search pages"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onBurgerClick}
              className="w-9 h-9 rounded-full border border-[var(--t-border-subtle)] grid place-items-center cursor-pointer text-[var(--t-text-secondary)] hover:text-[var(--t-text-primary)]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
