import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';
import { useLanguage } from '../hooks/useLanguage';

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 text-fuchsia-400 pt-1">
      <CheckCircleIcon />
    </div>
    <div>
      <h3 className="font-bold text-xl text-white lowercase">{title}</h3>
      <p className="text-slate-400 lowercase font-semibold">{description}</p>
    </div>
  </div>
);


const WhyChooseUs: React.FC = () => {
  const { language, t } = useLanguage();
  
  return (
    <section id="why-us" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="glass-card p-8 md:p-12 lg:p-16">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-wider">
                    <span className="gradient-text">{t('whyUsTitle')}</span>
                </h2>
                <p className="text-xl text-slate-300 mb-12 lowercase font-semibold">
                    {t('whyUsSubtitle')}
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
                <Feature 
                title={t('featureExpert')}
                description={t('featureExpertDesc')}
                />
                <Feature 
                title={t('featureFast')}
                description={t('featureFastDesc')}
                />
                <Feature 
                title={t('featurePay')}
                description={t('featurePayDesc')}
                />
                <Feature 
                title={t('featureSupport')}
                description={t('featureSupportDesc')}
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;