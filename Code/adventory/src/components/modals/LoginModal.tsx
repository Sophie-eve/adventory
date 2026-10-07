import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { X, Eye, EyeOff, Lock, Mail, User, Loader2, CheckCircle2 } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { mockLogin } from '../../mocks/api';
import { BrandLogo } from '../layout/BrandLogo';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'apple' | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useFocusTrap(ref, open);

  const handleClose = useCallback(() => {
    setFeedback(null);
    setEmail('');
    setPassword('');
    setName('');
    setIsSignUp(false);
    onClose();
  }, [onClose]);

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
      if (e.key === 'Escape' && open) handleClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, handleClose]);

  if (!open) return null;

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setSocialLoading(provider);
    setFeedback(null);
    try {
      const result = await mockLogin(provider);
      if (result.success) {
        setFeedback(`Authenticated with ${provider === 'google' ? 'Google' : 'Apple'}.`);
        setTimeout(() => handleClose(), 900);
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) return;
    setLoading(true);
    setFeedback(null);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setFeedback(isSignUp ? 'Account created successfully!' : 'Signed in successfully.');
    setTimeout(() => handleClose(), 900);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setFeedback('Please enter your email above to receive a reset link.');
      return;
    }
    setFeedback(`Reset instructions sent to ${email}.`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
      style={{
        background: 'rgba(5, 5, 7, 0.88)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        ref={ref}
        className="relative w-full max-w-[420px] bg-[#0A0A0A] text-[#ededed] rounded-3xl p-7 sm:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-[#262626] overflow-hidden flex flex-col items-center"
        style={{ animation: 'prescient-modal 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <style>{`
          @keyframes prescient-modal {
            from { opacity: 0; transform: scale(0.96) translateY(6px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#262626] bg-[#141517] grid place-items-center text-[#888888] hover:text-white hover:border-[#404040] transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center mb-5 text-center">
          <div className="p-2 rounded-2xl bg-[#141517] border border-[#262626] shadow-sm mb-2.5">
            <BrandLogo size={36} showText={false} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Adventory<span className="text-[var(--t-accent-green)]">.AI</span>
          </span>
        </div>

        {/* Welcoming Heading */}
        <div className="text-center mb-6 w-full">
          <h2 id="login-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-xs sm:text-sm text-[#888888] font-normal">
            {isSignUp
              ? 'Start deploying autonomous advertising intelligence.'
              : 'Sign in to continue to your account.'}
          </p>
        </div>

        {/* Social Authentication Buttons */}
        <div className="flex flex-col gap-2.5 mb-5 w-full">
          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={loading || socialLoading !== null}
            className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-transparent hover:bg-[#141517] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-[#e0e0e0] cursor-pointer disabled:opacity-60"
          >
            {socialLoading === 'google' ? (
              <Loader2 className="w-4 h-4 animate-spin text-white flex-shrink-0" />
            ) : (
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          {/* Continue with Apple (perfectly matches Google alignment) */}
          <button
            type="button"
            onClick={() => handleSocialLogin('apple')}
            disabled={loading || socialLoading !== null}
            className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-transparent hover:bg-[#141517] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-[#e0e0e0] cursor-pointer disabled:opacity-60"
          >
            {socialLoading === 'apple' ? (
              <Loader2 className="w-4 h-4 animate-spin text-white flex-shrink-0" />
            ) : (
              <svg className="w-4 h-4 flex-shrink-0 fill-current text-white" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.24 16.7 4.89 10.55 8.8 10.3c1.15.06 1.95.67 2.63.7.99-.2 1.94-.78 3-.66 1.27.15 2.23.72 2.85 1.73-2.62 1.57-2 4.97.55 5.93-.67 1.68-1.52 3.33-2.78 4.28zM12.04 10.2c-.13-2.37 1.87-4.42 4.08-4.6.3 2.65-2.38 4.66-4.08 4.6z" />
              </svg>
            )}
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Divider with OR */}
        <div className="relative flex items-center justify-center my-4 w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#262626]" />
          </div>
          <span className="relative bg-[#0A0A0A] px-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#666666]">
            OR
          </span>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className="mb-4 p-2.5 rounded-xl bg-[rgba(61,220,151,0.08)] border border-[rgba(61,220,151,0.25)] text-[var(--t-accent-green)] text-xs font-medium flex items-center gap-2 w-full">
            <CheckCircle2 className="w-4 h-4 text-[var(--t-accent-green)] flex-shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1.5 text-left">
                FULL NAME
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full h-10 pl-12 pr-3.5 rounded-xl border border-[#262626] bg-[#141517] text-white text-sm placeholder:text-[#666666] focus:border-[#404040] outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1.5 text-left">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full h-10 pl-12 pr-3.5 rounded-xl border border-[#262626] bg-[#141517] text-white text-sm placeholder:text-[#666666] focus:border-[#404040] outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider text-left">
                PASSWORD
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-medium text-[#888888] hover:text-[#3ddc97] transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-10 pl-12 pr-10 rounded-xl border border-[#262626] bg-[#141517] text-white text-sm placeholder:text-[#666666] focus:border-[#404040] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-white transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || socialLoading !== null}
            className="w-full h-11 mt-1 rounded-xl bg-[#161618] hover:bg-[#1c1c20] border border-[#262626] border-t-[#38383e] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,0,0,0.6)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{isSignUp ? 'Creating account...' : 'Signing in...'}</span>
              </>
            ) : (
              <span>{isSignUp ? 'Create account' : 'Sign In'}</span>
            )}
          </button>
        </form>

        {/* Switch */}
        <div className="text-center mt-5 pt-4 border-t border-[#262626] text-xs text-[#888888] w-full">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setFeedback(null);
                }}
                className="font-semibold text-[#3ddc97] hover:underline transition-colors cursor-pointer"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setFeedback(null);
                }}
                className="font-semibold text-[#3ddc97] hover:underline transition-colors cursor-pointer"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
