'use client';

import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';
import { useLang } from '@/context/LanguageContext';

const Footer = () => {
  const { lang, t } = useLang();

  const resources = lang === 'en' ? 
    ['Direct Benefit Transfer (DBT)', 'India Stack Overview', 'National Portal of India', 'Digital India Initiative', 'PM-KISAN Portal', 'Ujjwala Yojana Official'] :
    ['प्रत्यक्ष लाभ हस्तांतरण (DBT)', 'इंडिया स्टैक अवलोकन', 'भारत का राष्ट्रीय पोर्टल', 'डिजिटल इंडिया पहल', 'PM-किसान पोर्टल', 'उज्ज्वला योजना आधिकारिक'];

  const aboutSub = lang === 'en' ? 
    'SchemeSaathi is a revolutionary AI-driven platform dedicated to connecting every Indian citizen with the government benefits they deserve. Our mission is to bridge the digital divide and ensure transparency in welfare delivery.' :
    'SchemeSaathi एक क्रांतिकारी AI-संचालित मंच है जो प्रत्येक भारतीय नागरिक को उनके हक के सरकारी लाभों से जोड़ने के लिए समर्पित है। हमारा मिशन डिजिटल विभाजन को पाटना और कल्याण वितरण में पारदर्शिता सुनिश्चित करना है।';

  return (
    <footer className="bg-gray-950 text-white pt-20 pb-12 overflow-hidden overflow-y-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll animationClass="animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            {/* Column 1: About */}
            <div className="flex flex-col space-y-6">
              <Link href="/" className="text-3xl font-black flex items-center mb-4">
                <span className="text-primary font-poppins">Scheme</span>
                <span className="text-secondary font-poppins">Saathi</span>
              </Link>
              <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
                {aboutSub}
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-xl">𝕏</div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-xl">f</div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-xl font-bold">in</div>
              </div>
            </div>

            {/* Column 2: Resources */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-black border-l-4 border-secondary pl-4 text-white uppercase tracking-widest">
                {lang === 'en' ? 'Resources' : 'संसाधन'}
              </h3>
              <ul className="space-y-4">
                {resources.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 font-medium hover:text-secondary transition-colors inline-block group">
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-xl font-black border-l-4 border-primary pl-4 text-white uppercase tracking-widest">
                {lang === 'en' ? 'Connect' : 'संपर्क'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-400 group cursor-pointer hover:bg-white/5 p-3 rounded-xl transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">📧</span>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-black text-gray-500">
                      {lang === 'en' ? 'Email Us' : 'हमें ईमेल करें'}
                    </p>
                    <p className="font-bold text-white text-lg">contact@schemesaathi.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400 group cursor-pointer hover:bg-white/5 p-3 rounded-xl transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">📍</span>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-black text-gray-500">
                      {lang === 'en' ? 'Global HQ' : 'वैश्विक मुख्यालय'}
                    </p>
                    <p className="font-bold text-white text-lg font-poppins">New Delhi, Bharat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="pt-12 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-gray-500 font-bold text-sm text-center md:text-left gap-6">
          <p>© 2025 SchemeSaathi | {lang === 'en' ? 'Empowering 1.4 Billion Strong Bharat' : '1.4 बिलियन सशक्त भारत को सशक्त बनाना'}</p>
          <div className="flex items-center gap-2 text-white">
            {lang === 'en' ? 'Made with' : 'बनाया गया'} <span className="text-red-600 text-xl animate-pulse">❤️</span> {lang === 'en' ? 'for' : 'के लिए'} <span className="bg-gradient-to-r from-orange-400 via-white to-green-600 bg-clip-text text-transparent font-black px-1">Bharat</span>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}</Link>
            <Link href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Terms of Service' : 'सेवा की शर्तें'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
