'use client';

import { useState, useEffect, useRef } from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import { useLang } from '@/context/LanguageContext';

const CountUpNumber = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const startValue = 0;
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * (end - startValue) + startValue);
      setCount(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const ImpactStats = () => {
  const { lang, t } = useLang();

  const stats = lang === 'en' ? [
    { label: "India's Total Schemes", value: 875, suffix: "+", desc: "Central & State schemes" },
    { label: "Empowered Citizens", value: 120500, suffix: "+", desc: "Profiles created today" },
    { label: "Successful Applications", value: 45200, suffix: "+", desc: "Benefits successfully tracked" },
    { label: "Languages Supported", value: 12, suffix: "", desc: "Localized regional experience" }
  ] : [
    { label: "कुल भारतीय योजनाएं", value: 875, suffix: "+", desc: "केंद्र और राज्य योजनाएं" },
    { label: "सशक्त नागरिक", value: 120500, suffix: "+", desc: "आज बनाई गई प्रोफाइल" },
    { label: "सफल आवेदन", value: 45200, suffix: "+", desc: "सफलतापूर्वक ट्रैक किए गए लाभ" },
    { label: "समर्थित भाषाएं", value: 12, suffix: "", desc: "स्थानीय क्षेत्रीय अनुभव" }
  ];

  return (
    <section id="impact" className="py-24 bg-white border-y-[6px] border-primary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fadeInDown">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            {t.impactTitle}
          </h2>
          <div className="h-1.5 w-60 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={i} animationClass="animate-fadeIn" delay={`${i * 200}ms`}>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-black text-primary mb-3">
                  <CountUpNumber end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-xl font-bold text-gray-900 mb-4 inline-block relative px-2">
                  {stat.label}
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-secondary opacity-50 -z-10 group-hover:h-3 transition-all" />
                </div>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
