'use client';

import AnimateOnScroll from './AnimateOnScroll';
import { useLang } from '@/context/LanguageContext';

const BusinessModel = () => {
  const { lang, t } = useLang();

  const highlights = lang === 'en' ? [
    { emoji: "💵", label: "Transparent Fee", desc: "No hidden charges. A simple ₹50/Application fee only upon submission." },
    { emoji: "🚀", label: "Massive Scale", desc: "Targeting 50M+ applications annually across 28 states & 8 UTs." },
    { emoji: "📈", label: "Revenue Growth", desc: "Estimated ₹250 Crore annual revenue by year 3 of operation." }
  ] : [
    { emoji: "💵", label: "पारदर्शी शुल्क", desc: "कोई छिपा हुआ शुल्क नहीं। जमा करने पर केवल ₹50/आवेदन का सरल शुल्क।" },
    { emoji: "🚀", label: "बड़े स्तर पर विस्तार", desc: "28 राज्यों और 8 केंद्र शासित प्रदेशों में सालाना 5 करोड़+ आवेदनों का लक्ष्य।" },
    { emoji: "📈", label: "राजस्व वृद्धि", desc: "संचालन के तीसरे वर्ष तक ₹250 करोड़ वार्षिक राजस्व का अनुमान।" }
  ];

  const statCards = lang === 'en' ? [
    { val: "₹50", title: "Per Successful Application", sub: "via B2G Government Contract" },
    { val: "50M+", title: "Target Applications Per Year", sub: "Scalable across all Indian states" },
    { val: "₹250 Cr", title: "Projected Annual Revenue", sub: "Based on government partnership model" }
  ] : [
    { val: "₹50", title: "प्रति सफल आवेदन", sub: "B2G सरकारी अनुबंध के माध्यम से" },
    { val: "5 करोड़+", title: "प्रति वर्ष लक्षित आवेदन", sub: "सभी भारतीय राज्यों में विस्तार संभव" },
    { val: "₹250 करोड़", title: "अनुमानित वार्षिक राजस्व", sub: "सरकारी भागीदारी मॉडल पर आधारित" }
  ];

  return (
    <section id="business-model" className="py-24 bg-white overflow-hidden font-poppins">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fadeInDown">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            {t.businessTitle}
          </h2>
          <div className="h-1.5 w-60 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column - Highlight Boxes */}
          <div className="lg:w-1/2 flex flex-col space-y-8 h-full">
            {highlights.map((highlight, i) => (
              <AnimateOnScroll key={i} animationClass="animate-fadeInLeft" delay={`${i * 300}ms`}>
                <div className="bg-gray-50 border-l-[6px] border-l-primary rounded-xl p-8 hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="flex items-center gap-6">
                    <div className="text-4xl group-hover:scale-110 transition-transform">{highlight.emoji}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors">
                        {highlight.label}
                      </h3>
                      <p className="text-gray-600 font-medium leading-relaxed">
                        {highlight.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Right Column - CLEAN STAT CARDS replaces Pyramid */}
          <div className="lg:w-1/2 flex flex-col space-y-4 w-full">
            {statCards.map((card, i) => (
              <AnimateOnScroll key={i} animationClass="animate-fadeInRight" delay={`${(i + 1) * 300}ms`}>
                <div className="bg-white border-l-4 border-primary rounded-2xl shadow-md p-6 flex items-center gap-6 group hover:shadow-xl transition-all border border-gray-100">
                  <div className="text-4xl font-black text-primary min-w-[120px] group-hover:scale-110 transition-transform">{card.val}</div>
                  <div>
                    <p className="font-extrabold text-gray-800 text-lg group-hover:text-primary transition-colors">{card.title}</p>
                    <p className="text-gray-500 text-sm font-bold">{card.sub}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;
// Pyramid removed and replaced with clean vertical stat cards.
// Full translation support for both columns.
