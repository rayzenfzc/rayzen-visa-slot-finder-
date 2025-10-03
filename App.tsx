import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Policies from './components/Policies';
import { LanguageProvider } from './contexts/LanguageContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { useNavigation } from './hooks/useNavigation';

const PageContent: React.FC = () => {
  const { currentPage } = useNavigation();

  if (currentPage === 'policies') {
    return <Policies />;
  }

  return (
    <>
      <Hero />
      <Chatbot />
      <main>
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
      </main>
    </>
  );
};


const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrandingProvider>
        <NavigationProvider>
          <div className="relative text-slate-200">
            <div className="gradient-bg"></div>
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow pt-20"> {/* Add padding top to account for fixed header */}
                 <PageContent />
              </div>
              <Footer />
            </div>
          </div>
        </NavigationProvider>
      </BrandingProvider>
    </LanguageProvider>
  );
};

export default App;