import React from 'react';
import UsaFlagIcon from './icons/UsaFlagIcon';
import SchengenFlagIcon from './icons/SchengenFlagIcon';
import UkFlagIcon from './icons/UkFlagIcon';
import CanadaFlagIcon from './icons/CanadaFlagIcon';
import ApplicationFormIcon from './icons/ApplicationFormIcon';
import DocumentationIcon from './icons/DocumentationIcon';
import InsuranceIcon from './icons/InsuranceIcon';
import UrgentVisaIcon from './icons/UrgentVisaIcon';
import { useLanguage } from '../hooks/useLanguage';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="glass-card p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center group">
    <div className="flex-shrink-0 text-purple-400 group-hover:text-fuchsia-400 transition-colors duration-300 mb-5">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-3 lowercase">{title}</h3>
    <p className="text-slate-400 lowercase font-semibold">{description}</p>
  </div>
);

const Services: React.FC = () => {
  const { t } = useLanguage();
  
  const visaServices = [
      { icon: <UsaFlagIcon />, title: t('usaVisaTitle'), description: t('usaVisaDesc') },
      { icon: <SchengenFlagIcon />, title: t('schengenVisaTitle'), description: t('schengenVisaDesc') },
      { icon: <UkFlagIcon />, title: t('ukVisaTitle'), description: t('ukVisaDesc') },
      { icon: <CanadaFlagIcon />, title: t('canadaVisaTitle'), description: t('canadaVisaDesc') },
  ];

  const addOnServices = [
      { icon: <ApplicationFormIcon />, title: t('serviceForm'), description: t('serviceFormDesc') },
      { icon: <DocumentationIcon />, title: t('serviceDocs'), description: t('serviceDocsDesc') },
      { icon: <InsuranceIcon />, title: t('serviceInsurance'), description: t('serviceInsuranceDesc') },
      { icon: <UrgentVisaIcon />, title: t('serviceUrgent'), description: t('serviceUrgentDesc') },
  ]

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider">{t('visasTitle')}</h2>
          <p className="text-lg text-slate-400 mt-3 lowercase font-semibold">{t('visasSubtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visaServices.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
        
        <div className="text-center my-16 pt-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider">{t('detailedServicesTitle')}</h2>
          <p className="text-lg text-slate-400 mt-3 lowercase font-semibold">{t('detailedServicesSubtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {addOnServices.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;