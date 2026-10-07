import { useState, useCallback } from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import {
  SCENARIO_STEPS,
  ROAS_TREND,
  DIAGNOSED_DRIVERS,
  REALLOCATIONS,
  LEARNING_DATA,
} from '../../data/scenario';
import { executeAdApiCall } from '../../mocks/api';

export function DecisionScenario() {
  const [step, setStep] = useState(0);
  const [approvedActions, setApprovedActions] = useState<Set<number>>(new Set());
  const [apiLog, setApiLog] = useState<string[]>([]);
  const [executing, setExecuting] = useState(false);
  const { ref, inView } = useInView();
  const reduced = usePrefersReducedMotion();

  const nextStep = () => setStep((s) => Math.min(s + 1, SCENARIO_STEPS.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleApprove = useCallback(async (index: number) => {
    const r = REALLOCATIONS[index];
    setApprovedActions((prev) => new Set(prev).add(index));
    setExecuting(true);
    const lines = await executeAdApiCall({
      platform: r.from.split(' / ')[0],
      campaignId: r.from.split(' / ')[1],
      change: 'reallocate',
      amount: r.amount,
    });
    setApiLog((prev) => [...prev, ...lines]);
    setExecuting(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextStep();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      prevStep();
    }
  };

  // SVG line chart coordinates for Detect step
  const chartW = 500,
    chartH = 120,
    padX = 40,
    padY = 20;
  const roasMin = Math.min(...ROAS_TREND.map((d) => d.roas)) - 0.3;
  const roasMax = Math.max(...ROAS_TREND.map((d) => d.roas)) + 0.3;
  const scaleX = (i: number) => padX + (i / (ROAS_TREND.length - 1)) * (chartW - 2 * padX);
  const scaleY = (v: number) =>
    padY + (1 - (v - roasMin) / (roasMax - roasMin)) * (chartH - 2 * padY);
  const linePath = ROAS_TREND.map(
    (d, i) => `${i === 0 ? 'M' : 'L'}${scaleX(i).toFixed(1)},${scaleY(d.roas).toFixed(1)}`
  ).join(' ');
  const anomalyDay = ROAS_TREND.findIndex((d) => d.roas < 2.0) || 19;

  return (
    <section
      id="decision-scenario"
      ref={ref}
      className="relative section-spacing-lg"
      onKeyDown={handleKeyDown}
    >
      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="brag-pill mb-5">
            <span className="brag-pill-dot" />
            <span>Interactive Decision Engine Simulator</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--t-text-primary)] max-w-[700px] mx-auto mb-5 reveal-line ${inView ? 'in' : ''}`}>
            Watch the engine work: from signal to action
          </h2>
          <p className="text-base sm:text-lg text-[var(--t-text-secondary)] max-w-[700px] mx-auto font-normal leading-relaxed lg:leading-[1.7]">
            Adventory ingests cross-channel telemetry, isolates causal margin anomalies, generates constrained reallocations, and learns continuously from post-execution returns.
          </p>
        </div>

        {/* Step tabs: ~20px gap, 12px 18px internal padding, wrap responsibly on mobile */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 max-w-full" role="tablist" aria-label="Scenario steps">
            {SCENARIO_STEPS.map((s, i) => {
              const isSelected = step === i;
              return (
                <button
                  key={s}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setStep(i)}
                  className={`py-3 px-[18px] rounded-full text-xs sm:text-[13px] font-semibold border transition-all cursor-pointer inline-flex items-center whitespace-nowrap ${
                    isSelected
                      ? 'bg-[var(--t-accent-solid)] border-[var(--t-accent-solid)] text-[var(--t-accent-text)] shadow-sm font-bold'
                      : i < step
                      ? 'border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)] text-[var(--t-accent-green)] hover:border-[var(--t-border-default)]'
                      : 'border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)] text-[var(--t-text-muted)] hover:text-[var(--t-text-secondary)] hover:border-[var(--t-border-default)]'
                  }`}
                >
                  <span className={`mr-2.5 font-mono text-[11px] ${isSelected ? 'opacity-70 font-bold' : 'text-[var(--t-text-faint)]'}`}>0{i + 1}</span>
                  <span>{s}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step content card */}
        <div className="p-card rounded-2xl shadow-xl relative overflow-hidden" role="tabpanel">
          {/* Top card ambient indicator */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3ddc97]/30 to-transparent" />

          {/* DETECT */}
          {step === 0 && (
            <div className="page-enter">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--t-accent-green)] mb-2.5 block">Step 01 / Anomaly Detection</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--t-text-primary)] tracking-tight max-w-[700px]">Cross-channel ROAS anomaly isolated</h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-mono shrink-0 max-w-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  <span className="break-words">Efficiency Drop: Days 18–22</span>
                </div>
              </div>
              {/* Heading to Paragraph: 24-32px (handled by mb-6 sm:mb-8), Paragraph: max-w-[650px] leading-[1.7], Paragraph to Chart: 48-72px (mb-12 sm:mb-16) */}
              <p className="text-[15px] sm:text-base text-[var(--t-text-secondary)] max-w-[650px] leading-[1.7] mb-12 sm:mb-16">
                30-day cross-platform ROAS timeline across Meta, Google, Amazon, and TikTok. The causal detector flagged an unexpected 42% efficiency drawdown unexplainable by seasonality.
              </p>
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-2xl h-auto" aria-label="ROAS trend chart">
                {/* Grid lines */}
                {[roasMin, (roasMin + roasMax) / 2, roasMax].map((v) => (
                  <g key={v}>
                    <line x1={padX} y1={scaleY(v)} x2={chartW - padX} y2={scaleY(v)} stroke="rgba(230,230,230,0.08)" />
                    <text x={padX - 5} y={scaleY(v) + 3} textAnchor="end" fontSize="9" fill="#8b8f96" fontFamily="var(--mono)">
                      {v.toFixed(1)}
                    </text>
                  </g>
                ))}
                {/* ROAS line */}
                <path
                  d={linePath}
                  stroke="#3ddc97"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: reduced ? 0 : inView ? 0 : 1000,
                    transition: 'stroke-dashoffset 1.4s ease',
                  }}
                />
                {/* Anomaly marker */}
                {ROAS_TREND.filter((d) => d.roas < 2.0).map((d) => (
                  <circle
                    key={d.day}
                    cx={scaleX(d.day - 1)}
                    cy={scaleY(d.roas)}
                    r="5"
                    fill="none"
                    stroke="#ff8a1f"
                    strokeWidth="2"
                    style={{ animation: reduced ? 'none' : 'pulse 2s ease-in-out infinite' }}
                  />
                ))}
                <text
                  x={scaleX(anomalyDay)}
                  y={scaleY(ROAS_TREND[anomalyDay]?.roas ?? 2) - 12}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#ff8a1f"
                  fontFamily="var(--mono)"
                  fontWeight="600"
                >
                  ANOMALY
                </text>
              </svg>
            </div>
          )}

          {/* DIAGNOSE */}
          {step === 1 && (
            <div className="page-enter">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--t-accent-green)] mb-2.5 block">Step 02 / Causal Diagnosis</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--t-text-primary)] tracking-tight max-w-[700px]">Root-cause drivers ranked by contribution</h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--t-icon-bg)] border border-[var(--t-border-subtle)] text-[var(--t-text-secondary)] text-xs font-mono shrink-0 max-w-full">
                  <span>Multi-Factor Attribution</span>
                </div>
              </div>
              <p className="text-[15px] sm:text-base text-[var(--t-text-secondary)] max-w-[650px] leading-[1.7] mb-12 sm:mb-14">
                The causal engine correlates ad auction bids, SKU warehouse inventory levels, and onsite bounce rates to isolate why ROAS compressed.
              </p>
              <div className="space-y-4 max-w-3xl">
                {DIAGNOSED_DRIVERS.map((d, i) => (
                  <div key={d.label} className="p-6 rounded-xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)] hover:border-[var(--t-border-default)] transition-colors">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="text-sm font-semibold text-[var(--t-text-primary)]">{d.label}</span>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        {d.contribution}% contribution
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--t-border-subtle)] overflow-hidden my-3">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all duration-800 ease-out"
                        style={{
                          width: reduced ? `${d.contribution}%` : inView ? `${d.contribution}%` : '0%',
                          transitionDelay: `${i * 0.1}s`,
                        }}
                      />
                    </div>
                    <p className="text-xs sm:text-[13px] text-[var(--t-text-muted)] leading-relaxed">{d.evidence}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DECIDE */}
          {step === 2 && (
            <div className="page-enter">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--t-accent-green)] mb-2.5 block">Step 03 / Autonomous Reallocation</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--t-text-primary)] tracking-tight max-w-[700px]">Recommended budget directives</h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[rgba(61,220,151,0.08)] border border-[rgba(61,220,151,0.25)] text-[var(--t-accent-green)] text-xs font-mono font-semibold shrink-0 max-w-full">
                  <span>+ $9,700 Expected Net Profit</span>
                </div>
              </div>
              <p className="text-[15px] sm:text-base text-[var(--t-text-secondary)] max-w-[650px] leading-[1.7] mb-12 sm:mb-14">
                Margin-aware and stock-cover-constrained budget shifts prioritized by expected incremental return.
              </p>
              <div className="overflow-x-auto rounded-xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] font-mono uppercase tracking-wider text-[var(--t-text-muted)] border-b border-[var(--t-border-subtle)] bg-[var(--t-surface-raised)]">
                      <th className="py-4 px-5 font-semibold">From (Underperforming)</th>
                      <th className="py-4 px-5 font-semibold">To (High Margin / Stock)</th>
                      <th className="py-4 px-5 font-semibold">Shift Amount</th>
                      <th className="py-4 px-5 font-semibold">Confidence</th>
                      <th className="py-4 px-5 font-semibold">Expected Profit</th>
                      <th className="py-4 px-5 font-semibold">Safety Constraints</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--t-border-subtle)]">
                    {REALLOCATIONS.map((r, i) => (
                      <tr key={i} className="hover:bg-[var(--t-icon-bg)] transition-colors">
                        <td className="py-4 px-5 text-[var(--t-text-muted)] font-mono text-xs">{r.from}</td>
                        <td className="py-4 px-5 text-[var(--t-text-primary)] font-medium">{r.to}</td>
                        <td className="py-4 px-5 text-[var(--t-text-primary)] font-mono font-semibold">${r.amount.toLocaleString()}</td>
                        <td className="py-4 px-5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[rgba(61,220,151,0.08)] text-[var(--t-accent-green)] text-xs font-mono font-bold">
                            {r.confidence}%
                          </span>
                        </td>
                        <td className="py-4 px-5 text-[var(--t-accent-green)] font-semibold font-mono">
                          +${r.expectedProfit.toLocaleString()}
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex flex-wrap gap-1.5">
                            {r.constraints.map((c) => (
                              <span
                                key={c}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--t-icon-bg)] text-[var(--t-text-secondary)] border border-[var(--t-border-subtle)]"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EXECUTE */}
          {step === 3 && (
            <div className="page-enter">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--t-accent-green)] mb-2.5 block">Step 04 / Direct API Execution</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--t-text-primary)] tracking-tight max-w-[700px]">Operator approval &amp; ad API dispatch</h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--t-icon-bg)] border border-[var(--t-border-subtle)] text-[var(--t-text-secondary)] text-xs font-mono shrink-0 max-w-full">
                  <span>Human-in-the-Loop Safe</span>
                </div>
              </div>
              <p className="text-[15px] sm:text-base text-[var(--t-text-secondary)] max-w-[650px] leading-[1.7] mb-12 sm:mb-14">
                Review each autonomous recommendation. Approve to execute immediate budget changes via direct Meta, Google, Amazon, or TikTok ad APIs.
              </p>
              <div className="space-y-4 max-w-3xl mb-8">
                {REALLOCATIONS.map((r, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 rounded-xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)] hover:border-[var(--t-border-default)] transition-colors"
                  >
                    <div>
                      <p className="text-sm text-[var(--t-text-primary)] font-semibold flex items-center gap-2">
                        <span>{r.from}</span>
                        <span className="text-[var(--t-text-faint)]">→</span>
                        <span className="text-[var(--t-accent-green)]">{r.to}</span>
                      </p>
                      <p className="text-xs text-[var(--t-text-muted)] font-mono mt-2">
                        Budget shift: <span className="text-[var(--t-text-primary)] font-bold">${r.amount.toLocaleString()}</span> · Expected profit lift: <span className="text-[var(--t-accent-green)] font-bold">+${r.expectedProfit.toLocaleString()}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => handleApprove(i)}
                        disabled={approvedActions.has(i) || executing}
                        className={`h-10 px-5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                          approvedActions.has(i)
                            ? 'bg-[rgba(61,220,151,0.12)] border border-[rgba(61,220,151,0.3)] text-[var(--t-accent-green)] cursor-default'
                            : 'btn-primary'
                        }`}
                      >
                        {approvedActions.has(i) ? '✓ Dispatched via API' : 'Approve & Push'}
                      </button>
                      {!approvedActions.has(i) && (
                        <button
                          type="button"
                          className="btn-secondary h-10 px-4 text-xs font-medium cursor-pointer"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* API log terminal */}
              {apiLog.length > 0 && (
                <div className="rounded-xl bg-[#06080a] border border-[var(--t-border-subtle)] p-5 font-mono text-xs text-[#3ddc97] max-h-52 overflow-y-auto shadow-inner">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--t-text-muted)] mb-2 border-b border-[var(--t-border-subtle)] pb-1">
                    API Execution Stream — Live Outbound Payload
                  </div>
                  {apiLog.map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line}
                    </div>
                  ))}
                  {executing && <span className="blink-cursor" />}
                </div>
              )}
            </div>
          )}

          {/* LEARN */}
          {step === 4 && (
            <div className="page-enter">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--t-accent-green)] mb-2.5 block">Step 05 / Closed-Loop Feedback</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--t-text-primary)] tracking-tight max-w-[700px]">Predicted vs. actual outcome convergence</h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[rgba(61,220,151,0.08)] border border-[rgba(61,220,151,0.25)] text-[var(--t-accent-green)] text-xs font-mono font-semibold shrink-0 max-w-full">
                  <span>+13% Model Accuracy</span>
                </div>
              </div>
              <p className="text-[15px] sm:text-base text-[var(--t-text-secondary)] max-w-[650px] leading-[1.7] mb-12 sm:mb-14">
                Post-execution tracking. Adventory measures actual revenue vs. model forecast over 21 days, closing the causal loop to improve next-cycle precision.
              </p>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="p-5 rounded-xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)]">
                  <svg viewBox="0 0 300 160" className="w-full h-auto" aria-label="Predicted vs actual ROAS">
                    {/* Grid */}
                    {[2.5, 3.5, 4.5].map((v) => (
                      <g key={v}>
                        <line
                          x1="40"
                          y1={140 - (v - 2) * 40}
                          x2="280"
                          y2={140 - (v - 2) * 40}
                          stroke="rgba(230,230,230,0.08)"
                        />
                        <text x="35" y={143 - (v - 2) * 40} textAnchor="end" fontSize="9" fill="#888" fontFamily="var(--mono)">
                          {v.toFixed(1)}
                        </text>
                      </g>
                    ))}
                    {/* Predicted line */}
                    <polyline
                      points={LEARNING_DATA.predicted.map((v, i) => `${60 + i * 32},${140 - (v - 2) * 40}`).join(' ')}
                      stroke="#5aa9ff"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="4 3"
                    />
                    {/* Actual line */}
                    <polyline
                      points={LEARNING_DATA.actual.map((v, i) => `${60 + i * 32},${140 - (v - 2) * 40}`).join(' ')}
                      stroke="#3ddc97"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    {/* Days labels */}
                    {LEARNING_DATA.days.map((d, i) => (
                      <text key={d} x={60 + i * 32} y="155" textAnchor="middle" fontSize="8" fill="#888" fontFamily="var(--mono)">
                        {d}
                      </text>
                    ))}
                    {/* Legend */}
                    <line x1="60" y1="12" x2="75" y2="12" stroke="#5aa9ff" strokeWidth="2" strokeDasharray="4 3" />
                    <text x="80" y="15" fontSize="9" fill="#5aa9ff" fontFamily="var(--mono)">
                      Predicted ROAS
                    </text>
                    <line x1="160" y1="12" x2="175" y2="12" stroke="#3ddc97" strokeWidth="2.5" />
                    <text x="180" y="15" fontSize="9" fill="#3ddc97" fontFamily="var(--mono)">
                      Actual ROAS
                    </text>
                  </svg>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="p-6 rounded-xl border border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)]">
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--t-text-muted)] mb-2">Model Confidence Score</p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold font-mono text-[var(--t-text-faint)]">
                        {LEARNING_DATA.confidenceBefore}%
                      </span>
                      <span className="text-[var(--t-text-faint)]">→</span>
                      <span className="text-3xl font-bold font-mono text-[var(--t-accent-green)]">
                        {LEARNING_DATA.confidenceAfter}%
                      </span>
                    </div>
                    <p className="text-xs text-[var(--t-text-muted)] mt-2">
                      Validated over 21 days of continuous closed-loop Bayesian refinement
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[rgba(61,220,151,0.08)] border border-[rgba(61,220,151,0.25)] text-sm text-[var(--t-text-primary)] leading-relaxed">
                    The executed adjustments generated{' '}
                    <span className="text-[var(--t-text-primary)] font-bold">+$9,700 in incremental SKU contribution profit</span>.
                    Predicted and realized ROAS converged within 4.8%, confirming predictive validity.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0}
            className="btn-secondary h-10 px-6 text-xs font-medium disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          >
            ← Previous step
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={step === SCENARIO_STEPS.length - 1}
            className="btn-primary h-10 px-7 text-xs font-bold disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          >
            Next step →
          </button>
        </div>
      </div>
    </section>
  );
}
