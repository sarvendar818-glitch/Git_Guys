'use client';

import AnimateOnScroll from './AnimateOnScroll';
import { useLang } from '@/context/LanguageContext';

const ProblemSection = () => {
  const { lang, t } = useLang();

  // Translated content for cards
  const problems = lang === 'en' ? [
    {
      stat: "40%",
      title: "Eligible citizens never receive benefits they deserve",
      desc: "Legacy systems and manual verification create a massive gap between scheme rollout and actual delivery to beneficiaries."
    },
    {
      stat: "₹2,000",
      title: "Max charged per application at Common Service Centres",
      desc: "Informal agents often overcharge vulnerable citizens, taking a significant cut of the very benefits they are meant to receive."
    },
    {
      stat: "800+",
      title: "Schemes exist but awareness gaps & digital illiteracy block the most vulnerable",
      desc: "Language barriers and complex documentation requirements ensure that those who need help most are the least likely to find it."
    }
  ] : [
    {
      stat: "40%",
      title: "पात्र नागरिकों को कभी वह लाभ नहीं मिलता जिसके वे हकदार हैं",
      desc: "पुरानी प्रणाली और मैन्युअल सत्यापन योजनाओं के शुरू होने और लाभार्थियों तक वास्तविक वितरण के बीच एक बड़ा अंतर पैदा करते हैं।"
    },
    {
      stat: "₹2,000",
      title: "सामान्य सेवा केंद्रों पर प्रति आवेदन अधिकतम शुल्क",
      desc: "अनौपचारिक एजेंट अक्सर कमजोर नागरिकों से अधिक शुल्क लेते हैं, उन लाभों का एक बड़ा हिस्सा लेते हैं जो उन्हें मिलने चाहिए।"
    },
    {
      stat: "800+",
      title: "योजनाएं मौजूद हैं लेकिन जागरूकता की कमी और डिजिटल निरक्षरता सबसे कमजोर लोगों को रोकती है",
      desc: "भाषा की बाधाएं और जटिल दस्तावेज़ीकरण आवश्यकताएं यह सुनिश्चित करती हैं कि जिन्हें मदद की सबसे अधिक आवश्यकता है, उनके उसे पाने की संभावना सबसे कम है।"
    }
  ];

  return (
    <section id="problem" className="py-24 bg-white border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <AnimateOnScroll animationClass="animate-fadeInDown">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 inline-block">
              {t.problemTitle}
              <div className="h-1.5 w-1/2 bg-secondary mx-auto mt-2 rounded-full" />
            </h2>
          </AnimateOnScroll>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <AnimateOnScroll key={i} animationClass="animate-fadeInUp" delay={`${i * 200}ms`}>
              <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all h-full border border-gray-100 border-l-[6px] border-l-secondary">
                <div className="text-5xl font-black text-secondary/30 mb-4">{problem.stat}</div>
                <h3 className="text-xl font-bold text-primary mb-4 leading-tight">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {problem.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
