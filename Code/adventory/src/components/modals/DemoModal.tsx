import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { X, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { submitDemoForm } from '../../mocks/api';

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  website?: string;
  accountType?: string;
  spend?: string;
  source?: string;
}

export function DemoModal({ open, onClose }: DemoModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [accountType, setAccountType] = useState('');
  const [spend, setSpend] = useState('');
  const [source, setSource] = useState('');
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useFocusTrap(ref, open);

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
    setSuccess(false);
    setErrors({});
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) handleClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, handleClose]);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!firstName.trim()) errs.firstName = 'Required';
    if (!lastName.trim()) errs.lastName = 'Required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email required';
    
    let url = website.trim();
    if (!url) {
      errs.website = 'Required';
    } else {
      if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;
      try {
        new URL(url);
      } catch {
        errs.website = 'Invalid URL';
      }
    }
    if (!accountType) errs.accountType = 'Required';
    if (!spend) errs.spend = 'Required';
    if (!source) errs.source = 'Required';
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    let url = website.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;

    setSubmitting(true);
    await submitDemoForm({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      website: url,
      accountType,
      spend,
      source
    });
    setSubmitting(false);
    setSuccess(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={handleClose}
      style={{
        background: 'rgba(5, 5, 7, 0.88)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        ref={ref}
        className="relative w-full max-w-3xl rounded-3xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)] shadow-[0_30px_90px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{ animation: 'prescient-modal 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
      >
        <style>{`
          @keyframes prescient-modal {
            from { opacity: 0; transform: scale(0.96) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[var(--t-border-subtle)] bg-[var(--t-icon-bg)] grid place-items-center text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)] hover:border-[var(--t-border-default)] transition-all cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid md:grid-cols-5 h-full">
          {/* Left / Main: The Form */}
          <div className="md:col-span-3 p-7 sm:p-10 lg:p-12">
            <span className="brag-pill text-xs py-1 px-3 mb-4">
              ✦ Live 1-on-1 Walkthrough
            </span>

            <h2 id="demo-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--t-text-primary)] mb-3">
              See Adventory in action
            </h2>
            <p className="text-sm text-[var(--t-text-muted)] mb-8 leading-relaxed">
              Tell us about your marketing channels. We&apos;ll show you how autonomous decisioning eliminates dashboard guesswork.
            </p>

            {success ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[rgba(61,220,151,0.12)] border border-[rgba(61,220,151,0.3)] grid place-items-center mb-5">
                  <CheckCircle2 className="w-7 h-7 text-[var(--t-accent-green)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--t-text-primary)] mb-2">
                  Thanks! We&apos;ll be in touch shortly.
                </h3>
                <p className="text-sm text-[var(--t-text-muted)] max-w-xs mb-8">
                  Our growth engineering team is preparing a customized multi-channel simulation for your brand.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-primary text-sm px-8 py-3"
                >
                  Return to site
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--t-text-muted)] mb-2 uppercase tracking-wider">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`input-field ${errors.firstName ? '!border-red-500' : ''}`}
                      placeholder="Sarah"
                    />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1.5">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--t-text-muted)] mb-2 uppercase tracking-wider">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`input-field ${errors.lastName ? '!border-red-500' : ''}`}
                      placeholder="Chen"
                    />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1.5">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--t-text-muted)] mb-2 uppercase tracking-wider">
                      Company Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`input-field ${errors.email ? '!border-red-500' : ''}`}
                      placeholder="sarah@yourbrand.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--t-text-muted)] mb-2 uppercase tracking-wider">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className={`input-field ${errors.website ? '!border-red-500' : ''}`}
                      placeholder="yourbrand.com"
                    />
                    {errors.website && <p className="text-xs text-red-500 mt-1.5">{errors.website}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--t-text-muted)] mb-2 uppercase tracking-wider">
                    Annual Media Spend *
                  </label>
                  <select
                    value={spend}
                    onChange={(e) => setSpend(e.target.value)}
                    className={`input-field cursor-pointer ${errors.spend ? '!border-red-500' : ''}`}
                  >
                    <option value="" disabled className="text-[var(--t-text-faint)]">Select annual spend...</option>
                    <option value="under_1m">&lt; $1M</option>
                    <option value="1m_5m">$1M - $5M</option>
                    <option value="5m_25m">$5M - $25M</option>
                    <option value="over_25m">$25M+</option>
                  </select>
                  {errors.spend && <p className="text-xs text-red-500 mt-1.5">{errors.spend}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--t-text-muted)] mb-2 uppercase tracking-wider">
                      Business Type *
                    </label>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className={`input-field cursor-pointer ${errors.accountType ? '!border-red-500' : ''}`}
                    >
                      <option value="" disabled className="text-[var(--t-text-faint)]">Select type...</option>
                      <option value="brand">D2C Brand</option>
                      <option value="agency">Growth Agency</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.accountType && <p className="text-xs text-red-500 mt-1.5">{errors.accountType}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--t-text-muted)] mb-2 uppercase tracking-wider">
                      How did you hear about us? *
                    </label>
                    <select
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className={`input-field cursor-pointer ${errors.source ? '!border-red-500' : ''}`}
                    >
                      <option value="" disabled className="text-[var(--t-text-faint)]">Select source...</option>
                      <option value="search">Search</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Referral / Colleague</option>
                      <option value="event">Event / Conference</option>
                    </select>
                    {errors.source && <p className="text-xs text-red-500 mt-1.5">{errors.source}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full min-h-[48px] mt-3 text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting request...
                    </>
                  ) : (
                    'Book a demo'
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--t-text-faint)] mt-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--t-accent-green)]" />
                  <span>No commitment required. We never share your data.</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Prescient-style Social Proof & Highlights */}
          <div className="hidden md:flex md:col-span-2 p-8 sm:p-10 bg-[var(--t-surface-raised)] border-l border-[var(--t-border-subtle)] flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--t-accent-green)] mb-4">
                CUSTOMER VERIFIED
              </p>
              <blockquote className="text-sm text-[var(--t-text-secondary)] leading-relaxed italic mb-6">
                &ldquo;We use Adventory as THE single source of truth for cross-channel ad spend. We saved \$38,000 on low-stock items in the first 30 days.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--t-icon-bg)] border border-[var(--t-border-subtle)] grid place-items-center font-bold text-xs text-[var(--t-text-primary)]">
                  S
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--t-text-primary)]">Sarah Chen</p>
                  <p className="text-xs text-[var(--t-text-muted)]">VP Growth, Verdant</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[var(--t-border-subtle)] flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--t-text-muted)]">Average ROAS lift</span>
                <span className="font-mono font-bold text-[var(--t-accent-green)]">+42%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--t-text-muted)]">Diagnosis speed</span>
                <span className="font-mono font-bold text-[var(--t-text-primary)]">3.2x faster</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--t-text-muted)]">Model confidence</span>
                <span className="font-mono font-bold text-[var(--t-accent-green)]">91%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
