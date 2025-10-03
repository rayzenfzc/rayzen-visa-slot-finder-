import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigation } from '../hooks/useNavigation';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { navigateTo, scrollToSection } = useNavigation();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('apply');
  };

  return (
    <footer className="bg-black/20 border-t border-white/10 text-slate-400 py-12 mt-24">
      <div className="container mx-auto px-6 text-center">
         <p className="text-lg font-bold text-white tracking-wider mb-4">
          RAYT-FASTTRACK FINDER
        </p>
        <div className="flex justify-center gap-6 mb-6">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home')}} className="hover:text-white transition-colors">Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('policies'); }} className="hover:text-white transition-colors">{t('navPolicies')}</a>
            <a href="#" onClick={handleContactClick} className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="lowercase font-semibold">{t('footerCopyright', { year: new Date().getFullYear() })}</p>
        <p className="mt-3 text-xs text-slate-500 max-w-xl mx-auto lowercase font-semibold">
          {t('footerDisclaimer')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;