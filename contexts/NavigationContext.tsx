import React, { createContext, useState, ReactNode, useCallback } from 'react';

export type Page = 'home' | 'policies';
export type SectionId = 'home' | 'services' | 'how-it-works' | 'why-us' | 'testimonials' | 'apply';


interface NavigationContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  scrollToSection: (sectionId: SectionId) => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  }, []);

  const scrollToSection = useCallback((sectionId: SectionId) => {
    const doScroll = () => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 90; // Approximate height of the fixed header in pixels
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    };

    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(doScroll, 100);
    } else {
      doScroll();
    }
  }, [currentPage, navigateTo]);


  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, scrollToSection }}>
      {children}
    </NavigationContext.Provider>
  );
};