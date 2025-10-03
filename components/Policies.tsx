import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigation } from '../hooks/useNavigation';
import CheckCircleIcon from './icons/CheckCircleIcon';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="glass-card p-8 md:p-10 mb-12">
    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-wider">
      <span className="gradient-text">{title}</span>
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 text-fuchsia-400 pt-1">
      <CheckCircleIcon />
    </div>
    <p className="text-slate-300 text-lg lowercase font-semibold">{children}</p>
  </div>
);

const Policies: React.FC = () => {
  const { t } = useLanguage();
  const { navigateTo } = useNavigation();

  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 text-white uppercase tracking-wider">
              {t('policiesTitle')}
            </h1>
          </div>
          
          <Section title={t('bookingProcessTitle')}>
            <ListItem>{t('bookingStep1')}</ListItem>
            <ListItem>{t('bookingStep2')}</ListItem>
            <ListItem>{t('bookingStep3')}</ListItem>
            <ListItem>{t('bookingStep4')}</ListItem>
            <ListItem>{t('bookingStep5')}</ListItem>
          </Section>

          <Section title={t('paymentTitle')}>
            <ListItem>{t('paymentStep1')}</ListItem>
            <ListItem>{t('paymentStep2')}</ListItem>
            <ListItem>{t('paymentStep3')}</ListItem>
            <ListItem>{t('paymentStep4')}</ListItem>
            <ListItem>{t('paymentStep5')}</ListItem>
          </Section>

          <Section title={t('assuranceTitle')}>
            <ListItem>{t('assuranceStep1')}</ListItem>
            <ListItem>{t('assuranceStep2')}</ListItem>
            <ListItem>{t('assuranceStep3')}</ListItem>
            <ListItem>{t('assuranceStep4')}</ListItem>
            <ListItem>{t('assuranceStep5')}</ListItem>
          </Section>

          <div className="glass-card p-8 md:p-10 mb-12 border-l-4 border-purple-500">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase tracking-wider">
              {t('devNotesTitle')}
            </h2>
            <p className="text-slate-400 mb-6 lowercase font-semibold">{t('devNotesDesc')}</p>
            <pre className="bg-gray-900/50 p-6 rounded-lg text-slate-300 font-mono text-sm overflow-x-auto">
              <code>
                {`
// Step 1: Customer initiates contact → Auto-reply with welcome message
// Step 2: Country selection → Send country-specific requirements
// Step 3: Document submission → Automated checklist confirmation
// Step 4: Slot found → Immediate WhatsApp notification with payment link
// Step 5: Payment confirmed → Onboarding sequence with appointment details
// Step 6: Pre-appointment → 24-hour reminder notification via WhatsApp
                `}
              </code>
            </pre>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigateTo('home')}
              className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              {t('policiesBackToHome')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;