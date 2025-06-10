"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReviewForm } from "@/components/review-form"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ReviewPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const appointmentId = params.id

  // In a real application, you would fetch appointment details here
  // to display context for the review, e.g., midwife's name.
  const midwifeName = "Dr. Anna Kowalska" // Placeholder

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/appointments">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">{t("common.back")}</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{t("review.title")}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("review.forAppointmentWith", { midwifeName })}</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewForm appointmentId={appointmentId} />
        </CardContent>
      </Card>
    </div>
  )
}
