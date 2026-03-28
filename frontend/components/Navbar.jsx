'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [appCount, setAppCount] = useState(0);
  const { lang, toggleLang, t } = useLang()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Read application count from localStorage
  useEffect(() => {
    const read = () => {
      try {
        const apps = JSON.parse(localStorage.getItem('ss_applications') || '[]');
        setAppCount(apps.length);
      } catch { setAppCount(0); }
    };
    read();
    window.addEventListener('storage', read);
    // Poll every 2s to catch updates from same tab
    const interval = setInterval(read, 2000);
    return () => { window.removeEventListener('storage', read); clearInterval(interval); };
  }, []);

  const navLinks = [
    { name: t.navHome, href: '#home' },
    { name: t.navHowItWorks, href: '#how-it-works' },
    { name: t.navWhoBenefits, href: '#who-benefits' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? 'shadow-md py-3' : 'shadow-sm py-4'
      } border-b border-gray-100 animate-fadeInDown`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold flex items-center shrink-0">
          <span className="text-primary font-poppins">Scheme</span>
          <span className="text-secondary font-poppins">Saathi</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-gray-700 font-bold hover:text-primary transition-colors relative group text-sm lg:text-base"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 border-2 border-primary text-primary font-bold px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-sm whitespace-nowrap"
            >
              <span>{lang === 'en' ? '🇮🇳' : '🇬🇧'}</span>
              <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* My Applications */}
            <Link
              href="/tracker"
              className="relative flex items-center gap-2 border-2 border-gray-200 text-gray-600 font-bold px-4 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all duration-300 text-sm whitespace-nowrap"
            >
              📊 My Applications
              {appCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {appCount}
                </span>
              )}
            </Link>

            <Link 
              href="#apply"
              className="bg-primary hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md group border-2 border-primary hover:border-green-700 text-sm whitespace-nowrap"
            >
              {t.navEligibility}
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Control */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 border border-primary text-primary font-bold px-3 py-1 rounded-full text-xs"
          >
            <span>{lang === 'en' ? '🇮🇳' : '🇬🇧'}</span>
            <span>{lang === 'en' ? 'HI' : 'EN'}</span>
          </button>
          
          <button 
            className="text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 absolute top-full left-0 w-full shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-4 px-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-gray-700 font-bold hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="#apply"
              className="bg-primary text-white px-6 py-3 rounded-full font-black text-center mt-2 shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.navEligibility}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
