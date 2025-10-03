import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface StepProps {
  number: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepProps> = ({ number, title, description }) => (
    <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 text-white/5 text-9xl font-black">{number}</div>
        <div className="relative">
            <h3 className="text-2xl font-bold text-white mb-3 lowercase">{title}</h3>
            <p className="text-slate-400 text-lg lowercase font-semibold">{description}</p>
        </div>
    </div>
);

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider">{t('howItWorksTitle')}</h2>
          <p className="text-lg text-slate-400 mt-3 lowercase font-semibold">{t('howItWorksSubtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <StepCard
            number="1"
            title={t('step1Title')}
            description={t('step1Desc')}
          />
          <StepCard
            number="2"
            title={t('step2Title')}
            description={t('step2Desc')}
          />
          <StepCard
            number="3"
            title={t('step3Title')}
            description={t('step3Desc')}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;