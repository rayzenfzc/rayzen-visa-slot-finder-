import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative py-32 md:py-40 text-white">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4 uppercase tracking-wider">
          {t('heroTitle1')}
          <br />
          <span className="gradient-text">{t('heroTitle2')}</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 lowercase font-semibold">
          {t('heroSubtitle')}
        </p>
      </div>
    </section>
  );
};

export default Hero;