import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import { StaggeredText } from '../ui/staggered-text';

const METRICS = [
  { value: 42, suffix: '%', label: 'Average ROAS lift', note: 'across pilot cohort' },
  { value: 3.2, suffix: 'x', label: 'Faster root diagnosis', note: 'vs manual correlation' },
  { value: 9700, prefix: '$', suffix: '', label: 'Incremental profit per cycle', note: '21-day average' },
  { value: 91, suffix: '%', label: 'Model confidence', note: 'after closed-loop learning' },
];

export function MetricsStrip() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative section-spacing-lg">
      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="brag-pill mb-5">
            <span className="brag-pill-dot" />
            <span>Measured Performance Impact</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--t-text-primary)] max-w-[700px] mx-auto mb-5 reveal-line ${inView ? 'in' : ''}`}>
            <StaggeredText text="Predictable returns, powered by causal intelligence" segmentBy="words" />
          </h2>
          <p className="text-base sm:text-lg text-[var(--t-text-secondary)] max-w-[700px] mx-auto font-normal leading-relaxed lg:leading-[1.7]">
            Real outcomes realized by omnichannel brands swapping spreadsheet guesswork for autonomous optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {METRICS.map((m) => (
            <MetricCard key={m.label} {...m} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  value,
  prefix,
  suffix,
  label,
  note,
  inView,
}: {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  note: string;
  inView: boolean;
}) {
  const isDecimal = !Number.isInteger(value);
  const count = useCountUp(isDecimal ? value * 10 : value, 1400, inView);
  const display = isDecimal ? (count / 10).toFixed(1) : count.toLocaleString();

  return (
    <div className="p-card flex flex-col justify-between text-left relative overflow-hidden group hover:border-[var(--t-border-default)] transition-all min-h-[280px]">
      <div className="flex items-center justify-between mb-10 lg:mb-12">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--t-accent-green)] shadow-[0_0_8px_rgba(61,220,151,0.6)]" />
        <span className="text-[11px] font-mono text-[var(--t-text-muted)] uppercase tracking-wider">
          Verified
        </span>
      </div>
      <div>
        <div className="text-4xl sm:text-5xl font-semibold text-[var(--t-text-primary)] tracking-tight mb-5">
          {prefix && <span className="text-[var(--t-accent-green)] mr-0.5">{prefix}</span>}
          {display}
          <span className="text-[var(--t-accent-green)] ml-0.5">{suffix}</span>
        </div>
        <p className="text-base font-semibold text-[var(--t-text-primary)] mb-3">{label}</p>
        <p className="text-sm text-[var(--t-text-muted)] leading-relaxed">{note}</p>
      </div>
    </div>
  );
}
