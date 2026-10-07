import { useInView } from '../../hooks/useInView';
import { Database, Search, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StaggeredText } from '../ui/staggered-text';

const FEATURES = [
  {
    icon: Database,
    title: 'Ingest & Reconcile',
    description:
      'Continuously unify multi-platform ad spend (Meta, Google, Amazon, TikTok), store revenue, ERP stock levels, and SKU margin data into unified causal vectors.',
    tag: 'DATA LAYER',
    href: '/product/data-layer',
  },
  {
    icon: Search,
    title: 'Diagnose & Reason',
    description:
      'Causal inference models detect efficiency anomalies, isolate true root drivers, and evaluate incrementality beyond siloed in-platform reporting.',
    tag: 'INTELLIGENCE',
    href: '/product/diagnosis',
  },
  {
    icon: Zap,
    title: 'Decide, Execute & Learn',
    description:
      'Generate margin- and inventory-safe budget reallocations. Execute approved changes directly via ad APIs and continuously reinforce confidence from outcomes.',
    tag: 'AUTONOMY',
    href: '/product/decision',
  },
];

export function FeatureCards() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="section-spacing-lg">
      <div className="container-page">
        {/* Section Header: max-width 700px */}
        <div className="max-w-[700px] mb-16 lg:mb-20">
          <span className="brag-pill mb-5">
            Platform Pillars
          </span>
          <h2 className="f-h1 text-[var(--t-text-primary)] tracking-tight mb-5 max-w-[700px]">
            <StaggeredText text="From data to decisions in days, not months" segmentBy="words" />
          </h2>
          <p className="text-base lg:text-lg text-[var(--t-text-secondary)] leading-relaxed lg:leading-[1.7] max-w-[700px]">
            Eliminate weeks spent wrestling cross-channel spreadsheets. Let autonomous causal models surface exactly where the next dollar generates profitable return.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className={`p-card p-card-large min-h-[400px] flex flex-col justify-between group hover:border-[var(--t-border-default)] hover:-translate-y-1 transition-all duration-300 reveal-line ${
                inView ? 'in' : ''
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div>
                {/* Label row: 16-20px below to heading */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--t-accent-green)] px-3 py-1 rounded-full bg-[rgba(61,220,151,0.08)] border border-[rgba(61,220,151,0.2)]">
                    {feat.tag}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-[var(--t-icon-bg)] border border-[var(--t-border-subtle)] grid place-items-center group-hover:border-[var(--t-border-default)] transition-colors">
                    <feat.icon className="w-5 h-5 text-[var(--t-text-primary)]" />
                  </div>
                </div>

                {/* Heading: 16-20px below to description */}
                <h3 className="text-xl lg:text-2xl font-bold text-[var(--t-text-primary)] mb-5 tracking-tight leading-snug">
                  {feat.title}
                </h3>

                {/* Description: max-w-[450px], font 15-16px, line-height 1.7, 28-36px below to CTA */}
                <p className="text-[15px] lg:text-base text-[var(--t-text-muted)] leading-[1.7] font-normal max-w-[450px] mb-8">
                  {feat.description}
                </p>
              </div>

              {/* CTA link */}
              <Link
                to={feat.href}
                className="pt-6 border-t border-[var(--t-border-subtle)] flex items-center justify-between text-sm font-semibold text-[var(--t-text-primary)] group-hover:text-[var(--t-accent-green)] transition-colors"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
