import React, { createContext, useState, ReactNode, useEffect } from 'react';

const DEFAULT_LOGO = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHJ4PSI4IiBmaWxsPSIjODc1NWZmIj48L3JlY3Q+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIzMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSI+UjwvdGV4dD48L3N2Zz4=';

interface BrandingContextType {
  logoSrc: string;
  setLogoSrc: (src: string | null) => void;
}

export const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logoSrc, setLogoSrc] = useState<string>(DEFAULT_LOGO);

  useEffect(() => {
    const savedLogo = localStorage.getItem('siteLogo');
    if (savedLogo) {
      setLogoSrc(savedLogo);
    }
  }, []);

  const handleSetLogo = (src: string | null) => {
    if (src) {
      setLogoSrc(src);
      localStorage.setItem('siteLogo', src);
    } else {
      setLogoSrc(DEFAULT_LOGO);
      localStorage.removeItem('siteLogo');
    }
  };

  return (
    <BrandingContext.Provider value={{ logoSrc, setLogoSrc: handleSetLogo }}>
      {children}
    </BrandingContext.Provider>
  );
};