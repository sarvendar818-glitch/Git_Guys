'use client'
import { createContext, useContext, useState } from 'react'
import translations from '@/lib/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  const toggleLang = () => setLang(prev => prev === 'en' ? 'hi' : 'en')
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
