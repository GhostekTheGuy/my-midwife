"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { MapPin } from "lucide-react"

// Add interface for props
interface SearchFiltersProps {
  selectedCity: string
  setSelectedCity: (city: string) => void
  selectedServices: string[]
  setSelectedServices: (services: string[]) => void
  selectedFormat: string
  setSelectedFormat: (format: string) => void
  selectedRating: string
  setSelectedRating: (rating: string) => void
  activeFilters: string[]
  setActiveFilters: (filters: string[]) => void
  onReset: () => void
}

export function SearchFilters({
  selectedCity,
  setSelectedCity,
  selectedServices,
  setSelectedServices,
  selectedFormat,
  setSelectedFormat,
  selectedRating,
  setSelectedRating,
  activeFilters,
  setActiveFilters,
  onReset,
}: SearchFiltersProps) {
  const { t } = useLanguage()

  // Add handlers for service checkboxes:
  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId])
    } else {
      setSelectedServices(selectedServices.filter((s) => s !== serviceId))
    }
  }

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
            <Input
              placeholder={t("search.city")}
              className="pl-9"
              value={selectedCity === "any" ? "" : selectedCity}
              onChange={(e) => setSelectedCity(e.target.value || "any")}
            />
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
            <Checkbox
              id="lactation"
              checked={selectedServices.includes("lactation")}
              onCheckedChange={(checked) => handleServiceChange("lactation", checked as boolean)}
            />
            <Label htmlFor="lactation">{t("serviceTypes.lactation")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="psychologist"
              checked={selectedServices.includes("psychologist")}
              onCheckedChange={(checked) => handleServiceChange("psychologist", checked as boolean)}
            />
            <Label htmlFor="psychologist">{t("serviceTypes.psychologist")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dietitian"
              checked={selectedServices.includes("dietitian")}
              onCheckedChange={(checked) => handleServiceChange("dietitian", checked as boolean)}
            />
            <Label htmlFor="dietitian">{t("serviceTypes.dietitian")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sexologist"
              checked={selectedServices.includes("sexologist")}
              onCheckedChange={(checked) => handleServiceChange("sexologist", checked as boolean)}
            />
            <Label htmlFor="sexologist">{t("serviceTypes.sexologist")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urogynecological"
              checked={selectedServices.includes("urogynecological")}
              onCheckedChange={(checked) => handleServiceChange("urogynecological", checked as boolean)}
            />
            <Label htmlFor="urogynecological">{t("serviceTypes.urogynecological")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="patronage"
              checked={selectedServices.includes("patronage")}
              onCheckedChange={(checked) => handleServiceChange("patronage", checked as boolean)}
            />
            <Label htmlFor="patronage">{t("serviceTypes.patronage")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="birth"
              checked={selectedServices.includes("birth")}
              onCheckedChange={(checked) => handleServiceChange("birth", checked as boolean)}
            />
            <Label htmlFor="birth">{t("serviceTypes.birth")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="babywearing"
              checked={selectedServices.includes("babywearing")}
              onCheckedChange={(checked) => handleServiceChange("babywearing", checked as boolean)}
            />
            <Label htmlFor="babywearing">{t("serviceTypes.babywearing")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cytology"
              checked={selectedServices.includes("cytology")}
              onCheckedChange={(checked) => handleServiceChange("cytology", checked as boolean)}
            />
            <Label htmlFor="cytology">{t("serviceTypes.cytology")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hpv"
              checked={selectedServices.includes("hpv")}
              onCheckedChange={(checked) => handleServiceChange("hpv", checked as boolean)}
            />
            <Label htmlFor="hpv">{t("serviceTypes.hpv")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="menopause"
              checked={selectedServices.includes("menopause")}
              onCheckedChange={(checked) => handleServiceChange("menopause", checked as boolean)}
            />
            <Label htmlFor="menopause">{t("serviceTypes.menopause")}</Label>
          </div>
        </div>
      </div>
      <Separator />

      {/* Service Delivery Format */}
      <div className="space-y-4">
        <h4 className="font-medium">{t("search.serviceDeliveryFormat")}</h4>
        <RadioGroup value={selectedFormat} onValueChange={setSelectedFormat}>
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
        <RadioGroup value={selectedRating} onValueChange={setSelectedRating}>
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
        <Button variant="outline" className="flex-1" onClick={onReset}>
          {t("common.reset")}
        </Button>
        <Button className="flex-1">{t("search.applyFilters")}</Button>
      </div>
    </div>
  )
}
