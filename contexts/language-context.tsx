"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import en from "@/translations/en.json"
import pl from "@/translations/pl.json"

// Define the structure of your translations
type Translations = typeof en

// Define available languages
const availableLanguages = ["en", "pl"] as const
type Language = (typeof availableLanguages)[number]

// Combine translations into a single object
const translationsData: Record<Language, Translations> = { en, pl }

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Helper to get a nested value from an object using a dot-separated key
const getNestedValue = (obj: any, key: string): string | undefined => {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pl") // Default to Polish

  useEffect(() => {
    // 1. Check for a language preference in localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      setLanguageState(savedLanguage)
      return
    }

    // 2. Detect browser language
    const browserLang = navigator.language.split("-")[0] as Language
    if (availableLanguages.includes(browserLang)) {
      setLanguageState(browserLang)
      localStorage.setItem("language", browserLang)
    }
    // If browser language is not supported, it will stick to the default 'pl'
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    if (availableLanguages.includes(lang)) {
      setLanguageState(lang)
      localStorage.setItem("language", lang)
    }
  }, [])

  const t = useCallback(
    (key: string): string => {
      const translation = getNestedValue(translationsData[language], key)
      if (translation === undefined) {
        console.warn(`Translation key "${key}" not found for language "${language}".`)
        // Fallback to English if key not found in current language
        const fallback = getNestedValue(translationsData["en"], key)
        return fallback || key
      }
      return translation
    },
    [language],
  )

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
