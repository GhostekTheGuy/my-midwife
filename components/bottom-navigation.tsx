"use client"

import Link from "next/link"
import { Calendar, Heart, Home, MessageCircle, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function BottomNavigation() {
  const { t } = useLanguage()
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t md:hidden">
      <div className="grid h-full grid-cols-5">
        <Link href="/" className="flex flex-col items-center justify-center text-pink-600 nav-item smooth-transition">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">{t("nav.home")}</span>
        </Link>
        <Link
          href="/search"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-pink-600 nav-item smooth-transition"
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">{t("nav.search")}</span>
        </Link>
        <Link
          href="/appointments"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-pink-600 nav-item smooth-transition"
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">{t("nav.calendar")}</span>
        </Link>
        <Link
          href="/diary"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-pink-600 nav-item smooth-transition"
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs mt-1">{t("nav.diary")}</span>
        </Link>
        <Link
          href="/chat"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-pink-600 nav-item smooth-transition"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs mt-1">{t("nav.chat")}</span>
        </Link>
      </div>
    </div>
  )
}
