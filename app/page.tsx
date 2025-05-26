import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Calculator, Heart, MessageCircle, Search, Utensils } from "lucide-react"
import { MidwifeCard } from "@/components/midwife-card"
import { UpcomingAppointment } from "@/components/upcoming-appointment"

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/placeholder.svg?height=400&width=800&query=abstract pattern with hearts and medical symbols"
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-4">
            <Badge className="bg-white/20 hover:bg-white/30 text-white">Your Health Companion</Badge>
            <h1 className="text-3xl md:text-4xl font-bold">Find the perfect midwife for your needs</h1>
            <p className="text-white/80">
              Connect with qualified midwives specializing in intimate and perinatal health services
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-white text-pink-600 hover:bg-white/90">
                <Link href="/search">Find a Midwife</Link>
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square relative">
            <Image
              src="/placeholder.svg?height=300&width=300&query=female midwife in pink uniform smiling"
              alt="Midwife"
              width={300}
              height={300}
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link href="/search">
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Search className="h-8 w-8 text-pink-600 mb-2" />
              <h3 className="font-medium">Find Midwife</h3>
              <p className="text-xs text-muted-foreground mt-1">Search by location & services</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/appointments">
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 text-pink-600 mb-2" />
              <h3 className="font-medium">Book Visit</h3>
              <p className="text-xs text-muted-foreground mt-1">Schedule appointments</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/diary">
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Heart className="h-8 w-8 text-pink-600 mb-2" />
              <h3 className="font-medium">Health Diary</h3>
              <p className="text-xs text-muted-foreground mt-1">Track your wellbeing</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/bmi-calculator">
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Calculator className="h-8 w-8 text-pink-600 mb-2" />
              <h3 className="font-medium">BMI Calculator</h3>
              <p className="text-xs text-muted-foreground mt-1">Check your body mass index</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/nutrition">
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Utensils className="h-8 w-8 text-pink-600 mb-2" />
              <h3 className="font-medium">Nutrition</h3>
              <p className="text-xs text-muted-foreground mt-1">Track meals & get plans</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/chat">
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <MessageCircle className="h-8 w-8 text-pink-600 mb-2" />
              <h3 className="font-medium">Chat</h3>
              <p className="text-xs text-muted-foreground mt-1">Message your midwife</p>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Upcoming Appointment */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upcoming Appointment</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/appointments">View All</Link>
          </Button>
        </div>
        <UpcomingAppointment />
      </section>

      {/* Featured Midwives */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Midwives</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/search">View All</Link>
          </Button>
        </div>
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
            location="Krakow"
            imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with brown hair smiling"
          />
          <MidwifeCard
            id="3"
            name="Joanna Wiśniewska"
            specialty="Birth Preparation Specialist"
            rating={4.8}
            reviewCount={112}
            location="Wroclaw"
            imageUrl="/placeholder.svg?height=200&width=200&query=female doctor with black hair smiling"
          />
        </div>
      </section>

      {/* Health Tips */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Health Tips</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=80&width=80&query=breastfeeding illustration"
                  alt="Breastfeeding"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">Breastfeeding Tips for New Mothers</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Essential advice for comfortable and effective breastfeeding
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=80&width=80&query=pregnant woman exercising"
                  alt="Pregnancy Exercise"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">Safe Exercises During Pregnancy</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Stay active with these pregnancy-friendly workout routines
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
