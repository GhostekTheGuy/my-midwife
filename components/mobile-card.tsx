"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MobileCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
  variant?: "default" | "outlined" | "elevated"
}

export function MobileCard({
  title,
  description,
  children,
  className,
  onClick,
  interactive = false,
  variant = "default",
}: MobileCardProps) {
  const baseClasses = cn(
    "mobile-card transition-all duration-200",
    interactive && "cursor-pointer hover:shadow-lg active:scale-[0.98]",
    variant === "outlined" && "border-2",
    variant === "elevated" && "shadow-lg",
    className,
  )

  const handleClick = () => {
    if (onClick) {
      // Haptic feedback
      if ("vibrate" in navigator) {
        navigator.vibrate(10)
      }
      onClick()
    }
  }

  return (
    <Card className={baseClasses} onClick={handleClick}>
      {(title || description) && (
        <CardHeader className="pb-3">
          {title && <CardTitle className="text-lg font-semibold leading-tight">{title}</CardTitle>}
          {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(title || description ? "pt-0" : "")}>{children}</CardContent>
    </Card>
  )
}
