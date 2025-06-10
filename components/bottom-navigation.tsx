"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Heart, Home, MessageCircle, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function BottomNavigation() {
  const { t } = useLanguage()
  const pathname = usePathname()

  const navigationItems = [
    {
      href: "/",
      icon: Home,
      label: t("nav.home"),
      badge: null,
    },
    {
      href: "/search",
      icon: Search,
      label: t("nav.search"),
      badge: null,
    },
    {
      href: "/appointments",
      icon: Calendar,
      label: t("nav.calendar"),
      badge: 2,
    },
    {
      href: "/diary",
      icon: Heart,
      label: t("nav.diary"),
      badge: null,
    },
    {
      href: "/chat",
      icon: MessageCircle,
      label: t("nav.chat"),
      badge: 1,
    },
  ]

  const handleNavClick = () => {
    // Haptic feedback for supported devices
    if ("vibrate" in navigator) {
      navigator.vibrate(10)
    }
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 md:hidden safe-area-bottom">
      <div className="grid h-20 grid-cols-5 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "flex flex-col items-center justify-center relative",
                "touch-target mobile-nav-item",
                "transition-all duration-200 ease-out",
                active ? "text-pink-600" : "text-gray-500 hover:text-gray-700 active:text-pink-500",
              )}
            >
              <div className="relative">
                <Icon className={cn("h-6 w-6 transition-transform duration-200", active && "scale-110")} />
                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 font-medium transition-all duration-200",
                  active ? "text-pink-600 scale-105" : "text-gray-500",
                )}
              >
                {item.label}
              </span>
              {active && <div className="absolute top-0 w-8 h-1 bg-pink-500 rounded-full" />}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
