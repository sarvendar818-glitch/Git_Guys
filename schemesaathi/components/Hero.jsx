'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

const Hero = () => {
  const { t } = useLang()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* White overlay — semi-transparent so image shows through */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />

      {/* Content layered above overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center animate-fadeIn">
        {/* Badge */}
        <div 
          className="animate-fadeIn opacity-0 border border-primary text-primary px-4 py-1.5 rounded-full text-xs md:text-sm font-black mb-8 bg-white/50 backdrop-blur-sm shadow-sm"
          style={{ animationDelay: '100ms' }}
        >
          {t.heroBadge}
        </div>

        {/* Main Heading */}
        <h1 
          className="animate-fadeInDown opacity-0 text-3xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight"
          style={{ animationDelay: '200ms' }}
        >
          {t.heroHeading}
        </h1>

        {/* Subtext */}
        <p 
          className="animate-fadeInUp opacity-0 text-base md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed font-medium"
          style={{ animationDelay: '400ms' }}
        >
          {t.heroSub}
        </p>

        {/* CTAs - Centered single button */}
        <div 
          className="animate-fadeInUp opacity-0 flex justify-center mb-16"
          style={{ animationDelay: '600ms' }}
        >
          <Link 
            href="#apply"
            className="bg-primary text-white px-10 py-5 rounded-full text-lg md:text-2xl font-black shadow-2xl hover:bg-green-700 transition-all hover:scale-105 active:scale-95 group flex items-center gap-3"
          >
            {t.heroCTA}
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>

        {/* Stat Pills */}
        <div 
          className="animate-fadeIn opacity-0 flex flex-wrap justify-center gap-4"
          style={{ animationDelay: '800ms' }}
        >
          {[t.stat1, t.stat2, t.stat3].map((stat, i) => (
            <div 
              key={i}
              className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50 flex items-center gap-2 group hover:shadow-primary/20 transition-all cursor-default"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="font-extrabold text-gray-800 tracking-tight text-sm md:text-base">✦ {stat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
// Single-button layout centered for maximum visual focus.
// Integrated with LanguageContext for English/Hindi support.
