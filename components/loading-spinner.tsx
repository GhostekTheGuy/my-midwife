"use client"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  }

  return (
    <div className={`loading-pulse ${className}`}>
      <div className={`${sizeClasses[size]} border-pink-200 border-t-pink-600 rounded-full animate-spin`}></div>
    </div>
  )
}
