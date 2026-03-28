'use client';

import AnimateOnScroll from './AnimateOnScroll';
import { useLang } from '@/context/LanguageContext';

const HowItWorks = () => {
  const { lang, t } = useLang();

  const steps = lang === 'en' ? [
    { title: "One-Click Profile", desc: "Build your citizen profile quickly in any of 12 regional languages." },
    { title: "AI Eligibility Search", desc: "Our engine scans 800+ schemes to find your exact entitlement." },
    { title: "Smart Application", desc: "Automatically fill and submit complex government forms." },
    { title: "Instant Tracking", desc: "Monitor application progress via WhatsApp & SMS notifications." },
    { title: "Benefit Realization", desc: "Funds transferred directly to your account with zero middlemen." }
  ] : [
    { title: "एक-क्लिक प्रोफाइल", desc: "किसी भी 12 क्षेत्रीय भाषाओं में अपनी नागरिक प्रोफ़ाइल शीघ्रता से बनाएं।" },
    { title: "AI पात्रता खोज", desc: "हमारा इंजन आपकी सटीक पात्रता खोजने के लिए 800+ योजनाओं को स्कैन करता है।" },
    { title: "स्मार्ट आवेदन", desc: "जटिल सरकारी फॉर्म स्वतः भरें और जमा करें।" },
    { title: "तत्काल ट्रैकिंग", desc: "व्हाट्सएप और एसएमएस सूचनाओं के माध्यम से आवेदन की प्रगति की निगरानी करें।" },
    { title: "लाभ प्राप्ति", desc: "बिना किसी बिचौलिये के सीधे आपके खाते में धनराशि स्थानांतरित।" }
  ];

  return (
    <section id="how-it-works" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fadeInDown">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            {t.stepsTitle}
          </h2>
          <div className="h-1.5 w-60 bg-primary mx-auto rounded-full" />
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:flex justify-between relative mb-20">
          {/* Horizontal Line */}
          <div className="absolute top-[32px] left-[50px] right-[50px] h-[3px] bg-primary/20 -z-10" />
          
          {steps.map((step, i) => (
            <AnimateOnScroll 
              key={i} 
              animationClass="animate-fadeInUp" 
              delay={`${i * 150}ms`}
            >
              <div className="flex flex-col items-center text-center px-4 max-w-[200px]">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-xl border-4 border-white group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">{step.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{step.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="lg:hidden flex flex-col space-y-12">
          {steps.map((step, i) => (
            <AnimateOnScroll 
              key={i} 
              animationClass="animate-fadeInLeft" 
              delay={`${i * 100}ms`}
            >
              <div className="flex items-start gap-6 relative">
                {/* Connecting Line */}
                {i < steps.length - 1 && (
                  <div className="absolute top-14 left-[27px] w-1 h-20 bg-primary/20" />
                )}
                <div className="w-14 h-14 shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg z-10">
                  {i + 1}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
