import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import { BRAND, FOOTER_LINKS } from '../../config/brand';
import { submitNewsletter } from '../../mocks/api';
import SplitText from '../ui/SplitText';
import TechText from '../ui/TechText';

const CURRENT_YEAR = 2026;

export function Footer() {
  const { ref } = useInView();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError('');
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setSubmitting(true);
    await submitNewsletter({ email: email.trim() });
    setSubmitting(false);
    setSubscribed(true);
  };

  return (
    <div className="container-page pb-12">
      <footer
        ref={ref}
        className="relative mt-28 lg:mt-36 w-full rounded-2xl border border-[var(--t-border-default)] overflow-hidden bg-[var(--t-surface-raised)]"
      >
        {/* Subtle animated gradient backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 15% 85%, rgba(61,220,151,0.08) 0%, transparent 45%),
                radial-gradient(ellipse at 85% 15%, rgba(90,169,255,0.05) 0%, transparent 45%),
                linear-gradient(180deg, rgba(13,15,18,0.7), rgba(7,8,10,0.95))
              `,
            }}
          />
          {/* Clean faint grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(230,230,230,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(230,230,230,0.02) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-1 w-full px-6 lg:px-16 py-16 lg:py-20 flex flex-col gap-12">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-[var(--t-border-subtle)]">
          <div className="max-w-xl">
            <div className="brag-pill mb-3">
              <span className="brag-pill-dot" />
              <span>Adventory Intelligence Dispatch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--t-text-primary)] mb-2">
              Autonomous ad intelligence in your inbox
            </h3>
            <p className="text-sm lg:text-[15px] text-[var(--t-text-secondary)] leading-relaxed">
              Join growth executives moving from delayed attribution to real-time, margin-safe budget optimization. Zero fluff.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            {subscribed ? (
              <div className="p-3.5 rounded-full border border-[var(--t-accent-green)]/30 bg-[var(--t-accent-green)]/10 text-[var(--t-accent-green)] text-xs font-semibold flex items-center justify-center gap-2">
                <span>✓</span> Subscribed! Welcome to the feedback loop.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter your work email"
                  className={`flex-1 min-h-[46px] px-5 rounded-full bg-[var(--t-surface-overlay)] border text-sm text-[var(--t-text-primary)] outline-none transition-colors placeholder:text-[var(--t-text-faint)] focus:border-[var(--t-border-strong)] ${
                    emailError ? 'border-red-500' : 'border-[var(--t-border-subtle)]'
                  }`}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary min-h-[46px] px-7 whitespace-nowrap text-xs font-bold cursor-pointer"
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            {emailError && <p className="text-xs text-red-500 mt-2 px-3">{emailError}</p>}
          </div>
        </div>

        {/* Footer Navigation: Bordered chip links wrapping in tidy grids (Requirement 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Product links */}
          <div className="flex flex-col gap-3">
            <p className="f-mono-label text-[var(--t-text-primary)]">Product</p>
            <div className="flex flex-wrap gap-2">
              {FOOTER_LINKS.product.map((link) => (
                <Link key={link.href} to={link.href} className="link-box--chip">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Solutions links */}
          <div className="flex flex-col gap-3">
            <p className="f-mono-label text-[var(--t-text-primary)]">Solutions</p>
            <div className="flex flex-wrap gap-2">
              {FOOTER_LINKS.solutions.map((link) => (
                <Link key={link.href} to={link.href} className="link-box--chip">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="flex flex-col gap-3">
            <p className="f-mono-label text-[var(--t-text-primary)]">Company</p>
            <div className="flex flex-wrap gap-2">
              {FOOTER_LINKS.company.map((link) => (
                <Link key={link.href} to={link.href} className="link-box--chip">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="f-mono-label text-[var(--t-text-primary)]">Direct Contact</p>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${BRAND.email}`} className="link-box--chip justify-start w-fit">
                {BRAND.email}
              </a>
              <span className="text-xs text-[var(--t-text-muted)] mt-1">
                San Francisco, CA &amp; Remote
              </span>
            </div>
          </div>
        </div>

        {/* Interactive React Bits TechText & SplitText Wordmark for Adventory AI */}
        <div className="pt-10 pb-4 border-t border-[var(--t-border-subtle)] flex flex-col items-center">
          <SplitText
            text="Autonomous Decision Engine"
            className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--t-accent-green)] text-center mb-3"
            delay={35}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            textAlign="center"
          />
          <div className="w-full max-w-4xl h-[120px] sm:h-[150px] relative">
            <TechText
              text="Adventory AI"
              fontWeight={700}
              fontSize={140}
              letterSpacing={-0.04}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={16}
              color="#fafafa"
              accentColor="#3ddc97"
              draggable={true}
              sweep={true}
              speed={1}
            />
          </div>
        </div>

        {/* Bottom Metadata & Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--t-border-subtle)] text-xs text-[var(--t-text-muted)]">
          <p>© {CURRENT_YEAR} {BRAND.name}. All rights reserved.</p>

          <div className="flex items-center gap-2">
            {/* Twitter/X */}
            <a
              href="#"
              className="link-box w-8 h-8 grid place-items-center text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)]"
              aria-label="X / Twitter"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="link-box w-8 h-8 grid place-items-center text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)]"
              aria-label="LinkedIn"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="#"
              className="link-box w-8 h-8 grid place-items-center text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)]"
              aria-label="GitHub"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
}
