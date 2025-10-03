import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useLanguage } from '../hooks/useLanguage';

const ChatbotTrigger: React.FC = () => {
  const { t } = useLanguage();

  const handleClick = () => {
    const whatsappNumber = "971502189091";
    const message = t('whatsappGreeting');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="apply" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">{t('ctaTitle')}</h2>
            <p className="text-lg text-slate-400 mt-3 mb-10">{t('ctaSubtitle')}</p>
            <button
              onClick={handleClick}
              className="inline-flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
            >
              <WhatsAppIcon/>
              {t('ctaButton')}
            </button>
        </div>
      </div>
    </section>
  );
};

export default ChatbotTrigger;
