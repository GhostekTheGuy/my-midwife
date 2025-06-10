"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface MobileLayoutProps {
  children: React.ReactNode
  className?: string
  enablePullToRefresh?: boolean
  onRefresh?: () => Promise<void>
}

export function MobileLayout({ children, className, enablePullToRefresh = false, onRefresh }: MobileLayoutProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enablePullToRefresh) return
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enablePullToRefresh || isRefreshing) return

    const currentY = e.touches[0].clientY
    const distance = currentY - startY

    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance * 0.5, 80))
    }
  }

  const handleTouchEnd = async () => {
    if (!enablePullToRefresh || isRefreshing) return

    if (pullDistance > 60 && onRefresh) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }

    setPullDistance(0)
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-pink-50 to-purple-50",
        "safe-area-top safe-area-bottom safe-area-left safe-area-right",
        className,
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {enablePullToRefresh && (
        <div
          className="pull-to-refresh transition-all duration-300"
          style={{
            transform: `translateY(${pullDistance}px)`,
            opacity: pullDistance > 20 ? 1 : 0,
          }}
        >
          {isRefreshing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
              <span>Refreshing...</span>
            </div>
          ) : (
            <span>Pull to refresh</span>
          )}
        </div>
      )}

      <div className="transition-transform duration-300" style={{ transform: `translateY(${pullDistance}px)` }}>
        {children}
      </div>
    </div>
  )
}
