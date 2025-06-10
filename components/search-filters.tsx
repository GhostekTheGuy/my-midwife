"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { MapPin } from "lucide-react"

export function SearchFilters() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6 py-4">
      <div className="mobile-section">
        <h3 className="text-lg font-medium mb-2">{t("search.filters")}</h3>
        <p className="text-sm text-muted-foreground">{t("search.refineResults")}</p>
      </div>
      <Separator />

      {/* Location */}
      <div className="mobile-section space-y-4">
        <h4 className="font-medium text-base">{t("search.location")}</h4>
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t("search.city")}
              className="pl-12 h-12 text-base border-2 rounded-lg"
              defaultValue="Warsaw"
            />
          </div>
          <Input placeholder={t("search.provinceRegion")} className="h-12 text-base border-2 rounded-lg" />
        </div>
      </div>
      <Separator />

      {/* Service Type */}
      <div className="mobile-section space-y-4">
        <h4 className="font-medium text-base">{t("search.serviceType")}</h4>
        <div className="space-y-3">
          {[
            { id: "lactation", label: t("serviceTypes.lactation"), defaultChecked: true },
            { id: "psychologist", label: t("serviceTypes.psychologist") },
            { id: "dietitian", label: t("serviceTypes.dietitian") },
            { id: "sexologist", label: t("serviceTypes.sexologist") },
            { id: "urogynecological", label: t("serviceTypes.urogynecological") },
            { id: "patronage", label: t("serviceTypes.patronage") },
            { id: "birth", label: t("serviceTypes.birth") },
            { id: "babywearing", label: t("serviceTypes.babywearing") },
            { id: "cytology", label: t("serviceTypes.cytology") },
            { id: "hpv", label: t("serviceTypes.hpv") },
            { id: "menopause", label: t("serviceTypes.menopause") },
          ].map((service) => (
            <div key={service.id} className="flex items-center space-x-3 touch-friendly">
              <Checkbox id={service.id} defaultChecked={service.defaultChecked} className="h-5 w-5" />
              <Label htmlFor={service.id} className="text-base leading-relaxed cursor-pointer flex-1">
                {service.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />

      {/* Service Delivery Format */}
      <div className="mobile-section space-y-4">
        <h4 className="font-medium text-base">{t("search.serviceDeliveryFormat")}</h4>
        <RadioGroup defaultValue="in-person" className="space-y-3">
          {[
            { value: "in-person", label: "In-person (at midwife's office)" },
            { value: "at-home", label: "In-person (at patient's home)" },
            { value: "online", label: "Online" },
            { value: "any", label: "Any format" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-3 touch-friendly">
              <RadioGroupItem value={option.value} id={option.value} className="h-5 w-5" />
              <Label htmlFor={option.value} className="text-base leading-relaxed cursor-pointer flex-1">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />

      {/* Rating */}
      <div className="mobile-section space-y-4">
        <h4 className="font-medium text-base">{t("search.minimumRating")}</h4>
        <RadioGroup defaultValue="4.5" className="space-y-3">
          {[
            { value: "5", label: "5 stars" },
            { value: "4.5", label: "4.5+ stars" },
            { value: "4", label: "4+ stars" },
            { value: "any-rating", label: "Any rating" },
          ].map((rating) => (
            <div key={rating.value} className="flex items-center space-x-3 touch-friendly">
              <RadioGroupItem value={rating.value} id={rating.value} className="h-5 w-5" />
              <Label htmlFor={rating.value} className="text-base leading-relaxed cursor-pointer flex-1">
                {rating.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex gap-3 pt-6 mobile-section">
        <Button variant="outline" className="flex-1 h-12 text-base rounded-lg">
          {t("common.reset")}
        </Button>
        <Button className="flex-1 h-12 text-base rounded-lg bg-pink-600 hover:bg-pink-700">
          {t("search.applyFilters")}
        </Button>
      </div>
    </div>
  )
}
