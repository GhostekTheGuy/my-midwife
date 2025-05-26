import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Star } from "lucide-react"

interface MidwifeCardProps {
  id: string
  name: string
  specialty: string
  rating: number
  reviewCount: number
  location: string
  imageUrl: string
}

export function MidwifeCard({ id, name, specialty, rating, reviewCount, location, imageUrl }: MidwifeCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{specialty}</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1 bg-pink-50">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button asChild className="flex-1">
              <Link href={`/midwife/${id}`}>View Profile</Link>
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
