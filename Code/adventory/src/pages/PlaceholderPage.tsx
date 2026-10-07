import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { MEGA_MENUS, BRAND } from '../config/brand';
import { DemoModal } from '../components/modals/DemoModal';
import { Footer } from '../components/footer/Footer';

export function PlaceholderPage() {
  const location = useLocation();
  const [demoOpen, setDemoOpen] = useState(false);
  const { ref, inView } = useInView();

  // Find the matching menu item for this route
  let pageTitle = 'Platform Feature';
  let pageDescription = '';
  let pageCategory = 'Product';

  for (const menu of MEGA_MENUS) {
    for (const col of menu.columns) {
      for (const item of col.items) {
        if (item.href === location.pathname) {
          pageTitle = item.title;
          pageDescription = item.description;
          pageCategory = menu.label;
          break;
        }
      }
    }
  }

  return (
    <>
      <section ref={ref} className="relative pt-20 lg:pt-28 pb-20 lg:pb-24 min-h-[65vh] flex flex-col justify-center">
        <div className={`container-page relative z-1 page-enter reveal-line ${inView ? 'in' : ''}`}>
          <div className="max-w-3xl flex flex-col gap-6">
            {/* Eyebrow with brag pill */}
            <div className="flex items-center gap-3">
              <div className="brag-pill">
                <span className="brag-pill-dot" />
                <span>{BRAND.name} / {pageCategory}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--t-text-primary)]">
              {pageTitle}
            </h1>

            {/* Description */}
            <p className="text-xl text-[var(--t-text-secondary)] font-normal leading-relaxed" style={{ textWrap: 'pretty' }}>
              {pageDescription ||
                `Explore ${pageTitle} and see how Adventory replaces guesswork with autonomous advertising decisions.`}
            </p>

            <p className="text-base text-[var(--t-text-muted)] leading-relaxed max-w-2xl" style={{ textWrap: 'pretty' }}>
              Adventory continuously monitors cross-channel performance signals, isolating causal factors and executing high-confidence adjustments directly via platform APIs.
            </p>

            {/* CTAs using the Prescient pill system */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="btn-primary min-h-[48px] px-8 text-sm font-bold cursor-pointer flex items-center gap-2"
              >
                <span>Book a 1-on-1 demo</span>
                <span className="font-mono">→</span>
              </button>
              <Link
                to="/"
                className="btn-secondary min-h-[48px] px-8 text-sm font-medium cursor-pointer flex items-center justify-center"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
