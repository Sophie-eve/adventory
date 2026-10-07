import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { Footer } from '../components/footer/Footer';

const FAQS = [
  {
    question: "How is Adventory different from a reporting dashboard?",
    answer: "Adventory is not a dashboard—it's an active decision engine. Dashboards tell you what happened yesterday. Adventory tells you exactly where to shift your budget today to maximize marginal profit, and can execute those changes autonomously."
  },
  {
    question: "Does Adventory require tracking pixels or cookies?",
    answer: "No. We integrate directly with platform APIs (Meta, Google, Amazon, TikTok) and your backend commerce data (Shopify, ERPs). We use causal modeling on aggregate data, making our engine fully immune to iOS 14+ tracking restrictions and cookie deprecation."
  },
  {
    question: "Can it automatically manage my budget?",
    answer: "Yes. In 'Autopilot' mode, Adventory can execute budget reallocations directly via platform APIs. However, most teams start in 'Copilot' mode, where the engine surfaces ranked recommendations that require one-click human approval."
  },
  {
    question: "How long does it take for the models to learn?",
    answer: "Our Bayesian models begin generating causal insights within 48 hours of connecting your data sources. Maximum confidence is typically reached after a full 14-day attribution cycle."
  },
  {
    question: "Do you account for warehouse inventory levels?",
    answer: "Absolutely. Adventory pulls real-time stock cover data. The decision engine will penalize or pause campaigns promoting SKUs with low stock cover, reallocating spend to high-margin, high-inventory products."
  }
];

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--t-surface-base)]">
      <main className="flex-1 hero-section container-page">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-12 h-12 rounded-2xl bg-[var(--t-surface-raised)] border border-[var(--t-border-subtle)] grid place-items-center mb-6 shadow-sm">
              <MessageCircleQuestion className="w-6 h-6 text-[var(--t-accent-green)]" />
            </div>
            <h1 className="f-h1 text-[var(--t-text-primary)] tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[var(--t-text-muted)] max-w-xl mx-auto leading-relaxed">
              Everything you need to know about the product, integrations, and how we handle your data.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-[var(--t-border-default)] bg-[var(--t-surface-raised)] shadow-sm' : 'border-[var(--t-border-subtle)] bg-[var(--t-surface-overlay)] hover:border-[var(--t-border-default)]'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left px-7 py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-base sm:text-lg text-[var(--t-text-primary)] pr-8">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[var(--t-text-muted)] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[var(--t-text-primary)]' : ''}`} />
                  </button>
                  <div 
                    className={`px-7 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 pb-7 opacity-100' : 'max-h-0 pb-0 opacity-0'
                    }`}
                  >
                    <p className="text-[var(--t-text-secondary)] leading-7 text-base font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-[var(--t-text-secondary)] text-sm mb-4">Still have questions?</p>
            <a href="mailto:hello@adventory.ai" className="btn-secondary">
              Contact Support
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
