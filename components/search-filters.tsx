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
      <div>
        <h3 className="text-lg font-medium">{t("search.filters")}</h3>
        <p className="text-sm text-muted-foreground">{t("search.refineResults")}</p>
      </div>
      <Separator />

      {/* Location */}
      <div className="space-y-4">
        <h4 className="font-medium">{t("search.location")}</h4>
        <div className="space-y-2">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("search.city")} className="pl-9" defaultValue="Warsaw" />
          </div>
          <Input placeholder={t("search.provinceRegion")} />
        </div>
      </div>
      <Separator />

      {/* Service Type */}
      <div className="space-y-4">
        <h4 className="font-medium">{t("search.serviceType")}</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="lactation" defaultChecked />
            <Label htmlFor="lactation">{t("serviceTypes.lactation")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="psychologist" />
            <Label htmlFor="psychologist">{t("serviceTypes.psychologist")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="dietitian" />
            <Label htmlFor="dietitian">{t("serviceTypes.dietitian")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sexologist" />
            <Label htmlFor="sexologist">{t("serviceTypes.sexologist")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="urogynecological" />
            <Label htmlFor="urogynecological">{t("serviceTypes.urogynecological")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="patronage" />
            <Label htmlFor="patronage">{t("serviceTypes.patronage")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="birth" />
            <Label htmlFor="birth">{t("serviceTypes.birth")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="babywearing" />
            <Label htmlFor="babywearing">{t("serviceTypes.babywearing")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="cytology" />
            <Label htmlFor="cytology">{t("serviceTypes.cytology")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hpv" />
            <Label htmlFor="hpv">{t("serviceTypes.hpv")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="menopause" />
            <Label htmlFor="menopause">{t("serviceTypes.menopause")}</Label>
          </div>
        </div>
      </div>
      <Separator />

      {/* Service Delivery Format */}
      <div className="space-y-4">
        <h4 className="font-medium">{t("search.serviceDeliveryFormat")}</h4>
        <RadioGroup defaultValue="in-person">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in-person" id="in-person" />
            <Label htmlFor="in-person">In-person (at midwife's office)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="at-home" id="at-home" />
            <Label htmlFor="at-home">In-person (at patient's home)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online">Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="any" />
            <Label htmlFor="any">Any format</Label>
          </div>
        </RadioGroup>
      </div>
      <Separator />

      {/* Rating */}
      <div className="space-y-4">
        <h4 className="font-medium">{t("search.minimumRating")}</h4>
        <RadioGroup defaultValue="4.5">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="r5" />
            <Label htmlFor="r5">5 stars</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4.5" id="r4.5" />
            <Label htmlFor="r4.5">4.5+ stars</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="r4" />
            <Label htmlFor="r4">4+ stars</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any-rating" id="any-rating" />
            <Label htmlFor="any-rating">Any rating</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex gap-2 pt-4">
        <Button variant="outline" className="flex-1">
          {t("common.reset")}
        </Button>
        <Button className="flex-1">{t("search.applyFilters")}</Button>
      </div>
    </div>
  )
}
