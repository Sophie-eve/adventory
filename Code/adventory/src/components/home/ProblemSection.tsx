import { useInView } from '../../hooks/useInView';
import { StaggeredText } from '../ui/staggered-text';

const PROBLEMS = [
  {
    title: 'Siloed Channel Attribution',
    description:
      'Meta, Google, and TikTok each claim credit for the same orders. In-platform ROAS numbers mislead teams into overfunding saturated campaigns.',
    tag: 'ATTRIBUTION BLIND SPOT',
    stat: '3.4x overlap',
  },
  {
    title: 'Delayed & Manual Correlation',
    description:
      'Pinpointing why ROAS dropped requires days of cross-tab spreadsheet analysis. By the time causes are isolated, thousands in budget have leaked.',
    tag: 'LATENCY',
    stat: '48+ hours lost',
  },
  {
    title: 'Stockout & Margin Mismatch',
    description:
      'Traditional media managers scale ads on high-velocity items without real-time inventory checks, pouring spend into SKUs about to stock out.',
    tag: 'INVENTORY RISK',
    stat: '22% margin drag',
  },
  {
    title: 'Intuitive Budget Allocation',
    description:
      'Budgets are shifted based on gut feel rather than diminishing returns curves. High-margin products starve while low-return products consume capital.',
    tag: 'ALLOCATION DRIFT',
    stat: '-18% suboptimal',
  },
  {
    title: 'Passive Analytics, Zero Action',
    description:
      'Existing dashboards display what happened yesterday but never generate executable directives or measure the causal impact of budget changes.',
    tag: 'NO EXECUTION LOOP',
    stat: '0 closed-loop feedback',
  },
];

export function ProblemSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="section-spacing-lg border-t border-[var(--t-border-subtle)]">
      <div className="container-page">
        {/* Section Header: max-width 700px */}
        <div className="max-w-[700px] mb-16 lg:mb-20">
          <span className="brag-pill mb-5 bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)] text-red-500">
            The Multi-Channel Challenge
          </span>

          <h2
            className={`f-h1 text-[var(--t-text-primary)] tracking-tight mb-5 max-w-[700px] reveal-line ${
              inView ? 'in' : ''
            }`}
          >
            <StaggeredText
              text="63.2% of ad performance shifts where standard dashboards can't see them"
              segmentBy="words"
            />
          </h2>

          <p
            className={`text-base lg:text-lg text-[var(--t-text-secondary)] leading-relaxed lg:leading-[1.7] max-w-[700px] reveal-line ${
              inView ? 'in' : ''
            }`}
            style={{ transitionDelay: '0.1s', textWrap: 'pretty' }}
          >
            Growth brands are drowning in disconnected data silos across Meta, Google, Amazon, and TikTok. Without causal intelligence, decisions remain reactive and expensive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {PROBLEMS.map((prob, i) => (
            <div
              key={prob.title}
              className={`p-card flex flex-col justify-between reveal-line ${
                inView ? 'in' : ''
              }`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div>
                {/* Label row: 16-20px below to heading */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--t-text-muted)]">
                    {prob.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-red-500">
                    {prob.stat}
                  </span>
                </div>

                {/* Heading: 16-20px below to description */}
                <h3 className="text-lg lg:text-xl font-bold text-[var(--t-text-primary)] mb-5 tracking-tight">
                  {prob.title}
                </h3>

                {/* Description: max-w-[450px], text 15px, leading 1.7 */}
                <p className="text-[15px] leading-[1.7] text-[var(--t-text-muted)] max-w-[450px]">
                  {prob.description}
                </p>
              </div>
            </div>
          ))}

          {/* Solution Highlight Box */}
          <div className="p-card border-[rgba(61,220,151,0.3)] bg-[rgba(61,220,151,0.04)] flex flex-col justify-center">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--t-accent-green)] mb-5 block">
              THE ADVENTORY SOLUTION
            </span>
            <h3 className="text-lg lg:text-xl font-bold text-[var(--t-text-primary)] mb-5 tracking-tight">
              Closed-Loop Autonomous Engine
            </h3>
            <p className="text-[15px] leading-[1.7] text-[var(--t-text-secondary)] max-w-[450px]">
              Adventory continuously vectorizes spend, stock levels, and margins into high-confidence budget allocations that execute directly via platform APIs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
