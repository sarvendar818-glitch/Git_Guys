'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { matchSchemes } from '@/lib/matchSchemes';
import AnimateOnScroll from './AnimateOnScroll';
import ApplicationModal from '@/components/ApplicationModal';

const EligibilityForm = () => {
  const { lang, t } = useLang();
  
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    category: '',
    gender: '',
    incomeMode: 'select',
    incomeRange: '',
    manualIncome: '',
    familySize: '',
    isWidow: false,
    occupation: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleApplyNow = (scheme) => {
    setSelectedScheme(scheme);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedScheme(null);
    document.body.style.overflow = 'unset';
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate short processing delay
    setTimeout(() => {
      const matched = matchSchemes(formData);
      setResults(matched);
      setSubmitted(true);
      setIsLoading(false);
      setActiveFilter('All');
      
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setResults([]);
    // Optionally scroll back up
    window.scrollTo({ top: document.getElementById('apply').offsetTop - 100, behavior: 'smooth' });
  };

  return (
    <section id="apply" className="py-24 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fadeInDown">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-poppins">
            {t.formTitle}
          </h2>
          <div className="h-1.5 w-60 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          {!submitted ? (
            <AnimateOnScroll animationClass="animate-fadeInUp">
              <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-100 group hover:shadow-primary/10 transition-all duration-500">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* STEP 3.A-D - Update Form Fields */}
                  {/* Username Field */}
                  <div className="mb-5">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                       👤 {t.formName}
                    </label>
                    <input
                      type="text"
                      placeholder={t.formNamePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* State Dropdown */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        📍 {t.formState}
                      </label>
                      <select 
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                        required
                      >
                        <option value="">{lang === 'en' ? 'Select State' : 'राज्य चुनें'}</option>
                        {states.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        📋 {t.formCategory}
                      </label>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        {['General', 'OBC', 'SC', 'ST'].map((cat) => (
                          <label key={cat} className={`flex items-center gap-1.5 p-2.5 border rounded-lg cursor-pointer transition-all ${formData.category === cat ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-gray-200'}`}>
                            <input 
                              type="radio" 
                              name="category" 
                              value={cat} 
                              className="hidden"
                              checked={formData.category === cat}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              required
                            />
                            <span className="font-bold text-[13px] tracking-tight">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gender Field */}
                   <div className="mb-5">
                    <label className="block text-sm font-bold text-gray-700 mb-2">⚧ {t.formGender}</label>
                    <div className="flex gap-4">
                      {['Male', 'Female', 'Other'].map((g) => (
                        <label key={g} className={`flex items-center gap-2 cursor-pointer p-3 border rounded-xl transition-all ${formData.gender === g ? 'bg-primary/20 border-primary text-primary font-black scale-105' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-primary/30'}`}>
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value, isWidow: false })}
                            className="hidden"
                            required
                          />
                          <span className="text-sm font-bold">{lang === 'hi' ? (g === 'Male' ? 'पुरुष' : g === 'Female' ? 'महिला' : 'अन्य') : g}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Widow Toggle */}
                  {formData.gender === 'Female' && (
                    <div className="mb-5 animate-fadeIn">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        👰 {t.formIsWidow}
                      </label>
                      <div className="flex gap-6">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-all ${formData.isWidow === (opt === 'Yes') ? 'text-primary font-bold' : 'text-gray-500'}`}>
                            <input
                              type="radio"
                              name="isWidow"
                              style={{ width: '1.25rem', height: '1.25rem' }}
                              value={opt}
                              checked={formData.isWidow === (opt === 'Yes')}
                              onChange={() => setFormData({ ...formData, isWidow: opt === 'Yes' })}
                              className="accent-primary"
                            />
                            <span className="text-sm">{opt === 'Yes' ? t.formWidowYes : t.formWidowNo}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Income Toggle & Field */}
                  <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      💰 {t.formIncome}
                    </label>
                    
                    <div className="flex gap-3 mb-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, incomeMode: 'select' })}
                        className={`text-xs md:text-sm px-5 py-2.5 rounded-full border-2 transition-all font-black uppercase tracking-tight ${
                          formData.incomeMode === 'select'
                            ? 'bg-primary text-white border-primary shadow-xl rotate-1'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-primary'
                        }`}
                      >
                        {t.selectRange}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, incomeMode: 'manual' })}
                        className={`text-xs md:text-sm px-5 py-2.5 rounded-full border-2 transition-all font-black uppercase tracking-tight ${
                          formData.incomeMode === 'manual'
                            ? 'bg-primary text-white border-primary shadow-xl -rotate-1'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-primary'
                        }`}
                      >
                        {t.enterManually}
                      </button>
                    </div>

                    {formData.incomeMode === 'select' ? (
                      <select 
                        value={formData.incomeRange}
                        onChange={(e) => setFormData({ ...formData, incomeRange: e.target.value })}
                        className="w-full bg-white border-2 border-primary/20 rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-black text-lg shadow-sm"
                        required={formData.incomeMode === 'select'}
                      >
                        <option value="">{t.selectRange}</option>
                        <option>Below ₹1 Lakh</option>
                        <option>₹1 Lakh - ₹3 Lakh</option>
                        <option>₹3 Lakh - ₹5 Lakh</option>
                        <option>Above ₹5 Lakh</option>
                      </select>
                    ) : (
                      <>
                        <input
                          type="number"
                          placeholder={t.incomePlaceholder}
                          min="0"
                          value={formData.manualIncome}
                          onChange={(e) => setFormData({ ...formData, manualIncome: e.target.value })}
                          className="border-2 border-primary/20 rounded-xl px-4 py-4 w-full focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-black text-lg shadow-sm"
                          required={formData.incomeMode === 'manual'}
                        />
                        <p className="text-xs text-gray-400 mt-2 italic font-bold">*{t.incomePlaceholder}</p>
                      </>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                         💼 {t.formOccupation}
                      </label>
                      <select 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        required
                      >
                        <option value="">{t.formOccupation}</option>
                        <option>{lang === 'en' ? 'Farmer' : 'किसान'}</option>
                        <option>{lang === 'en' ? 'Student' : 'छात्र'}</option>
                        <option>{lang === 'en' ? 'Private Job' : 'प्राइवेट जॉब'}</option>
                        <option>{lang === 'en' ? 'Self Employed' : 'स्वरोजगार'}</option>
                        <option>{lang === 'en' ? 'Unemployed' : 'बेरोजगार'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                         👨‍👩‍👧‍👦 {t.formFamily}
                      </label>
                      <input 
                        type="number" 
                        placeholder="e.g. 5" 
                        min="1"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" 
                        value={formData.familySize}
                        onChange={(e) => setFormData({ ...formData, familySize: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-green-700 text-white py-5 rounded-xl text-2xl font-black shadow-2xl hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center gap-4 mt-6 border-b-8 border-green-900"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full" />
                        {lang === 'hi' ? 'मिलान किया जा रहा है...' : 'MATCHING PROFILE...'}
                      </>
                    ) : t.formSubmit}
                  </button>
                </form>
              </div>
            </AnimateOnScroll>
          ) : (
            /* STEP 4 - Full Results Display UI */
            <AnimatePresence>
              <motion.div
                id="results-section"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-12"
              >
                {/* Results Header */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-block bg-primary/10 px-8 py-4 rounded-3xl border-2 border-primary/20 mb-6"
                  >
                    <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight font-poppins">
                      {results.length > 0
                        ? `🎉 ${results.length} ${t.resultsFound} ${formData.name || 'You'}!`
                        : t.resultsNone}
                    </h3>
                  </motion.div>
                  {results.length > 0 && (
                    <p className="text-gray-500 mt-2 text-xl font-bold italic">
                      {lang === 'en' ? 'Based on your unique profile details' : 'आपके विशिष्ट प्रोफ़ाइल विवरण के आधार पर'}
                    </p>
                  )}
                </div>

                {/* Category Filter Tabs */}
                {results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                  >
                    {['All', ...new Set(results.map(s => s.category))].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-8 py-3 rounded-full text-base font-black border-4 transition-all duration-300 ${
                          activeFilter === cat
                            ? 'bg-primary text-white border-primary shadow-2xl rotate-2 scale-110'
                            : 'bg-white text-gray-600 border-gray-100 hover:border-primary/50 hover:bg-gray-50'
                        }`}
                      >
                        {cat === 'All' ? t.filterAll : cat}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Scheme Cards Grid */}
                {results.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                    layout
                  >
                    {results
                      .filter(s => activeFilter === 'All' || s.category === activeFilter)
                      .map((scheme, i) => (
                        <motion.div
                          key={scheme.scheme_name}
                          layout
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -12, scale: 1.02 }}
                          className="bg-white rounded-3xl shadow-2xl border-2 border-gray-50 p-8 flex flex-col gap-6 transition-all duration-500 relative overflow-hidden group"
                        >
                          {/* Accent line */}
                          <div className="absolute top-0 left-0 w-full h-3 bg-primary group-hover:h-5 transition-all" />
                          
                          {/* Top Row */}
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="text-3xl font-black text-gray-900 leading-tight">
                              {scheme.scheme_name}
                            </h4>
                            <span className="shrink-0 bg-green-500 text-white text-[10px] font-black px-4 py-2 rounded-full border-b-4 border-green-800 shadow-xl uppercase animate-pulse">
                              {t.eligibleBadge}
                            </span>
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2">
                             <span className="bg-orange-100 text-secondary text-xs font-black px-5 py-1.5 rounded-full border-2 border-secondary/20 shadow-sm uppercase">
                              {scheme.category}
                            </span>
                             <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-gray-200 uppercase tracking-widest">
                               {scheme.ministry}
                            </span>
                          </div>

                          {/* Benefit Amount */}
                          <div className="bg-primary/5 rounded-3xl px-6 py-5 flex items-center gap-5 border-2 border-primary/10 group-hover:bg-primary/10 transition-colors">
                            <span className="text-4xl">💰</span>
                            <div>
                              <p className="text-[10px] text-primary/60 font-black uppercase tracking-[0.2em] mb-1">{t.benefitLabel}</p>
                              <p className="text-xl font-black text-gray-900">{scheme.benefit_amount}</p>
                            </div>
                          </div>

                          {/* Why Eligible */}
                          <div className="bg-green-50 rounded-2xl px-6 py-5 flex items-start gap-4 border-2 border-green-100 relative">
                             <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md border border-green-200">
                                <span className="text-lg">✅</span>
                             </div>
                            <p className="text-[15px] text-green-900 font-bold leading-relaxed pl-2">{scheme.why_eligible}</p>
                          </div>

                          {/* Application Instructions */}
                          <div className="flex items-start gap-5 p-2 mt-2">
                            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl shadow-inner group-hover:bg-white transition-colors">📋</div>
                            <div>
                               <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] mb-1">{lang === 'hi' ? 'आवेदन कैसे करें' : 'APPLICATION STEPS'}</p>
                               <p className="text-sm text-gray-600 font-bold leading-relaxed">{scheme.how_to_apply}</p>
                            </div>
                          </div>

                          {/* Action Button */}
                          <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(19,136,8,0.35)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApplyNow(scheme)}
                            className="mt-4 w-full bg-primary text-white font-black py-4 rounded-2xl shadow-2xl shadow-primary/30 hover:bg-green-700 transition-all duration-300 text-xl flex justify-center items-center gap-3 border-b-4 border-green-900"
                          >
                            {t.applyNow}
                          </motion.button>
                        </motion.div>
                      ))}
                  </motion.div>
                ) : (
                  /* No results message */
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-24 bg-white rounded-[40px] border-4 border-dashed border-gray-100 shadow-inner"
                  >
                    <div className="text-[120px] mb-8 animate-bounce">😟</div>
                    <p className="text-4xl font-black text-gray-800 mb-4">{t.resultsNone}</p>
                    <p className="text-gray-400 font-bold text-xl mb-12 max-w-lg mx-auto leading-relaxed">
                      {lang === 'en' 
                        ? 'We couldn\'t find any programs matching your current inputs. Try selecting different options or lowering the income.' 
                        : 'हमें आपके वर्तमान इनपुट से मेल खाने वाला कोई कार्यक्रम नहीं मिला। विभिन्न विकल्पों का चयन करने या आय कम करने का प्रयास करें।'}
                    </p>
                    <button
                      onClick={handleReset}
                      className="bg-secondary text-white px-12 py-5 rounded-full font-black shadow-2xl hover:scale-110 transition-all text-2xl border-b-8 border-orange-700 rotate-1 shadow-orange-500/30"
                    >
                      {t.editProfile}
                    </button>
                  </motion.div>
                )}

                {/* Reset Footer */}
                <div className="text-center mt-20 pt-16 border-t-2 border-gray-50">
                  <button
                    onClick={handleReset}
                    className="group relative inline-flex items-center justify-center px-12 py-4 font-black text-primary transition-all duration-500 bg-white border-4 border-primary rounded-full hover:bg-primary hover:text-white shadow-xl hover:-translate-y-2"
                  >
                    <span className="mr-3 transition-transform group-hover:-translate-x-2">←</span>
                    <span className="text-xl uppercase tracking-tighter">{t.searchAgain}</span>
                  </button>
                  <p className="text-gray-300 mt-6 font-black uppercase tracking-[0.3em] text-[10px]">© 2025 SchemeSaathi AI Engine v2.0</p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Application Processing Modal */}
      <AnimatePresence>
        {showModal && selectedScheme && (
          <ApplicationModal
            scheme={selectedScheme}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default EligibilityForm;
