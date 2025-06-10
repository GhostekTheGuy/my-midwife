"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award, Target } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="relative p-6 md:p-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{t("about.heroTitle")}</h1>
            <p className="text-white/90 text-lg md:text-xl">{t("about.heroSubtitle")}</p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">{t("about.founderTitle")}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{t("about.founderParagraph1")}</p>
              <p>{t("about.founderParagraph2")}</p>
              <p>{t("about.founderParagraph3")}</p>
              <p>{t("about.founderParagraph4")}</p>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <Image src="/images/asia-founder.jpg" alt="Asia - Founder of MyMidwife" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("about.missionValuesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-none shadow-lg">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{t("about.compassionateCareTitle")}</h3>
                <p className="text-gray-600 text-sm">{t("about.compassionateCareDescription")}</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{t("about.communityTitle")}</h3>
                <p className="text-gray-600 text-sm">{t("about.communityDescription")}</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{t("about.excellenceTitle")}</h3>
                <p className="text-gray-600 text-sm">{t("about.excellenceDescription")}</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{t("about.accessibilityTitle")}</h3>
                <p className="text-gray-600 text-sm">{t("about.accessibilityDescription")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t("about.whatOffersTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t("about.findMidwivesTitle")}</h3>
                <p className="text-gray-600">{t("about.findMidwivesDescription")}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t("about.healthTrackingTitle")}</h3>
                <p className="text-gray-600">{t("about.healthTrackingDescription")}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t("about.appointmentManagementTitle")}</h3>
                <p className="text-gray-600">{t("about.appointmentManagementDescription")}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t("about.nutritionGuidanceTitle")}</h3>
                <p className="text-gray-600">{t("about.nutritionGuidanceDescription")}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t("about.directCommunicationTitle")}</h3>
                <p className="text-gray-600">{t("about.directCommunicationDescription")}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t("about.educationalResourcesTitle")}</h3>
                <p className="text-gray-600">{t("about.educationalResourcesDescription")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-pink-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">{t("about.ctaTitle")}</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t("about.ctaSubtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
            <Link href="/search">{t("midwife.find_midwife")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/register">{t("about.signUpToday")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
