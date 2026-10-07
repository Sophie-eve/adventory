/**
 * HomePage.tsx — Assembles all home page sections in skeleton rhythm order.
 */
import { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { TrustedBy } from '../components/home/TrustedBy';
import { FeatureCards } from '../components/home/FeatureCards';
import { BentoGridSection } from '../components/home/BentoGridSection';
import { ProblemSection } from '../components/home/ProblemSection';
import { DecisionScenario } from '../components/home/DecisionScenario';
import { MetricsStrip } from '../components/home/MetricsStrip';
import { Testimonials } from '../components/home/Testimonials';
import { CtaBanner } from '../components/home/CtaBanner';
import { Footer } from '../components/footer/Footer';
import { DemoModal } from '../components/modals/DemoModal';

export function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Hero onDemoClick={() => setDemoOpen(true)} />
      <TrustedBy />
      <FeatureCards />
      <BentoGridSection />
      <ProblemSection />
      <DecisionScenario />
      <MetricsStrip />
      <Testimonials />
      <CtaBanner onDemoClick={() => setDemoOpen(true)} />
      <Footer />

      {/* Modal triggered from within the page */}
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
