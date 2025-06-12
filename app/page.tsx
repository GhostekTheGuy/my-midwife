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
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="relative z-10 px-6 py-8 md:py-12">
          {/* Mobile Layout - Vertical Stack */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
            {/* Text Content */}
            <div className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight select-text">
                {t("home.hero.title")}
              </h1>
              <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 select-text">
                {t("home.hero.description")}
              </p>

              {/* Lottie Animation - Responsive - Moved above buttons and made 20% smaller */}
              <div className="w-full max-w-[240px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[480px] mx-auto lg:hidden">
                <div className="aspect-square relative">
                  <DotLottieReact
                    src="https://lottie.host/d0ff7847-e295-426a-b21e-0f650053fecd/8BRjiu3KzU.lottie"
                    loop
                    autoplay
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-white/90 pointer-events-auto">
                  <Link href="/search">
                    <Search className="mr-2 h-5 w-5" />
                    {t("home.hero.findMidwife")}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10 pointer-events-auto"
                >
                  <Link href="/about">{t("home.hero.aboutUs")}</Link>
                </Button>
              </div>
            </div>

            {/* Lottie Animation - Desktop only - Made 20% smaller */}
            <div className="hidden lg:block w-full max-w-[400px] lg:max-w-[480px] xl:max-w-[560px] mx-auto lg:mx-0 lg:w-1/2 xl:w-2/5">
              <div className="aspect-square relative">
                <DotLottieReact
                  src="https://lottie.host/d0ff7847-e295-426a-b21e-0f650053fecd/8BRjiu3KzU.lottie"
                  loop
                  autoplay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">150+</div>
            <div className="text-sm text-muted-foreground">{t("home.stats.certifiedMidwives")}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-sm text-muted-foreground">{t("home.stats.happyPatients")}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">{t("home.stats.supportAvailable")}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-sm text-muted-foreground">{t("home.stats.satisfactionRate")}</div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t("home.quickActions.title")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link href="/search">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Search className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">{t("home.quickActions.findMidwife")}</h3>
                <p className="text-xs text-muted-foreground">{t("home.quickActions.searchDescription")}</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/appointments">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Calendar className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">{t("home.quickActions.bookVisit")}</h3>
                <p className="text-xs text-muted-foreground">{t("home.quickActions.scheduleDescription")}</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/diary">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Heart className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">{t("home.quickActions.healthDiary")}</h3>
                <p className="text-xs text-muted-foreground">{t("home.quickActions.trackDescription")}</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/bmi-calculator">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Calculator className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">{t("home.quickActions.bmiCalculator")}</h3>
                <p className="text-xs text-muted-foreground">{t("home.quickActions.bmiDescription")}</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/nutrition">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Utensils className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">{t("home.quickActions.nutrition")}</h3>
                <p className="text-xs text-muted-foreground">{t("home.quickActions.nutritionDescription")}</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/chat">
            <Card className="h-32 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100 transition-all hover:scale-105">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <MessageCircle className="h-6 w-6 text-pink-600 mb-2" />
                <h3 className="font-medium text-sm mb-1">{t("home.quickActions.chat")}</h3>
                <p className="text-xs text-muted-foreground">{t("home.quickActions.chatDescription")}</p>
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
              <h2 className="text-2xl font-semibold">{t("home.upcomingAppointment")}</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/appointments">{t("home.viewAll")}</Link>
              </Button>
            </div>
            <UpcomingAppointment />
          </section>

          {/* Featured Midwives */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">{t("home.featuredMidwives")}</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/search">{t("home.viewAll")}</Link>
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
                imageUrl="/placeholder.svg?height=200&width=200"
              />
              <MidwifeCard
                id="2"
                name="Maria Nowak"
                specialty="Urogynecological Therapist"
                rating={4.7}
                reviewCount={98}
                location="Krakow"
                imageUrl="/placeholder.svg?height=200&width=200"
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
                {t("home.healthInsights.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">{t("home.healthInsights.bmiStatus")}</p>
                    <p className="text-sm text-green-600">{t("home.healthInsights.normalRange")}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">24.3</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">{t("home.healthInsights.nextCheckup")}</p>
                    <p className="text-sm text-blue-600">{t("home.healthInsights.inTwoWeeks")}</p>
                  </div>
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-purple-800">{t("home.healthInsights.diaryEntries")}</p>
                    <p className="text-sm text-purple-600">{t("home.healthInsights.fiveThisWeek")}</p>
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
                {t("home.progress.title")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("home.progress.appointments")}</span>
                  <span className="font-medium">{t("home.progress.appointmentsCompleted")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("home.progress.diaryEntries")}</span>
                  <span className="font-medium">{t("home.progress.entriesCount")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("home.progress.healthGoals")}</span>
                  <span className="font-medium">{t("home.progress.goalsProgress")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Tips */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t("home.healthTip.title")}</h3>
              <div className="space-y-3">
                <div className="relative w-full h-32">
                  <Image
                    src="/placeholder.svg?height=128&width=300"
                    alt="Health tip"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h4 className="font-medium">{t("home.healthTip.prenatalNutrition")}</h4>
                <p className="text-sm text-muted-foreground">{t("home.healthTip.description")}</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/health-tips">{t("common.readMore")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}