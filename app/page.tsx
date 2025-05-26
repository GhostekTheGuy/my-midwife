"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Calculator, Heart, MessageCircle, Search, Utensils, TrendingUp, Clock, Users } from "lucide-react"
import { MidwifeCard } from "@/components/midwife-card"
import { UpcomingAppointment } from "@/components/upcoming-appointment"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
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
        <div className="relative p-6 md:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <Badge className="bg-white/20 hover:bg-white/30 text-white w-fit">{t("app.description")}</Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find the perfect midwife for your needs
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Connect with qualified midwives specializing in intimate and perinatal health services
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-white/90">
                <Link href="/search">
                  <Search className="mr-2 h-5 w-5" />
                  Find a Midwife
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-1/3 aspect-square relative max-w-md">
            <Image
              src="/placeholder.svg?height=400&width=400&query=female midwife in pink uniform smiling"
              alt="Midwife"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Certified Midwives</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-sm text-muted-foreground">Happy Patients</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link href="/search">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Search className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">Find Midwife</h3>
                <p className="text-xs text-muted-foreground">Search by location & services</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/appointments">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Calendar className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">Book Visit</h3>
                <p className="text-xs text-muted-foreground">Schedule appointments</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/diary">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Heart className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">Health Diary</h3>
                <p className="text-xs text-muted-foreground">Track your wellbeing</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/bmi-calculator">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Calculator className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">BMI Calculator</h3>
                <p className="text-xs text-muted-foreground">Check your body mass index</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/nutrition">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Utensils className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">Nutrition</h3>
                <p className="text-xs text-muted-foreground">Track meals & get plans</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/chat">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <MessageCircle className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">Chat</h3>
                <p className="text-xs text-muted-foreground">Message your midwife</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Upcoming Appointment */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Upcoming Appointment</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/appointments">View All</Link>
              </Button>
            </div>
            <UpcomingAppointment />
          </section>

          {/* Featured Midwives */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Featured Midwives</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/search">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          {/* Health Insights */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-pink-600 mr-2" />
                Health Insights
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">BMI Status</p>
                    <p className="text-sm text-green-600">Normal Range</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">24.3</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">Next Checkup</p>
                    <p className="text-sm text-blue-600">In 2 weeks</p>
                  </div>
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-purple-800">Diary Entries</p>
                    <p className="text-sm text-purple-600">5 this week</p>
                  </div>
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 text-pink-600 mr-2" />
                Your Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Appointments</span>
                  <span className="font-medium">12 completed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Diary entries</span>
                  <span className="font-medium">45 entries</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Health goals</span>
                  <span className="font-medium">3 of 5 met</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Tips */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Health Tip</h3>
              <div className="space-y-3">
                <div className="relative w-full h-32">
                  <Image
                    src="/placeholder.svg?height=128&width=300&query=healthy pregnancy nutrition"
                    alt="Health tip"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h4 className="font-medium">Prenatal Nutrition</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure you're getting enough folic acid, iron, and calcium during pregnancy for optimal health.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
