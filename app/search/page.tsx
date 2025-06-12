"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, SearchIcon, SlidersHorizontal } from "lucide-react"
import { MidwifeCard } from "@/components/midwife-card"
import { SearchFilters } from "@/components/search-filters"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("Warsaw")
  const [selectedServices, setSelectedServices] = useState<string[]>(["lactation"])
  const [selectedFormat, setSelectedFormat] = useState("in-person")
  const [selectedRating, setSelectedRating] = useState("4.5")
  const [activeFilters, setActiveFilters] = useState<string[]>(["Warsaw", "Lactation Consultant", "In-person"])

  const allMidwives = [
    {
      id: "1",
      name: "Dr. Anna Kowalska",
      specialty: "Certified Lactation Consultant",
      rating: 4.9,
      reviewCount: 124,
      location: "Warsaw",
      city: "Warsaw",
      services: ["lactation"],
      format: ["in-person", "online"],
      imageUrl: "/blonde-doctor-smile.png",
      coordinates: [21.0122, 52.2297], // Warsaw coordinates
    },
    {
      id: "2",
      name: "Maria Nowak",
      specialty: "Urogynecological Therapist",
      rating: 4.7,
      reviewCount: 98,
      location: "Warsaw",
      city: "Warsaw",
      services: ["urogynecological"],
      format: ["in-person"],
      imageUrl: "/therapist-female-professional.png",
      coordinates: [21.0256, 52.2355], // Slightly offset from Warsaw center
    },
    {
      id: "3",
      name: "Joanna Wiśniewska",
      specialty: "Birth Preparation Specialist",
      rating: 4.8,
      reviewCount: 112,
      location: "Warsaw",
      city: "Warsaw",
      services: ["birth"],
      format: ["in-person", "at-home"],
      imageUrl: "/friendly-midwife.png",
      coordinates: [21.0042, 52.2151], // Another Warsaw location
    },
    {
      id: "4",
      name: "Katarzyna Lewandowska",
      specialty: "Psychologist, Perinatal Specialist",
      rating: 4.6,
      reviewCount: 87,
      location: "Warsaw",
      city: "Warsaw",
      services: ["psychologist"],
      format: ["online", "in-person"],
      imageUrl: "/female-psychologist-red-hair.png",
      coordinates: [21.0311, 52.2489], // Another Warsaw location
    },
    {
      id: "5",
      name: "Agnieszka Dąbrowska",
      specialty: "Dietitian, Pregnancy Nutrition",
      rating: 4.5,
      reviewCount: 76,
      location: "Warsaw",
      city: "Warsaw",
      services: ["dietitian"],
      format: ["online"],
      imageUrl: "/young-nutritionist.png",
      coordinates: [20.9889, 52.2211], // Another Warsaw location
    },
    {
      id: "6",
      name: "Magdalena Zielińska",
      specialty: "Sexologist, Women's Health",
      rating: 4.8,
      reviewCount: 103,
      location: "Warsaw",
      city: "Warsaw",
      services: ["sexologist"],
      format: ["online", "in-person"],
      imageUrl: "/professional-female-sexologist.png",
      coordinates: [21.0422, 52.2197], // Another Warsaw location
    },
    {
      id: "7",
      name: "Barbara Kamińska",
      specialty: "Lactation Consultant, Postnatal Care",
      rating: 4.7,
      reviewCount: 92,
      location: "Warsaw",
      city: "Warsaw",
      services: ["lactation", "patronage"],
      format: ["at-home", "in-person"],
      imageUrl: "/experienced-midwife.png",
      coordinates: [21.0178, 52.2401], // Another Warsaw location
    },
    // Krakow midwives
    {
      id: "8",
      name: "Dr. Ewa Kowalczyk",
      specialty: "Certified Lactation Consultant",
      rating: 4.9,
      reviewCount: 156,
      location: "Krakow",
      city: "Krakow",
      services: ["lactation"],
      format: ["in-person", "online"],
      imageUrl: "/placeholder-nliyn.png",
      coordinates: [19.945, 50.0647], // Krakow coordinates
    },
    {
      id: "9",
      name: "Monika Wójcik",
      specialty: "Birth Preparation & Babywearing Consultant",
      rating: 4.6,
      reviewCount: 89,
      location: "Krakow",
      city: "Krakow",
      services: ["birth", "babywearing"],
      format: ["in-person", "at-home"],
      imageUrl: "/friendly-curly-haired-midwife.png",
      coordinates: [19.9611, 50.0515], // Another Krakow location
    },
    {
      id: "10",
      name: "Dr. Paulina Mazur",
      specialty: "Gynecologist & Cytology Specialist",
      rating: 4.8,
      reviewCount: 134,
      location: "Krakow",
      city: "Krakow",
      services: ["cytology", "hpv"],
      format: ["in-person"],
      imageUrl: "/female-gynecologist-glasses.png",
      coordinates: [19.9289, 50.0721], // Another Krakow location
    },
    // Wroclaw midwives
    {
      id: "11",
      name: "Anna Sikora",
      specialty: "Perinatal Psychologist",
      rating: 4.7,
      reviewCount: 78,
      location: "Wroclaw",
      city: "Wroclaw",
      services: ["psychologist"],
      format: ["online", "in-person"],
      imageUrl: "/placeholder.svg?height=200&width=200",
      coordinates: [17.0385, 51.1079], // Wroclaw coordinates
    },
    {
      id: "12",
      name: "Beata Jankowska",
      specialty: "Menopause & Women's Health Specialist",
      rating: 4.5,
      reviewCount: 67,
      location: "Wroclaw",
      city: "Wroclaw",
      services: ["menopause", "sexologist"],
      format: ["in-person", "online"],
      imageUrl: "/placeholder.svg?height=200&width=200",
      coordinates: [17.0512, 51.1167], // Another Wroclaw location
    },
    // Poznan midwives
    {
      id: "13",
      name: "Karolina Nowacka",
      specialty: "Lactation & Postnatal Care Specialist",
      rating: 4.8,
      reviewCount: 95,
      location: "Poznan",
      city: "Poznan",
      services: ["lactation", "patronage"],
      format: ["at-home", "in-person"],
      imageUrl: "/placeholder.svg?height=200&width=200",
      coordinates: [16.9252, 52.4064], // Poznan coordinates
    },
    {
      id: "14",
      name: "Dr. Justyna Krawczyk",
      specialty: "Pregnancy Nutrition Specialist",
      rating: 4.6,
      reviewCount: 82,
      location: "Poznan",
      city: "Poznan",
      services: ["dietitian"],
      format: ["online", "in-person"],
      imageUrl: "/placeholder.svg?height=200&width=200",
      coordinates: [16.9352, 52.3964], // Another Poznan location
    },
  ]

  const filteredMidwives = useMemo(() => {
    return allMidwives.filter((midwife) => {
      if (
        searchQuery &&
        !midwife.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !midwife.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      if (selectedCity !== "any" && midwife.city !== selectedCity) {
        return false
      }

      if (selectedServices.length > 0 && !selectedServices.some((service) => midwife.services.includes(service))) {
        return false
      }

      if (selectedFormat !== "any" && !midwife.format.includes(selectedFormat)) {
        return false
      }

      const minRating = selectedRating === "any-rating" ? 0 : Number.parseFloat(selectedRating)
      if (midwife.rating < minRating) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedCity, selectedServices, selectedFormat, selectedRating])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCity("Warsaw")
    setSelectedServices(["lactation"])
    setSelectedFormat("in-person")
    setSelectedRating("4.5")
    setActiveFilters(["Warsaw", "Lactation Consultant", "In-person"])
  }

  const removeFilter = (filter: string) => {
    const newFilters = activeFilters.filter((f) => f !== filter)
    setActiveFilters(newFilters)

    if (filter === "Warsaw" || filter === "Krakow" || filter === "Wroclaw" || filter === "Poznan") {
      setSelectedCity("any")
    } else if (filter === "Lactation Consultant") {
      setSelectedServices((prev) => prev.filter((s) => s !== "lactation"))
    } else if (filter === "In-person") {
      setSelectedFormat("any")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t("search.title")}</h1>
        <p className="text-muted-foreground">{t("search.description")}</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("search.placeholder")}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SearchFilters
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              selectedFormat={selectedFormat}
              setSelectedFormat={setSelectedFormat}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              onReset={handleClearFilters}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <Badge key={index} variant="outline" className="bg-pink-50 flex items-center gap-1">
            {filter === "Warsaw" || filter === "Krakow" || filter === "Wroclaw" || filter === "Poznan" ? (
              <MapPin className="h-3 w-3" />
            ) : null}
            {filter}
            <button className="ml-1 text-muted-foreground hover:text-foreground" onClick={() => removeFilter(filter)}>
              ×
            </button>
          </Badge>
        ))}
        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={handleClearFilters}>
            {t("common.clear")} {t("search.all")}
          </Button>
        )}
      </div>

      {/* Results */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">{t("search.all")}</TabsTrigger>
          <TabsTrigger value="lactation">{t("search.lactation")}</TabsTrigger>
          <TabsTrigger value="birth">{t("search.birthPrep")}</TabsTrigger>
          <TabsTrigger value="gynecology">{t("search.gynecology")}</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMidwives.map((midwife) => (
              <MidwifeCard
                key={midwife.id}
                id={midwife.id}
                name={midwife.name}
                specialty={midwife.specialty}
                rating={midwife.rating}
                reviewCount={midwife.reviewCount}
                location={midwife.location}
                imageUrl={midwife.imageUrl}
              />
            ))}
          </div>
          {filteredMidwives.length === 0 && (
            <Card className="bg-pink-50/50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <SearchIcon className="h-12 w-12 text-pink-300 mb-4" />
                <h3 className="text-lg font-medium">{t("search.noResults")}</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">{t("search.noResultsDescription")}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t("search.suggestedAlternatives")}:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge
                      className="bg-pink-100 hover:bg-pink-200 text-pink-800 cursor-pointer"
                      onClick={() => {
                        setSelectedCity("Krakow")
                        setActiveFilters((prev) => {
                          const newFilters = prev.filter((f) => f !== "Warsaw" && f !== "Wroclaw" && f !== "Poznan")
                          return [...newFilters, "Krakow"]
                        })
                      }}
                    >
                      Krakow ({allMidwives.filter((m) => m.city === "Krakow").length} midwives)
                    </Badge>
                    <Badge
                      className="bg-pink-100 hover:bg-pink-200 text-pink-800 cursor-pointer"
                      onClick={() => {
                        setSelectedCity("Wroclaw")
                        setActiveFilters((prev) => {
                          const newFilters = prev.filter((f) => f !== "Warsaw" && f !== "Krakow" && f !== "Poznan")
                          return [...newFilters, "Wroclaw"]
                        })
                      }}
                    >
                      Wroclaw ({allMidwives.filter((m) => m.city === "Wroclaw").length} midwives)
                    </Badge>
                    <Badge
                      className="bg-pink-100 hover:bg-pink-200 text-pink-800 cursor-pointer"
                      onClick={() => {
                        setSelectedCity("Poznan")
                        setActiveFilters((prev) => {
                          const newFilters = prev.filter((f) => f !== "Warsaw" && f !== "Krakow" && f !== "Wroclaw")
                          return [...newFilters, "Poznan"]
                        })
                      }}
                    >
                      Poznan ({allMidwives.filter((m) => m.city === "Poznan").length} midwives)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="lactation" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMidwives
              .filter((m) => m.services.includes("lactation"))
              .map((midwife) => (
                <MidwifeCard
                  key={midwife.id}
                  id={midwife.id}
                  name={midwife.name}
                  specialty={midwife.specialty}
                  rating={midwife.rating}
                  reviewCount={midwife.reviewCount}
                  location={midwife.location}
                  imageUrl={midwife.imageUrl}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="birth" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMidwives
              .filter((m) => m.services.includes("birth"))
              .map((midwife) => (
                <MidwifeCard
                  key={midwife.id}
                  id={midwife.id}
                  name={midwife.name}
                  specialty={midwife.specialty}
                  rating={midwife.rating}
                  reviewCount={midwife.reviewCount}
                  location={midwife.location}
                  imageUrl={midwife.imageUrl}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="gynecology" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMidwives
              .filter(
                (m) =>
                  m.services.includes("sexologist") || m.services.includes("cytology") || m.services.includes("hpv"),
              )
              .map((midwife) => (
                <MidwifeCard
                  key={midwife.id}
                  id={midwife.id}
                  name={midwife.name}
                  specialty={midwife.specialty}
                  rating={midwife.rating}
                  reviewCount={midwife.reviewCount}
                  location={midwife.location}
                  imageUrl={midwife.imageUrl}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}