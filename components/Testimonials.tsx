import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => (
    <div className="glass-card p-8 rounded-2xl h-full flex flex-col justify-between">
        <p className="text-slate-300 italic text-lg mb-6 leading-relaxed lowercase font-semibold">"{quote}"</p>
        <p className="font-bold text-purple-300 text-md self-end">- {author}</p>
    </div>
);


const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider">{t('testimonialsTitle')}</h2>
          <p className="text-lg text-slate-400 mt-3 lowercase font-semibold">{t('testimonialsSubtitle')}</p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TestimonialCard
            quote={t('testimonial1Quote')}
            author={t('testimonial1Author')}
          />
          <TestimonialCard
            quote={t('testimonial2Quote')}
            author={t('testimonial2Author')}
          />
          <TestimonialCard
            quote={t('testimonial3Quote')}
            author={t('testimonial3Author')}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;