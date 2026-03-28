'use client';

import AnimateOnScroll from './AnimateOnScroll';
import { useLang } from '@/context/LanguageContext';

const WhoBenefits = () => {
  const { lang, t } = useLang();

  const groups = lang === 'en' ? [
    {
      emoji: "🚜",
      group: "Small Farmers",
      schemes: [
        "PM-KISAN (Income Support)",
        "Fasal Bima Yojana (Insurance)",
        "Kisan Credit Card (Low Interest Loans)",
        "Soil Health Card Scheme"
      ]
    },
    {
      emoji: "👩‍🌾",
      group: "Rural Women",
      schemes: [
        "Ujjwala Yojana (Free LPG)",
        "Sukanya Samriddhi Yojana (Savings)",
        "Maternity Benefit Scheme",
        "Lakhpati Didi (Self-Help Groups)"
      ]
    },
    {
      emoji: "🎓",
      group: "Students & Youth",
      schemes: [
        "Post-Matric Scholarships",
        "PM Kaushal Vikas Yojana",
        "Mudra Loans (Startup Support)",
        "Digital India Fellowships"
      ]
    }
  ] : [
    {
      emoji: "🚜",
      group: "छोटे किसान",
      schemes: [
        "PM-किसान (आय सहायता)",
        "फसल बीमा योजना (बीमा)",
        "किसान क्रेडिट कार्ड (कम ब्याज ऋण)",
        "मृदा स्वास्थ्य कार्ड योजना"
      ]
    },
    {
      emoji: "👩‍🌾",
      group: "ग्रामीण महिलाएं",
      schemes: [
        "उज्ज्वला योजना (निःशुल्क एलपीजी)",
        "सुकन्या समृद्धि योजना (बचत)",
        "मातृत्व लाभ योजना",
        "लखपति दीदी (स्वयं सहायता समूह)"
      ]
    },
    {
      emoji: "🎓",
      group: "छात्र और युवा",
      schemes: [
        "पोस्ट-मैट्रिक छात्रवृत्ति",
        "PM कौशल विकास योजना",
        "मुद्रा ऋण (स्टार्टअप सहायता)",
        "डिजिटल इंडिया फेलोशिप"
      ]
    }
  ];

  return (
    <section id="who-benefits" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <AnimateOnScroll animationClass="animate-fadeInDown">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 font-poppins">
              {t.benefitsTitle}
            </h2>
            <div className="h-1.5 w-48 bg-secondary mx-auto rounded-full" />
          </AnimateOnScroll>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {groups.map((group, i) => (
            <AnimateOnScroll 
              key={i} 
              animationClass="animate-fadeInUp" 
              delay={`${i * 150}ms`}
            >
              <div className="bg-white rounded-3xl shadow-xl p-10 h-full group hover:-translate-y-2 transition-transform duration-300">
                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform inline-block">{group.emoji}</div>
                <h3 className="text-2xl font-bold text-primary mb-6">{group.group}</h3>
                <ul className="space-y-4">
                  {group.schemes.map((scheme, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-600 font-medium">
                      <span className="text-secondary mt-1">✓</span>
                      {scheme}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoBenefits;
