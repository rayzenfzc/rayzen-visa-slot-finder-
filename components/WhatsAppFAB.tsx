import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useLanguage } from '../hooks/useLanguage';

const WhatsAppFAB: React.FC = () => {
  const { language, t } = useLanguage();

  const handleClick = () => {
    const whatsappNumber = "971502189091";
    const message = t('whatsappGreeting');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-green-600 z-50 group ${language === 'ar' ? 'left-6' : 'right-6'}`}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
      <span className={`absolute px-3 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${language === 'ar' ? 'left-full ms-4' : 'right-full me-4'}`}>
        {t('fabTooltip')}
      </span>
    </button>
  );
};

export default WhatsAppFAB;
