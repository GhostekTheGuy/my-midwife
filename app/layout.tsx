import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { TopNavigation } from "@/components/top-navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { LanguageProvider } from "@/contexts/language-context"
import { PageTransition } from "@/components/page-transition"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "MyMidwife - Comprehensive Midwifery Care",
  description: "Connect with certified midwives, track your pregnancy journey, and access personalized care.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <LanguageProvider>
          {/* Dodajemy gradient jako tło */}
          <AnimatedGradientBackground />

          {/* Główna zawartość aplikacji */}
          <div className="flex min-h-screen relative z-10">
            {/* Desktop Sidebar */}
            <DesktopSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:ml-64">
              <TopNavigation />
              <main className="flex-1 p-4 md:p-6 pb-16 md:pb-6">
                <div className="max-w-7xl mx-auto">
                  <PageTransition>{children}</PageTransition>
                </div>
              </main>

              {/* Mobile Bottom Navigation */}
              <BottomNavigation />
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
