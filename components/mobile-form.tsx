"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MobileFormProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
  className?: string
}

export function MobileForm({ children, onSubmit, className }: MobileFormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("mobile-form space-y-6", className)}>
      {children}
    </form>
  )
}

interface MobileFormFieldProps {
  label: string
  children: React.ReactNode
  error?: string
  required?: boolean
  className?: string
}

export function MobileFormField({ label, children, error, required, className }: MobileFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function MobileInput({ error, className, ...props }: MobileInputProps) {
  return (
    <Input
      className={cn(
        "h-12 text-base border-2 rounded-lg transition-colors",
        error ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-pink-500",
        className,
      )}
      {...props}
    />
  )
}

interface MobileTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export function MobileTextarea({ error, className, ...props }: MobileTextareaProps) {
  return (
    <Textarea
      className={cn(
        "min-h-[100px] text-base border-2 rounded-lg transition-colors resize-none",
        error ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-pink-500",
        className,
      )}
      {...props}
    />
  )
}

interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  children: React.ReactNode
}

export function MobileButton({
  variant = "primary",
  size = "md",
  loading,
  children,
  className,
  ...props
}: MobileButtonProps) {
  const sizeClasses = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  }

  const variantClasses = {
    primary: "bg-pink-600 hover:bg-pink-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
    outline: "border-2 border-pink-600 text-pink-600 hover:bg-pink-50",
  }

  return (
    <Button
      className={cn(
        "w-full rounded-lg font-medium transition-all duration-200",
        "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
