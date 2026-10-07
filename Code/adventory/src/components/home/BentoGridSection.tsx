import { useInView } from '../../hooks/useInView';
import { StaggeredText } from '../ui/staggered-text';
import MagicBento from '../ui/MagicBento';

export function BentoGridSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="section-spacing-lg relative overflow-hidden">
      <div className="container-page">
        {/* Section Header */}
        <div className="max-w-[760px] mx-auto text-center mb-14 lg:mb-18">
          <span className="brag-pill mb-5">
            Cognitive Grid
          </span>
          <h2 className="f-h1 text-[var(--t-text-primary)] tracking-tight mb-5">
            <StaggeredText text="Autonomous Intelligence in Every Dimension" segmentBy="words" />
          </h2>
          <p className="text-base lg:text-lg text-[var(--t-text-secondary)] leading-relaxed lg:leading-[1.7]">
            Hover, tilt, and explore how Adventory unifies telemetry, isolates causal anomalies, and safeguards SKU margins with mathematical precision.
          </p>
        </div>

        {/* Bento Grid with monochrome specular glow */}
        <div className={`w-full flex justify-center reveal-line ${inView ? 'in' : ''}`}>
          <MagicBento
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={360}
            particleCount={14}
            glowColor="255, 255, 255"
          />
        </div>
      </div>
    </section>
  );
}
