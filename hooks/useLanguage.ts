import { useContext, useCallback } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations, TranslationKey } from '../lib/translations';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  const { language, setLanguage } = context;

  const t = useCallback((key: TranslationKey, replacements?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations.en[key];
    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            const regex = new RegExp(`{{${rKey}}}`, 'g');
            text = text.replace(regex, String(replacements[rKey]));
        })
    }
    return text;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  }, [language]);

  return { language, setLanguage, t, toggleLanguage };
};