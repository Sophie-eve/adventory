import { useInView } from '../../hooks/useInView';

const TESTIMONIALS = [
  {
    quote:
      'We went from spending two days correlating spreadsheets to getting actionable recommendations in under a minute. The engine caught a Meta CPM spike we would have missed for another week.',
    name: 'Sarah Chen',
    role: 'VP Growth, Verdant Skincare',
  },
  {
    quote:
      "The inventory-aware budgeting alone saved us from promoting three SKUs that were about to go out of stock. That's real money we would have wasted on clicks that couldn't convert.",
    name: 'Marcus Williams',
    role: 'Head of D2C, Luminos Health',
  },
  {
    quote:
      "What convinced our CFO was seeing predicted vs actual ROAS converge within 5% after just 21 days. The engine doesn't just recommend — it proves its own accuracy.",
    name: 'Priya Patel',
    role: 'CMO, Peakform Athletics',
  },
];

export function Testimonials() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative section-spacing-lg">
      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="brag-pill mb-5">
            <span className="brag-pill-dot" />
            <span>Customer Validation</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--t-text-primary)] max-w-[700px] mx-auto mb-5 reveal-line ${inView ? 'in' : ''}`}>
            Trusted by the fastest-growing modern brands
          </h2>
          <p className="text-base sm:text-lg text-[var(--t-text-secondary)] max-w-[700px] mx-auto font-normal leading-relaxed lg:leading-[1.7]">
            See how growth executives and media buyers turn multi-channel uncertainty into high-conviction ad investments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => {
            const initials = t.name
              .split(' ')
              .map((n) => n[0])
              .join('');
            return (
              <div
                key={t.name}
                className={`p-card flex flex-col justify-between gap-10 reveal-line hover:border-[var(--t-border-default)] transition-all ${
                  inView ? 'in' : ''
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[var(--t-accent-green)] mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote
                    className="text-base lg:text-[17px] text-[var(--t-text-primary)] leading-[1.7] font-normal"
                    style={{ textWrap: 'pretty' }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-[var(--t-border-subtle)]">
                  <div className="w-11 h-11 rounded-full bg-[var(--t-icon-bg)] border border-[var(--t-border-subtle)] flex items-center justify-center font-mono text-xs font-semibold text-[var(--t-text-primary)]">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--t-text-primary)]">{t.name}</p>
                    <p className="text-xs text-[var(--t-text-muted)] mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
