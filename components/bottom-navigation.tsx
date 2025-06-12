"use client"

import Link from "next/link"
import { Calendar, Heart, Home, MessageCircle, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { usePathname } from "next/navigation"

export function BottomNavigation() {
  const { t } = useLanguage()
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: t("nav.home") },
    { href: "/search", icon: Search, label: t("nav.search") },
    { href: "/appointments", icon: Calendar, label: t("nav.calendar") },
    { href: "/diary", icon: Heart, label: t("nav.diary") },
    { href: "/chat", icon: MessageCircle, label: t("nav.chat") },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t md:hidden">
      <div className="grid h-full grid-cols-5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center transition-all duration-200 ease-in-out group ${
                isActive
                  ? "text-pink-600 scale-105"
                  : "text-muted-foreground hover:text-pink-600 hover:scale-110 active:scale-95"
              }`}
            >
              <Icon
                className={`transition-all duration-200 ease-in-out ${
                  isActive ? "h-6 w-6" : "h-5 w-5 group-hover:h-6 group-hover:w-6"
                }`}
              />
              <span
                className={`text-xs mt-1 transition-all duration-200 ease-in-out ${
                  isActive ? "font-medium" : "group-hover:font-medium"
                }`}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
