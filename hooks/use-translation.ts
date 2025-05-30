"use client"

import { useLanguage } from "@/contexts/language-context"

export function useTranslation() {
  const { t, language, setLanguage } = useLanguage()

  return {
    t,
    language,
    setLanguage,
    isPolish: language === "pl",
    isEnglish: language === "en",
  }
}
