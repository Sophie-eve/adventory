import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { MobileDrawer } from './MobileDrawer';
import { SearchPalette } from '../modals/SearchPalette';
import { LoginModal } from '../modals/LoginModal';
import { DemoModal } from '../modals/DemoModal';
import { ThemeToggle } from '../ThemeToggle';
import { useKeyboard } from '../../hooks/useKeyboard';
import { MicroSlats } from '../ui/MicroSlats';

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Global Cmd/Ctrl + K shortcut to open search palette
  useKeyboard('k', () => setSearchOpen(true), true);

  return (
    <div className="min-h-screen bg-[var(--t-surface-base)] flex flex-col relative text-[var(--t-text-primary)]">
      {/* Full-Website Interactive MicroSlats Ground Field */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <MicroSlats
          preset="swell"
          color="#1e1922"
          glintColor="#ffffff"
          backgroundColor="#000000"
          slatWidth={10}
          slatHeight={27}
          gap={6}
          roundness={0.65}
          interactive
          cursorStrength={1}
          cursorSize={40}
          swirl={0}
          trail={1.4}
          lean={0}
          intro
          speed={0.35}
          stretch={0.2}
          glint={1.05}
          contrast={1.35}
          paused
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        />
        {/* Soft atmospheric gradient to ground the canvas smoothly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 25%, transparent 35%, rgba(7, 8, 10, 0.55) 85%)',
          }}
        />
      </div>
      {/* Single full-width sticky header replacing sidebar + pill */}
      <TopNav
        onSearchClick={() => setSearchOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
        onDemoClick={() => setDemoOpen(true)}
        onBurgerClick={() => setDrawerOpen(true)}
      />

      {/* Main full-width content area (no 260px margin/offset) */}
      <main className="flex-1 w-full relative z-1 page-enter">
        <Outlet />
      </main>

      {/* Global Modals & Overlays */}
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onDemoClick={() => { setDrawerOpen(false); setDemoOpen(true); }}
        onLoginClick={() => { setDrawerOpen(false); setLoginOpen(true); }}
        onSearchClick={() => setSearchOpen(true)}
      />
      <ThemeToggle />
    </div>
  );
}
