"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setOrientation(height > width ? "portrait" : "landscape")
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    window.addEventListener("orientationchange", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("orientationchange", checkDevice)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    orientation,
  }
}
