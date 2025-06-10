"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Calculator, Calendar, Heart, Home, MessageCircle, Search, Utensils, HelpCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"

export function DesktopSidebar() {
  const { t, language, setLanguage } = useLanguage()
  const pathname = usePathname()

  const navigationItems = [
    {
      href: "/",
      icon: Home,
      label: t("nav.home"),
    },
    {
      href: "/search",
      icon: Search,
      label: t("search.title"),
    },
    {
      href: "/appointments",
      icon: Calendar,
      label: t("appointments.title"),
      badge: 2, // Example: 2 upcoming appointments
    },
    {
      href: "/chat",
      icon: MessageCircle,
      label: t("chat.title"),
      badge: 1, // Example: 1 unread message
    },
    {
      href: "/diary",
      icon: Heart,
      label: t("diary.title"),
    },
    {
      href: "/bmi-calculator",
      icon: Calculator,
      label: t("bmi.title"),
    },
    {
      href: "/nutrition",
      icon: Utensils,
      label: t("nutrition.title"),
    },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
        {/* Logo */}
        <div className="flex justify-center items-center flex-shrink-0 px-10 text-center">
          <div className="relative w-8 h-8 mr-2">
            <Image
              src="https://blobs.vusercontent.net/blob/logo-H5gyLy0Ux3qC6gf7gkJ0jT2QUikOwN.svg"
              alt="MyMidwife Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-xl font-regular text-pink-600">{t("app.title")}</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md nav-item smooth-transition ${
                  active
                    ? "bg-pink-100 text-pink-900 border-r-2 border-pink-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 smooth-transition ${
                    active ? "text-pink-500" : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto bg-pink-100 text-pink-800 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="flex-shrink-0 px-2 space-y-1">
          <Link
            href="/help"
            className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            <HelpCircle className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Help & Support
          </Link>
        </div>

        {/* App Version */}
        <div className="flex-shrink-0 px-4 py-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">Version 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
