import { BRAND } from '../../config/brand';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * BrandLogo intelligently renders the ideal logo asset based on the current theme:
 * - Dark Mode: Transparent background icon (white "A" + orange upward trendline)
 *   that floats seamlessly over the dark surface without any container border.
 * - Light Mode: Sleek dark squircle badge container (white "A" + orange arrow)
 *   providing strong contrast, sharp definition, and an app-icon feel on light surfaces.
 */
export function BrandLogo({ className = '', size = 32, showText = true }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 flex-shrink-0 ${className}`}>
      <div
        className="relative flex items-center justify-center flex-shrink-0 select-none"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* Dark Mode Logo: Transparent background with white A & orange arrow */}
        <img
          src="/logo-dark.png"
          alt={`${BRAND.name} Logo`}
          width={size}
          height={size}
          className="logo-dark-mode w-full h-full object-contain pointer-events-none transition-transform duration-200 group-hover:scale-105"
        />

        {/* Light Mode Logo: Dark squircle badge for crisp contrast against light backgrounds */}
        <img
          src="/logo-light.png"
          alt={`${BRAND.name} Logo`}
          width={size}
          height={size}
          className="logo-light-mode w-full h-full object-contain rounded-[22%] shadow-sm border border-black/5 pointer-events-none transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {showText && (
        <span className="tracking-tight text-[var(--t-text-primary)] font-bold text-xl leading-none">
          {BRAND.name}
        </span>
      )}
    </div>
  );
}
