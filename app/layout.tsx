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
  generator: "v0.dev",
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
          {/* Animated gradient background */}
          <AnimatedGradientBackground />

          {/* Main application container */}
          <div className="flex min-h-screen relative z-10">
            {/* Desktop Sidebar - hidden on mobile */}
            <DesktopSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:ml-64">
              <TopNavigation />

              {/* Main content with mobile optimizations */}
              <main className="flex-1 relative">
                <div className="h-full overflow-y-auto">
                  <div className="max-w-7xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
                    <PageTransition>{children}</PageTransition>
                  </div>
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
