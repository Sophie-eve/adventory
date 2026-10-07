import { useState, useEffect, useRef, useCallback } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInView } from '../../hooks/useInView';

const STAGES = ['Ingest', 'Diagnose', 'Decide', 'Execute', 'Learn'] as const;

const CHANNELS = [
  { name: 'Total Spend', value: '$4,200,000', color: '#ffffff' },
  { name: 'Meta Ads', value: '$1,360,000', color: '#1F77B4' },
  { name: 'Google Ads', value: '$1,152,000', color: '#2CA02C' },
  { name: 'TikTok Ads', value: '$625,000', color: '#EE1D52' },
  { name: 'Amazon Ads', value: '$431,000', color: '#FF7F0E' },
];

export function HeroLoop() {
  const reduced = usePrefersReducedMotion();
  const { ref: containerRef, inView } = useInView<HTMLDivElement>();
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeChannel, setActiveChannel] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-cycle stages
  useEffect(() => {
    if (reduced || paused || !inView) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 3200);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduced, paused, inView]);

  const handleStageSelect = useCallback((i: number) => {
    setStage(i);
    setPaused(true);
  }, []);

  const chartPoints = [42, 45, 41, 48, 52, 49, 53, 56, 54, 59, 56, 43, 34, 30, 33, 40, 44, 50, 54, 58];
  const anomalyIndex = 13;

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-[var(--t-border-subtle)] bg-[#0f0f10] shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden text-left"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top Prescient Channel Summary Tabs - Spacious Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-[var(--t-border-subtle)] bg-[rgba(255,255,255,0.015)]">
        {CHANNELS.map((ch, idx) => {
          const isActive = activeChannel === idx;
          return (
            <button
              key={ch.name}
              type="button"
              onClick={() => setActiveChannel(idx)}
              className={`p-6 sm:p-7 lg:p-[32px_36px] text-left border-r border-[var(--t-border-subtle)] last:border-r-0 transition-colors cursor-pointer ${
                isActive ? 'bg-[var(--t-icon-bg)]' : 'hover:bg-[var(--t-icon-bg)]/50'
              }`}
            >
              {/* Stack label over number with 16-20px vertical space */}
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: ch.color }}
                />
                <span className="text-xs sm:text-[13px] font-mono uppercase tracking-wider text-[var(--t-text-muted)] truncate">
                  {ch.name}
                </span>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--t-text-primary)] tracking-tight">
                {ch.value}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Interactive SVG closed-loop canvas */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="w-full aspect-[16/9] max-h-[420px] relative">
          <svg
            viewBox="0 0 600 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            role="img"
            aria-label="Adventory autonomous decision engine closed-loop demonstration"
          >
            {/* Background container */}
            <rect
              x="2"
              y="2"
              width="596"
              height="316"
              rx="12"
              fill="#0d0d0f"
              stroke="#262626"
              strokeWidth="1"
            />

            {/* Left Column: Data ingest channels */}
            <g>
              {['META ADS', 'GOOGLE ADS', 'AMAZON', 'TIKTOK', 'ERP & GA4'].map((name, i) => (
                <g key={name} transform={`translate(20, ${28 + i * 54})`}>
                  <rect
                    width="110"
                    height="38"
                    rx="8"
                    fill="#17171a"
                    stroke={stage === 0 ? 'var(--t-accent-green)' : '#2e2e32'}
                    strokeWidth="1"
                  />
                  <circle
                    cx="16"
                    cy="19"
                    r="4"
                    fill={stage === 0 ? 'var(--t-accent-green)' : '#525252'}
                  />
                  <text
                    x="28"
                    y="23"
                    fontSize="9"
                    fontFamily="var(--mono)"
                    fontWeight="600"
                    fill={stage === 0 ? '#fafafa' : '#a3a3a3'}
                    letterSpacing="0.08em"
                  >
                    {name}
                  </text>
                </g>
              ))}
            </g>

            {/* Ingest Flow Lines */}
            {['META', 'GOOGLE', 'AMAZON', 'TIKTOK', 'ERP'].map((_, i) => (
              <line
                key={`flow-${i}`}
                x1="150"
                y1={47 + i * 54}
                x2="195"
                y2="160"
                stroke={stage >= 0 ? 'rgba(34, 197, 94, 0.4)' : '#262626'}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                style={{
                  animation: stage === 0 && !reduced ? 'flow-dash 2s linear infinite' : 'none',
                }}
              />
            ))}

            {/* Center Node: Reconciled Schema & Anomaly Detection */}
            <g transform="translate(195, 80)">
              <rect
                width="180"
                height="160"
                rx="12"
                fill="#141416"
                stroke={stage >= 1 ? '#3a3a3a' : '#262626'}
                strokeWidth="1"
              />
              <text
                x="14"
                y="24"
                fontSize="8"
                fontFamily="var(--mono)"
                fontWeight="700"
                fill="var(--t-accent-green)"
                letterSpacing="0.12em"
              >
                UNIFIED SCHEMA VECTOR
              </text>
              <text x="14" y="38" fontSize="11" fontWeight="600" fill="#fafafa">
                ROAS &amp; Margin Velocity
              </text>

              {/* Sparkline chart */}
              <polyline
                points={chartPoints
                  .map((y, i) => `${14 + i * 7.8},${140 - (y - 25) * 2.8}`)
                  .join(' ')}
                stroke="var(--t-accent-green)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Pulse Anomaly Ring */}
              <circle
                cx={14 + anomalyIndex * 7.8}
                cy={140 - (chartPoints[anomalyIndex] - 25) * 2.8}
                r="7"
                fill="none"
                stroke="#ff8a1f"
                strokeWidth="2"
                style={{
                  animation: stage >= 1 && !reduced ? 'pulse 1.8s ease-in-out infinite' : 'none',
                }}
              />
              <text
                x={14 + anomalyIndex * 7.8}
                y={140 - (chartPoints[anomalyIndex] - 25) * 2.8 - 12}
                textAnchor="middle"
                fontSize="8"
                fontFamily="var(--mono)"
                fontWeight="700"
                fill="#ff8a1f"
              >
                CPM SPIKE -34%
              </text>
            </g>

            {/* Right Column: Decisions & Action Directives */}
            <g transform="translate(380, 30)">
              {/* Decision Box */}
              <g opacity={stage >= 2 ? 1 : 0.25} style={{ transition: 'opacity 0.4s' }}>
                <rect
                  width="180"
                  height="110"
                  rx="10"
                  fill="#17171a"
                  stroke={stage === 2 ? 'var(--t-accent-green)' : '#2e2e32'}
                  strokeWidth="1"
                />
                <text
                  x="14"
                  y="22"
                  fontSize="8"
                  fontFamily="var(--mono)"
                  fontWeight="700"
                  fill="var(--t-accent-green)"
                  letterSpacing="0.1em"
                >
                  AUTONOMOUS DIRECTIVE
                </text>
                <text x="14" y="38" fontSize="12" fontWeight="700" fill="#ffffff">
                  Reallocate +$6,500
                </text>
                <text x="14" y="54" fontSize="10" fill="#a3a3a3">
                  Meta / SKU-1042 → SKU-1001
                </text>
                <text x="14" y="70" fontSize="9" fontFamily="var(--mono)" fill="#4ade80">
                  Confidence: 92% · Cover: 45d
                </text>
                <rect x="14" y="80" width="152" height="18" rx="4" fill="rgba(34,197,94,0.12)" />
                <text x="90" y="93" textAnchor="middle" fontSize="9" fontWeight="600" fill="#4ade80">
                  {stage >= 3 ? '✓ APPROVED & DISPATCHED' : 'AWAITING APPROVAL'}
                </text>
              </g>

              {/* Learning closed-loop indicator */}
              <g
                transform="translate(0, 130)"
                opacity={stage >= 4 ? 1 : 0.2}
                style={{ transition: 'opacity 0.4s' }}
              >
                <rect
                  width="180"
                  height="90"
                  rx="10"
                  fill="#17171a"
                  stroke={stage === 4 ? 'var(--t-accent-green)' : '#2e2e32'}
                  strokeWidth="1"
                />
                <text
                  x="14"
                  y="24"
                  fontSize="8"
                  fontFamily="var(--mono)"
                  fontWeight="700"
                  fill="#5aa9ff"
                  letterSpacing="0.1em"
                >
                  MODEL REINFORCEMENT
                </text>
                <text x="14" y="42" fontSize="11" fontWeight="600" fill="#ffffff">
                  Accuracy Convergence: 91%
                </text>
                <text x="14" y="60" fontSize="10" fill="#a3a3a3">
                  Predicted ROAS: 4.2 · Actual: 4.1
                </text>
                <text x="14" y="76" fontSize="9" fontFamily="var(--mono)" fill="#5aa9ff">
                  Causal weights updated in schema
                </text>
              </g>
            </g>

            {/* Loop return path arrow */}
            <path
              d="M 380 240 C 260 290 120 280 80 230"
              stroke={stage === 4 ? 'var(--t-accent-green)' : '#2e2e32'}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
              style={{
                animation: stage === 4 && !reduced ? 'flow-dash 2s linear infinite' : 'none',
              }}
            />
            <defs>
              <style>{`
                @keyframes flow-dash {
                  to { stroke-dashoffset: -16; }
                }
              `}</style>
            </defs>
          </svg>
        </div>
      </div>

      {/* Stage Navigator Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 lg:px-8 py-5 border-t border-[var(--t-border-subtle)] bg-[rgba(255,255,255,0.02)]">
        <div className="flex flex-wrap items-center gap-4 sm:gap-5" role="tablist" aria-label="Decision engine workflow stages">
          {STAGES.map((s, idx) => {
            const isCurrent = stage === idx;
            return (
              <button
                key={s}
                role="tab"
                type="button"
                aria-selected={isCurrent}
                onClick={() => handleStageSelect(idx)}
                className={`py-2.5 px-4 sm:py-3 sm:px-[18px] rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer inline-flex items-center whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[var(--t-accent-solid)] text-[var(--t-accent-text)] shadow-sm font-bold'
                    : 'text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)] hover:bg-[var(--t-icon-bg)]'
                }`}
              >
                <span className={`mr-2.5 font-mono text-[11px] ${isCurrent ? 'opacity-70 font-bold' : 'text-[var(--t-text-faint)]'}`}>0{idx + 1}</span>
                <span>{s}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2.5 text-xs font-mono text-[var(--t-text-muted)] shrink-0">
          <span className="w-2 h-2 rounded-full bg-[var(--t-accent-green)] animate-ping" />
          <span>Real-time feedback loop active</span>
        </div>
      </div>
    </div>
  );
}
