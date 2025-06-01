import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, SearchIcon, SlidersHorizontal } from "lucide-react"
import { MidwifeCard } from "@/components/midwife-card"
import { SearchFilters } from "@/components/search-filters"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Find a Midwife</h1>
        <p className="text-muted-foreground">Search for midwives based on location, services, and availability</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, specialty, or location" className="pl-9" />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SearchFilters />
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-pink-50 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          Warsaw
          <button className="ml-1 text-muted-foreground hover:text-foreground">×</button>
        </Badge>
        <Badge variant="outline" className="bg-pink-50 flex items-center gap-1">
          Lactation Consultant
          <button className="ml-1 text-muted-foreground hover:text-foreground">×</button>
        </Badge>
        <Badge variant="outline" className="bg-pink-50 flex items-center gap-1">
          In-person
          <button className="ml-1 text-muted-foreground hover:text-foreground">×</button>
        </Badge>
        <Button variant="ghost" size="sm" className="h-6 text-xs">
          Clear All
        </Button>
      </div>

      {/* Search Results */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="lactation">Lactation</TabsTrigger>
          <TabsTrigger value="birth">Birth Prep</TabsTrigger>
          <TabsTrigger value="gynecology">Gynecology</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MidwifeCard
              id="1"
              name="Dr. Anna Kowalska"
              specialty="Certified Lactation Consultant"
              rating={4.9}
              reviewCount={124}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with blonde hair smiling"
            />
            <MidwifeCard
              id="2"
              name="Maria Nowak"
              specialty="Urogynecological Therapist"
              rating={4.7}
              reviewCount={98}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with brown hair smiling"
            />
            <MidwifeCard
              id="3"
              name="Joanna Wiśniewska"
              specialty="Birth Preparation Specialist"
              rating={4.8}
              reviewCount={112}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with black hair smiling"
            />
            <MidwifeCard
              id="4"
              name="Katarzyna Lewandowska"
              specialty="Psychologist, Perinatal Specialist"
              rating={4.6}
              reviewCount={87}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with red hair smiling"
            />
            <MidwifeCard
              id="5"
              name="Agnieszka Dąbrowska"
              specialty="Dietitian, Pregnancy Nutrition"
              rating={4.5}
              reviewCount={76}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with short hair smiling"
            />
            <MidwifeCard
              id="6"
              name="Magdalena Zielińska"
              specialty="Sexologist, Women's Health"
              rating={4.8}
              reviewCount={103}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with long hair smiling"
            />
          </div>
        </TabsContent>
        <TabsContent value="lactation" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MidwifeCard
              id="1"
              name="Dr. Anna Kowalska"
              specialty="Certified Lactation Consultant"
              rating={4.9}
              reviewCount={124}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with blonde hair smiling"
            />
            <MidwifeCard
              id="7"
              name="Barbara Kamińska"
              specialty="Lactation Consultant, Postnatal Care"
              rating={4.7}
              reviewCount={92}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with curly hair smiling"
            />
          </div>
        </TabsContent>
        <TabsContent value="birth" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MidwifeCard
              id="3"
              name="Joanna Wiśniewska"
              specialty="Birth Preparation Specialist"
              rating={4.8}
              reviewCount={112}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with black hair smiling"
            />
          </div>
        </TabsContent>
        <TabsContent value="gynecology" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MidwifeCard
              id="2"
              name="Maria Nowak"
              specialty="Urogynecological Therapist"
              rating={4.7}
              reviewCount={98}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with brown hair smiling"
            />
            <MidwifeCard
              id="6"
              name="Magdalena Zielińska"
              specialty="Sexologist, Women's Health"
              rating={4.8}
              reviewCount={103}
              location="Warsaw"
              imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with long hair smiling"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* No Results Fallback */}
      {false && (
        <Card className="bg-pink-50/50">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <SearchIcon className="h-12 w-12 text-pink-300 mb-4" />
            <h3 className="text-lg font-medium">No Midwives Found</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
              We couldn't find any midwives matching your search criteria. Try adjusting your filters or search in a
              different location.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Suggested alternatives:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge className="bg-pink-100 hover:bg-pink-200 text-pink-800">Krakow (5 midwives)</Badge>
                <Badge className="bg-pink-100 hover:bg-pink-200 text-pink-800">Wroclaw (3 midwives)</Badge>
                <Badge className="bg-pink-100 hover:bg-pink-200 text-pink-800">Poznan (4 midwives)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
