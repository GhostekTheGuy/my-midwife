"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

interface ReviewFormProps {
  appointmentId: string
}

export function ReviewForm({ appointmentId }: ReviewFormProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (rating === 0) {
      toast({
        title: t("review.toast.error"),
        description: t("review.toast.selectRating"),
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    console.log("Submitting review:", { appointmentId, rating, comment })

    // In a real app, you would send this data to your backend
    // const response = await fetch('/api/submit-review', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ appointmentId, rating, comment }),
    // });
    // if (response.ok) {
    //   toast({ title: t("review.toast.success"), description: t("review.toast.reviewSubmitted") });
    //   // Optionally redirect or update UI
    // } else {
    //   toast({ title: t("review.toast.error"), description: t("review.toast.submissionFailed"), variant: "destructive" });
    // }

    toast({
      title: t("review.toast.success"),
      description: t("review.toast.reviewSubmitted"),
    })

    setIsSubmitting(false)
    setRating(0)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="rating" className="mb-2 block">
          {t("review.rating")}
        </Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <Star
              key={starValue}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                starValue <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
            />
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="comment" className="mb-2 block">
          {t("review.comment")}
        </Label>
        <Textarea
          id="comment"
          placeholder={t("review.commentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          className="resize-y"
          disabled={isSubmitting}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("common.loading") : t("review.submitReview")}
      </Button>
    </form>
  )
}
