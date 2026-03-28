'use client';

import AnimateOnScroll from './AnimateOnScroll';
import { useLang } from '@/context/LanguageContext';

const SolutionSection = () => {
  const { lang, t } = useLang();

  const solutions = lang === 'en' ? [
    {
      title: "🤖 AI That Knows Every Scheme",
      desc: "Our AI engine digests 800+ schemes across central, state & local governments, matching them to your unique profile in seconds."
    },
    {
      title: "📄 Zero Document Hassle",
      desc: "Upload once. Our system automatically fills forms, formats documents, and submits applications on your behalf."
    },
    {
      title: "📲 End-to-End Transparency",
      desc: "Track every step of your application on your dashboard. Receive real-time status updates via WhatsApp & SMS."
    }
  ] : [
    {
      title: "🤖 AI जो हर योजना को जानता है",
      desc: "हमारा AI इंजन केंद्र, राज्य और स्थानीय सरकारों की 800+ योजनाओं का विश्लेषण करता है, उन्हें सेकंडों में आपकी प्रोफ़ाइल से मिलाता है।"
    },
    {
      title: "📄 जीरो डॉक्यूमेंट परेशानी",
      desc: "एक बार अपलोड करें। हमारा सिस्टम स्वचालित रूप से फॉर्म भरता है, दस्तावेजों को प्रारूपित करता है और आपकी ओर से आवेदन जमा करता है।"
    },
    {
      title: "📲 एंड-टू-एंड पारदर्शिता",
      desc: "अपने डैशबोर्ड पर अपने आवेदन के हर चरण को ट्रैक करें। व्हाट्सएप और एसएमएस के माध्यम से रीयल-टाइम स्थिति अपडेट प्राप्त करें।"
    }
  ];

  return (
    <section id="solution" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <AnimateOnScroll animationClass="animate-fadeIn">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 inline-block mb-4">
              {t.solutionTitle}
            </h2>
          </AnimateOnScroll>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {solutions.map((sol, i) => (
            <AnimateOnScroll 
              key={i} 
              animationClass={i % 2 === 0 ? "animate-fadeInLeft" : "animate-fadeInRight"} 
              delay={`${i * 150}ms`}
            >
              <div className="bg-white rounded-3xl shadow-xl p-10 border-t-[8px] border-t-primary hover:scale-105 transition-all duration-300 h-full group">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-primary transition-colors">
                  {sol.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  {sol.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
