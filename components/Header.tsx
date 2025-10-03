import React, { useState, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigation } from '../hooks/useNavigation';
import { useBranding } from '../hooks/useBranding';

const Header: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { scrollToSection } = useNavigation();
  const { logoSrc, setLogoSrc } = useBranding();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection (both drag-drop and click)
  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoSrc(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Click to upload
  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 border-b border-white/10 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          className="flex items-center gap-4 text-decoration-none text-inherit"
        >
          <div
            onClick={handleLogoClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-12 h-12 rounded-lg overflow-hidden cursor-pointer border-2 ${isDragging ? 'border-dashed border-blue-500' : 'border-transparent'} bg-transparent flex items-center justify-center transition-all duration-200`}
          >
            <img
              src={logoSrc}
              alt="Site Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <span className="text-xl font-bold text-slate-100">
            {t('headerTitle')}
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="text-slate-300 hover:text-white transition-colors font-semibold"
          >
            {t('home')}
          </a>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
            className="text-slate-300 hover:text-white transition-colors font-semibold"
          >
            {t('navServices')}
          </a>
          <a
            href="#apply"
            onClick={(e) => { e.preventDefault(); scrollToSection('apply'); }}
            className="text-slate-300 hover:text-white transition-colors font-semibold"
          >
            {t('navApply')}
          </a>
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="px-4 py-2 rounded-md border border-slate-600 bg-slate-800/50 text-slate-300 font-semibold cursor-pointer transition-all duration-200 hover:bg-slate-700/70 hover:border-slate-500"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;