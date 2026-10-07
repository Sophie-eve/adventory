import { ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { HeroLoop } from './HeroLoop';
import { StaggeredText } from '../ui/staggered-text';
import SpecularButton from '../ui/SpecularButton';
import TextType from '../ui/TextType';

interface HeroProps {
  onDemoClick: () => void;
}

const DYNAMIC_WORDS = ['revenue', 'profit', 'efficiency', 'incrementality'];

export function Hero({ onDemoClick }: HeroProps) {
  const { ref, inView } = useInView();

  const scrollToScenario = () => {
    document.getElementById('decision-scenario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative hero-section overflow-hidden">
      <div className="container-page text-center relative z-1 flex flex-col items-center">
        {/* Prescient Brag Pill (Badge) - 32px below */}
        <div
          onClick={scrollToScenario}
          className="brag-pill mb-8 cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--t-accent-green)] shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
          <span className="font-semibold text-[var(--t-text-primary)]">Autonomous Decision Engine</span>
          <span className="text-[var(--t-text-muted)]">|</span>
          <span className="flex items-center gap-1 text-[var(--t-accent-green)] group-hover:underline">
            See live simulation
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        {/* Dynamic Staggered Headline (React Bits Pro StaggeredText) */}
        <h1
          className="f-h0 text-[var(--t-text-primary)] max-w-[900px] mx-auto tracking-tight leading-[1.08] mb-8"
          style={{ textWrap: 'balance' }}
        >
          <StaggeredText
            text="The decision engine to maximize your"
            segmentBy="words"
            direction="bottom"
            duration={0.7}
            delay={0.04}
          />{' '}
          <span className="hero-word-badge inline-flex items-center align-baseline">
            <TextType
              text={DYNAMIC_WORDS}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              deletingSpeed={30}
            />
          </span>
          .
        </h1>

        {/* Crisp Subtitle with Staggered Entrance */}
        <div
          className="text-[clamp(18px,1.5vw,22px)] text-[var(--t-text-muted)] max-w-[760px] mx-auto leading-[1.6] font-normal mb-10 lg:mb-11"
          style={{ textWrap: 'pretty' }}
        >
          <StaggeredText
            text="Make every ad dollar count. Adventory gives growth marketing and finance teams the clarity to allocate budgets with confidence using autonomous marketing intelligence."
            segmentBy="words"
            direction="bottom"
            duration={0.6}
            delay={0.015}
          />
        </div>

        {/* Action CTAs: Forceful whitespace before visualization */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full"
          style={{
            marginBottom: 'clamp(120px, 14vw, 180px)',
          }}
        >
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
            speed={0.2}
            followMouse
            proximity={250}
            autoAnimate
            onClick={onDemoClick}
            className="w-full sm:w-auto shadow-xl"
          >
            Book a demo
          </SpecularButton>
          <button
            type="button"
            onClick={scrollToScenario}
            className="btn-secondary min-h-[52px] px-8 text-base cursor-pointer w-full sm:w-auto"
          >
            See how it decides
          </button>
        </div>

        {/* Prescient Channel Dashboard & Closed-Loop Visual */}
        <div
          className={`w-full flex justify-center reveal-line ${inView ? 'in' : ''}`}
          style={{
            marginTop: 'clamp(40px, 5vw, 70px)',
          }}
        >
          <div className="w-full max-w-6xl">
            <HeroLoop />
          </div>
        </div>
      </div>
    </section>
  );
}
