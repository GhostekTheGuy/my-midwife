import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, MessageCircle, Star } from "lucide-react"
import { MidwifeAvailability } from "@/components/midwife-availability"
import { MidwifeReviews } from "@/components/midwife-reviews"

export default async function MidwifeProfilePage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  
  // This would normally come from an API based on the ID
  const midwife = {
    id: resolvedParams.id,
    name: "Dr. Anna Kowalska",
    specialty: "Certified Lactation Consultant",
    bio: "I am a certified lactation consultant with over 10 years of experience helping new mothers. I specialize in breastfeeding support, latch issues, and milk supply concerns. My approach is gentle, patient-centered, and focused on empowering mothers.",
    rating: 4.9,
    reviewCount: 124,
    location: "Warsaw",
    address: "ul. Mokotowska 15, 00-640 Warsaw",
    services: [
      "Breastfeeding support",
      "Latch assessment",
      "Milk supply consultation",
      "Pumping guidance",
      "Newborn weight checks",
      "Weaning support",
    ],
    education: [
      "Master's in Nursing, Warsaw Medical University",
      "International Board Certified Lactation Consultant (IBCLC)",
      "Certified Midwife",
    ],
    languages: ["Polish", "English"],
    imageUrl: "/placeholder.svg?height=400&width=400&query=female doctor with blonde hair smiling",
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-40 h-40 flex-shrink-0">
              <Image
                src={midwife.imageUrl || "/placeholder.svg"}
                alt={midwife.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl font-bold">{midwife.name}</h1>
                  <Badge variant="outline" className="flex items-center gap-1 bg-pink-50">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{midwife.rating}</span>
                    <span className="text-xs text-muted-foreground">({midwife.reviewCount})</span>
                  </Badge>
                </div>
                <p className="text-pink-600">{midwife.specialty}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{midwife.address}</span>
              </div>
              <p className="text-sm">{midwife.bio}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button asChild>
                  <Link href={`/appointments/book/${midwife.id}`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/chat/${midwife.id}`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="about">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {midwife.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="bg-pink-50">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Education & Certifications</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {midwife.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {midwife.languages.map((language, index) => (
                    <Badge key={index} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="availability" className="mt-4">
          <MidwifeAvailability midwifeId={midwife.id} />
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <MidwifeReviews midwifeId={midwife.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}