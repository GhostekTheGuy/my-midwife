"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function HealthTipsPage() {
  const { t } = useLanguage()

  const healthTips = [
    {
      id: 1,
      title: t("home.healthTip.prenatalNutrition"),
      description: t("home.healthTip.description"),
      imageUrl: "/placeholder.svg?height=128&width=300",
      fullContent:
        "Szczegółowe informacje na temat znaczenia kwasu foliowego, żelaza i wapnia w diecie ciężarnej. Omówienie źródeł pokarmowych i suplementacji.",
    },
    {
      id: 2,
      title: t("healthTips.exerciseDuringPregnancy.title"),
      description: t("healthTips.exerciseDuringPregnancy.description"),
      imageUrl: "/placeholder.svg?height=128&width=300",
      fullContent:
        "Zalecane formy aktywności fizycznej, takie jak spacery, pływanie, joga prenatalna. Wskazówki dotyczące intensywności i unikania niebezpiecznych ćwiczeń.",
    },
    {
      id: 3,
      title: t("healthTips.preparingForLabor.title"),
      description: t("healthTips.preparingForLabor.description"),
      imageUrl: "/placeholder.svg?height=128&width=300",
      fullContent: "Omówienie planu porodu, technik oddechowych, roli partnera oraz pakowania torby do szpitala.",
    },
    {
      id: 4,
      title: t("healthTips.postpartumRecovery.title"),
      description: t("healthTips.postpartumRecovery.description"),
      imageUrl: "/placeholder.svg?height=128&width=300",
      fullContent:
        "Kąpiel, przewijanie, karmienie, sen i rozpoznawanie sygnałów dziecka. Porady dla świeżo upieczonych rodziców.",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">{t("common.back")}</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{t("home.healthTip.title")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthTips.map((tip) => (
          <Card key={tip.id}>
            <CardHeader>
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={tip.imageUrl || "/placeholder.svg"}
                  alt={tip.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <CardTitle>{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{tip.description}</p>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/health-tips/${tip.id}`}>{t("home.healthTip.readMore")}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
