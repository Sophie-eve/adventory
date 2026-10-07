import { useInView } from '../../hooks/useInView';
import { StaggeredText } from '../ui/staggered-text';
import SpecularButton from '../ui/SpecularButton';

interface CtaBannerProps {
  onDemoClick: () => void;
}

export function CtaBanner({ onDemoClick }: CtaBannerProps) {
  const { ref, inView } = useInView();

  const scrollToScenario = () => {
    document.getElementById('decision-scenario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative py-[clamp(100px,12vw,180px)]">
      <div className="container-page text-center">
        <div
          className={`relative rounded-3xl p-10 sm:p-16 lg:p-24 overflow-hidden border border-[var(--t-border-subtle)] bg-[var(--t-surface-raised)] shadow-[0_20px_70px_rgba(0,0,0,0.15)] backdrop-blur-xl reveal-line ${
            inView ? 'in' : ''
          }`}
        >
          {/* Subtle green ambient spotlight at center */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--t-accent-green) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-1 max-w-4xl mx-auto flex flex-col items-center pb-8 lg:pb-12">
            {/* Badge: 28-36px below to headline */}
            <div className="brag-pill mb-8">
              <span className="brag-pill-dot" />
              <span>Ready for Autonomous Intelligence?</span>
            </div>

            {/* Headline: max-w-[900px] mx-auto, clamp(48px, 6vw, 82px), leading 0.98, tracking -0.045em, 28-36px below to paragraph */}
            <h2
              className="text-[clamp(42px,5.8vw,82px)] leading-[0.98] tracking-[-0.045em] font-medium text-[var(--t-text-primary)] max-w-[900px] mx-auto mb-8"
              style={{ textWrap: 'balance' }}
            >
              <StaggeredText text="Stop guessing. Start growing profitably." segmentBy="words" />
            </h2>

            {/* Paragraph: max-w-[700px] mx-auto, 40-48px below to buttons */}
            <p className="text-base sm:text-lg lg:text-xl text-[var(--t-text-secondary)] mb-11 max-w-[700px] mx-auto font-normal leading-relaxed lg:leading-[1.7]">
              Transform your ad spend operations into an autonomous engine that unifies spend, defends SKU margins, and executes profitable growth.
            </p>

            {/* Buttons: min-h-[52px], px-8, gap >= 16px */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full">
              <SpecularButton
                size="lg"
                radius={29}
                tint="#ffffff"
                tintOpacity={0.06}
                blur={0}
                textColor="#ffffff"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={1.2}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.25}
                followMouse
                proximity={250}
                autoAnimate
                onClick={onDemoClick}
                className="w-full sm:w-auto shadow-xl"
              >
                <span>Book a 1-on-1 demo</span>
                <span className="font-mono">→</span>
              </SpecularButton>
              <button
                type="button"
                onClick={scrollToScenario}
                className="btn-secondary min-h-[52px] px-8 text-base font-medium cursor-pointer w-full sm:w-auto"
              >
                See how it decides
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
