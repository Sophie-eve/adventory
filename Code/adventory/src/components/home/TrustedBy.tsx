import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import TiltedCard from '../ui/TiltedCard';

/**
 * Configuration array for the 18 partner brands.
 * Each entry specifies brand name, brand-specific accent color, case study availability, case study URL, and SVG icon/wordmark.
 */
export interface PartnerBrand {
  id: number;
  name: string;
  brandColor: string;
  hasCaseStudy: boolean;
  caseStudyUrl?: string;
  renderLogo: (colorClass?: string) => ReactNode;
}

const PARTNER_BRANDS: PartnerBrand[] = [
  // Row 1
  {
    id: 1,
    name: 'VERDANT',
    brandColor: '#3ddc97',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <text x="50%" y="27" textAnchor="middle" fontSize="22" fontFamily="Inter, sans-serif" fontWeight="800" letterSpacing="0.1em">
          VERDANT
        </text>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'AURA FLORA',
    brandColor: '#f472b6',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 200 40" overflow="visible" className={`w-[80%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <text x="50%" y="27" textAnchor="middle" fontSize="20" fontFamily="Georgia, serif" fontWeight="400" letterSpacing="0.2em">
          AURA FLORA
        </text>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'KINETIC',
    brandColor: '#60a5fa',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <rect x="15" y="8" width="130" height="24" rx="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="50%" y="25" textAnchor="middle" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="0.25em">
          KINETIC
        </text>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'EQUINOX LABS',
    brandColor: '#a78bfa',
    hasCaseStudy: false,
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <circle cx="28" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="28" cy="20" r="4" fill="currentColor" />
        <text x="50" y="26" fontSize="17" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="0.08em">
          EQUINOX
        </text>
      </svg>
    ),
  },
  {
    id: 5,
    name: 'LUMINOS',
    brandColor: '#fbbf24',
    hasCaseStudy: false,
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <text x="50%" y="27" textAnchor="middle" fontSize="22" fontFamily="Inter, sans-serif" fontWeight="900" letterSpacing="-0.03em">
          luminos.
        </text>
      </svg>
    ),
  },
  {
    id: 6,
    name: 'ORBITAL STUDIO',
    brandColor: '#38bdf8',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 80 80" overflow="visible" className={`w-11 h-11 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="50%" y="36" textAnchor="middle" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="800" letterSpacing="0.1em">
          ORBITAL
        </text>
        <text x="50%" y="49" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.2em">
          STUDIO
        </text>
      </svg>
    ),
  },

  // Row 2
  {
    id: 7,
    name: 'SOLVEX',
    brandColor: '#f97316',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <path d="M22 12 L30 20 L22 28 M34 12 L42 20 L34 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="54" y="26" fontSize="19" fontFamily="Inter, sans-serif" fontWeight="800" letterSpacing="0.05em">
          SOLVEX
        </text>
      </svg>
    ),
  },
  {
    id: 8,
    name: 'VALKYRIE',
    brandColor: '#e879f9',
    hasCaseStudy: false,
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <text x="50%" y="28" textAnchor="middle" fontSize="20" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="600" letterSpacing="0.15em">
          Valkyrie
        </text>
      </svg>
    ),
  },
  {
    id: 9,
    name: 'CRESCENDO',
    brandColor: '#2dd4bf',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 180 40" overflow="visible" className={`w-[75%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <text x="50%" y="26" textAnchor="middle" fontSize="17" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.32em">
          CRESCENDO
        </text>
      </svg>
    ),
  },
  {
    id: 10,
    name: 'NOVUS HEALTH',
    brandColor: '#ef4444',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <path d="M26 20 H38 M32 14 V26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <text x="50" y="27" fontSize="18" fontFamily="Inter, sans-serif" fontWeight="800" letterSpacing="0.05em">
          NOVUS
        </text>
      </svg>
    ),
  },
  {
    id: 11,
    name: 'MERIDIAN',
    brandColor: '#818cf8',
    hasCaseStudy: false,
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <text x="50%" y="27" textAnchor="middle" fontSize="19" fontFamily="Inter, sans-serif" fontWeight="300" letterSpacing="0.25em">
          MERIDIAN
        </text>
      </svg>
    ),
  },
  {
    id: 12,
    name: 'HYPERION',
    brandColor: '#eab308',
    hasCaseStudy: false,
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <polygon points="18,28 30,12 42,28" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <text x="52" y="26" fontSize="18" fontFamily="Inter, sans-serif" fontWeight="800" letterSpacing="0.06em">
          HYPERION
        </text>
      </svg>
    ),
  },

  // Row 3
  {
    id: 13,
    name: 'STRATA CO',
    brandColor: '#4ade80',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <text x="50%" y="27" textAnchor="middle" fontSize="21" fontFamily="Inter, sans-serif" fontWeight="900" letterSpacing="0.12em">
          STRATA
        </text>
      </svg>
    ),
  },
  {
    id: 14,
    name: 'PEAKFORM',
    brandColor: '#06b6d4',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <text x="50%" y="27" textAnchor="middle" fontSize="20" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="-0.02em">
          PEAKFORM
        </text>
      </svg>
    ),
  },
  {
    id: 15,
    name: 'ZEPHYR APPAREL',
    brandColor: '#f43f5e',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <rect x="18" y="10" width="124" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="50%" y="25" textAnchor="middle" fontSize="12" fontFamily="Georgia, serif" letterSpacing="0.28em">
          ZEPHYR
        </text>
      </svg>
    ),
  },
  {
    id: 16,
    name: 'NEXUS D2C',
    brandColor: '#6366f1',
    hasCaseStudy: true,
    caseStudyUrl: '/customers/stories',
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <circle cx="28" cy="20" r="7" fill="currentColor" />
        <circle cx="44" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="58" y="27" fontSize="19" fontFamily="Inter, sans-serif" fontWeight="800" letterSpacing="0.04em">
          NEXUS
        </text>
      </svg>
    ),
  },
  {
    id: 17,
    name: 'ALTITUDE',
    brandColor: '#14b8a6',
    hasCaseStudy: false,
    renderLogo: (color = '') => (
      <svg viewBox="0 0 180 40" overflow="visible" className={`w-[75%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <text x="50%" y="28" textAnchor="middle" fontSize="19" fontFamily="Inter, sans-serif" fontWeight="400" letterSpacing="0.3em">
          ALTITUDE
        </text>
      </svg>
    ),
  },
  {
    id: 18,
    name: 'CHRONOS',
    brandColor: '#fb923c',
    hasCaseStudy: false,
    renderLogo: (color = '') => (
      <svg viewBox="0 0 160 40" overflow="visible" className={`w-[70%] max-h-10 overflow-visible transition-colors duration-300 ${color}`} fill="currentColor" aria-hidden="true">
        <circle cx="28" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="28" y1="20" x2="28" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="20" x2="33" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <text x="46" y="26" fontSize="17" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="0.1em">
          CHRONOS
        </text>
      </svg>
    ),
  },
];

export function TrustedBy() {
  return (
    <section
      className="w-full py-16 lg:py-24 relative overflow-visible flex flex-col items-center justify-center"
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
      aria-label="Partners and Advertisers"
    >
      {/* Floating Background Infinite Marquee for "POWERING HALO EFFECTS FOR LEADING ADVERTISERS" */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none -z-10 select-none"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee">
          <span className="text-[8vw] font-black opacity-5 whitespace-nowrap tracking-widest text-white uppercase px-12">
            POWERING HALO EFFECTS FOR LEADING ADVERTISERS &bull;
          </span>
          <span className="text-[8vw] font-black opacity-5 whitespace-nowrap tracking-widest text-white uppercase px-12">
            POWERING HALO EFFECTS FOR LEADING ADVERTISERS &bull;
          </span>
        </div>
        <div className="flex w-max animate-marquee" aria-hidden="true">
          <span className="text-[8vw] font-black opacity-5 whitespace-nowrap tracking-widest text-white uppercase px-12">
            POWERING HALO EFFECTS FOR LEADING ADVERTISERS &bull;
          </span>
          <span className="text-[8vw] font-black opacity-5 whitespace-nowrap tracking-widest text-white uppercase px-12">
            POWERING HALO EFFECTS FOR LEADING ADVERTISERS &bull;
          </span>
        </div>
      </div>

      <div className="w-full max-w-[1120px] mx-auto px-4 relative z-1 flex flex-col items-center justify-center">
        {/* 6x3 Grid with gaps and interactive TiltedCard 3D hover effects - centered and unclipped */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full place-items-center justify-center items-center"
          role="list"
        >
          {PARTNER_BRANDS.map((brand) => {
            const cardContent = (
              <TiltedCard
                key={brand.id}
                scaleOnHover={1.08}
                rotateAmplitude={12}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                showMobileWarning={false}
                showTooltip={false}
                className="w-full h-full"
              >
                <div
                  className="group relative w-full h-full aspect-square rounded-2xl border border-[#262628] hover:border-[#3e3f46] bg-[#141517] flex items-center justify-center p-4 cursor-pointer select-none transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                  style={{
                    '--brand-color': brand.brandColor,
                    '--brand-glow': `${brand.brandColor}66`,
                  } as React.CSSProperties}
                >
                  {/* Background radial glow on group-hover */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${brand.brandColor}24 0%, transparent 72%)`,
                    }}
                  />

                  {/* Case Study Badge */}
                  {brand.hasCaseStudy && (
                    <span
                      className="absolute top-2.5 right-2.5 text-[10px] font-medium leading-none px-2 py-0.5 rounded-full border border-[#404044] text-[#8e8e93] bg-transparent transition-all duration-300 group-hover:border-[var(--brand-color)] group-hover:text-[var(--brand-color)] group-hover:bg-[var(--brand-color)]/10"
                      style={{
                        transform: 'translateZ(18px)',
                      }}
                    >
                      Case study
                    </span>
                  )}

                  {/* SVG Logo: transitions from muted gray to brandColor with drop-shadow on hover */}
                  <div
                    className="w-full h-full flex items-center justify-center transition-all duration-300 text-[#555861] group-hover:text-[var(--brand-color)] group-hover:[filter:drop-shadow(0_0_14px_var(--brand-glow))]"
                    style={{
                      transform: 'translateZ(12px)',
                    }}
                  >
                    {brand.renderLogo()}
                  </div>
                </div>
              </TiltedCard>
            );

            if (brand.hasCaseStudy && brand.caseStudyUrl) {
              return (
                <Link
                  key={brand.id}
                  to={brand.caseStudyUrl}
                  className="relative block aspect-square w-full h-full hover:z-30 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6CDBE]"
                  aria-label={`Read ${brand.name} case study`}
                  role="listitem"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={brand.id}
                className="relative aspect-square w-full h-full hover:z-30 transition-all"
                role="listitem"
                aria-label={brand.name}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;
