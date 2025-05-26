import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomNavigation } from "@/components/bottom-navigation"
import { TopNavigation } from "@/components/top-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MyMidwife",
  description: "Connect with midwives for your intimate and perinatal health needs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-pink-50/30 min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TopNavigation />
          <main className="flex-1 container mx-auto px-4 py-4 mb-16">{children}</main>
          <BottomNavigation />
        </ThemeProvider>
      </body>
    </html>
  )
}
