'use client'
import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLang } from '@/context/LanguageContext'

export default function ApplicationModal({ scheme, onClose, citizenProfile }) {
  const { lang, t } = useLang()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [isFinished, setIsFinished] = useState(false)

  // Generate tracking ID + random progress once on mount
  const trackingId = useMemo(() => {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
    const stateCode = (citizenProfile?.state || 'IN').substring(0, 2).toUpperCase()
    return `SS-${stateCode}-${rand}-${new Date().getFullYear()}`
  }, [])

  // Random progress: 30, 70, or 100
  const progress = useMemo(() => [30, 70, 100][Math.floor(Math.random() * 3)], [])

  // Save to localStorage when finished
  useEffect(() => {
    if (!isFinished) return
    try {
      const existing = JSON.parse(localStorage.getItem('ss_applications') || '[]')
      const alreadySaved = existing.some(a => a.trackingId === trackingId)
      if (alreadySaved) return
      const newApp = {
        trackingId,
        progress,
        scheme_name: scheme?.scheme_name || '',
        ministry: scheme?.ministry || '',
        benefit_amount: scheme?.benefit_amount || '',
        category: scheme?.category || '',
        how_to_apply: scheme?.how_to_apply || '',
        applied_at: new Date().toISOString(),
        profile: {
          name: citizenProfile?.name || 'Citizen',
          state: citizenProfile?.state || '',
          category: citizenProfile?.category || '',
          gender: citizenProfile?.gender || '',
          occupation: citizenProfile?.occupation || '',
          familySize: citizenProfile?.familySize || '',
          isWidow: citizenProfile?.isWidow || false,
        }
      }
      existing.push(newApp)
      localStorage.setItem('ss_applications', JSON.stringify(existing))
    } catch (err) {
      console.error('Failed to save application', err)
    }
  }, [isFinished])

  const STEPS = [
    {
      id: 1,
      icon: '📋',
      title: t.modalStep1Title,
      subtitle: t.modalStep1Sub,
      duration: 2500,
    },
    {
      id: 2,
      icon: '🔐',
      title: t.modalStep2Title,
      subtitle: t.modalStep2Sub,
      duration: 2500,
    },
    {
      id: 3,
      icon: '✅',
      title: t.modalStep3Title,
      subtitle: t.modalStep3Sub,
      duration: null,
    },
  ]

  // Auto-advance through steps
  useEffect(() => {
    let timeout
    if (currentStep < STEPS.length - 1) {
      timeout = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep])
        setCurrentStep(prev => prev + 1)
      }, STEPS[currentStep].duration)
    } else {
      timeout = setTimeout(() => setIsFinished(true), 800)
    }
    return () => clearTimeout(timeout)
  }, [currentStep])

  // Escape key closes only after finished
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isFinished) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isFinished, onClose])

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => { if (isFinished) onClose() }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      >
        {/* Modal Card — stop click propagation */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
        >
          {/* Top green accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-green-400 to-secondary rounded-t-3xl" />

          {/* Scheme Name Header */}
          <div className="mb-6 text-center">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              {t.modalApplyingFor}
            </span>
            <h3 className="text-base font-extrabold text-gray-900 mt-1 leading-snug">
              {scheme?.scheme_name}
            </h3>
          </div>

          {/* Steps List */}
          <div className="flex flex-col gap-5 mb-8">
            {STEPS.map((step, index) => {
              const isCompleted = completedSteps.includes(index)
              const isActive = currentStep === index
              const isPending = index > currentStep

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start gap-4"
                >
                  {/* Step Icon / Tick / Spinner */}
                  <div
                    className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
                    style={{
                      backgroundColor: isCompleted
                        ? '#dcfce7'
                        : isActive
                        ? '#f0fdf4'
                        : '#f3f4f6',
                    }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                        className="text-primary text-xl font-black"
                      >
                        ✓
                      </motion.div>
                    ) : isActive ? (
                      index === STEPS.length - 1 ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 280 }}
                          className="text-xl"
                        >
                          {step.icon}
                        </motion.span>
                      ) : (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                        />
                      )
                    ) : (
                      <span className="text-gray-400 text-lg">{step.icon}</span>
                    )}
                  </div>

                  {/* Step Text */}
                  <div className="pt-1 flex-1">
                    <p
                      className={`font-bold text-sm leading-tight ${
                        isCompleted
                          ? 'text-primary'
                          : isActive
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </p>
                    {(isActive || isCompleted) && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs text-gray-500 mt-0.5 leading-relaxed"
                      >
                        {step.subtitle}
                      </motion.p>
                    )}
                  </div>

                  {/* Completed badge on right */}
                  {isCompleted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="ml-auto shrink-0 bg-green-100 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-green-200"
                    >
                      {t.modalDone}
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-primary to-green-400"
              initial={{ width: '0%' }}
              animate={{
                width:
                  currentStep === 0
                    ? '33%'
                    : currentStep === 1
                    ? '66%'
                    : '100%',
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          {/* Bottom Section — changes based on state */}
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-xs text-gray-400 font-medium animate-pulse">
                  {t.modalWaiting}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="text-center"
              >
                {/* Big success tick */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                >
                  <span className="text-3xl text-primary font-black">✓</span>
                </motion.div>

                {/* Confetti ping rings */}
                <div className="relative w-16 h-16 mx-auto -mt-16 mb-3 pointer-events-none">
                  <span className="absolute inset-0 rounded-full bg-green-300 opacity-20 animate-ping" />
                </div>

                <h4 className="text-xl font-extrabold text-gray-900 mb-1">
                  {t.modalSuccess}
                </h4>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  {lang === 'en'
                    ? 'Your application is saved. Track its progress anytime from your dashboard.'
                    : 'आपका आवेदन सुरक्षित है। अपने डैशबोर्ड से कभी भी प्रगति ट्रैक करें।'
                  }
                </p>

                {/* Tracking ID */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5">
                  <p className="text-xs text-gray-400 font-medium mb-1">
                    {t.modalTrackingId}
                  </p>
                  <p className="text-sm font-mono font-bold text-gray-800 tracking-widest">
                    {trackingId}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(19,136,8,0.3)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { onClose(); router.push('/tracker') }}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    📊 Track My Progress
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onClose}
                    className="w-full border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-2xl text-sm hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    {t.modalClose}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
