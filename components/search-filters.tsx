import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { MapPin } from "lucide-react"

export function SearchFilters() {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-lg font-medium">Filters</h3>
        <p className="text-sm text-muted-foreground">Refine your search results</p>
      </div>
      <Separator />

      {/* Location */}
      <div className="space-y-4">
        <h4 className="font-medium">Location</h4>
        <div className="space-y-2">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="City" className="pl-9" defaultValue="Warsaw" />
          </div>
          <Input placeholder="Province/Region" />
        </div>
      </div>
      <Separator />

      {/* Service Type */}
      <div className="space-y-4">
        <h4 className="font-medium">Service Type</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="lactation" defaultChecked />
            <Label htmlFor="lactation">Certified Lactation Consultant</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="psychologist" />
            <Label htmlFor="psychologist">Psychologist</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="dietitian" />
            <Label htmlFor="dietitian">Dietitian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sexologist" />
            <Label htmlFor="sexologist">Sexologist</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="urogynecological" />
            <Label htmlFor="urogynecological">Urogynecological Therapist</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="patronage" />
            <Label htmlFor="patronage">Patronage Visits</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="birth" />
            <Label htmlFor="birth">Birth Preparation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="babywearing" />
            <Label htmlFor="babywearing">Babywearing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="cytology" />
            <Label htmlFor="cytology">Cytology</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hpv" />
            <Label htmlFor="hpv">HPV Vaccinations</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="menopause" />
            <Label htmlFor="menopause">Menopause Support</Label>
          </div>
        </div>
      </div>
      <Separator />

      {/* Service Delivery Format */}
      <div className="space-y-4">
        <h4 className="font-medium">Service Delivery Format</h4>
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
        <h4 className="font-medium">Minimum Rating</h4>
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
          Reset
        </Button>
        <Button className="flex-1">Apply Filters</Button>
      </div>
    </div>
  )
}
