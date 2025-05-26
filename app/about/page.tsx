"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award, Target } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="relative p-6 md:p-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">About MyMidwife</h1>
            <p className="text-white/90 text-lg md:text-xl">
              Connecting women with qualified midwives for comprehensive perinatal care
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Meet Asia, Our Founder</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hey, I'm Asia, and I'm a second-year midwifery student at the Medical University of Warsaw (WUM). I
                created this app with the vision of revolutionizing how women access midwifery care and support
                throughout their pregnancy journey.
              </p>
              <p>
                During my studies, I noticed a significant gap between the demand for personalized midwifery care and
                the accessibility of qualified professionals. Many women struggle to find the right midwife who matches
                their specific needs, location, and preferences.
              </p>
              <p>
                MyMidwife was born from my passion to bridge this gap. I wanted to create a platform where women could
                easily connect with certified midwives, access educational resources, track their health journey, and
                receive the personalized care they deserve during one of the most important times in their lives.
              </p>
              <p>
                This app represents my commitment to improving maternal healthcare accessibility and empowering women
                with the tools and connections they need for a healthy, supported pregnancy experience.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              <Image src="/images/asia-founder.jpg" alt="Asia - Founder of MyMidwife" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-none shadow-lg">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Compassionate Care</h3>
                <p className="text-gray-600 text-sm">
                  Providing empathetic, personalized support for every woman's unique journey
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Community</h3>
                <p className="text-gray-600 text-sm">
                  Building connections between women and qualified healthcare professionals
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">
                  Ensuring the highest standards of midwifery care and professional service
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
                <p className="text-gray-600 text-sm">
                  Making quality midwifery care accessible to all women, regardless of location
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What MyMidwife Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Find Qualified Midwives</h3>
                <p className="text-gray-600">
                  Search and connect with certified midwives based on location, specialties, and availability
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Health Tracking</h3>
                <p className="text-gray-600">
                  Monitor your pregnancy journey with our comprehensive health diary and BMI calculator
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Appointment Management</h3>
                <p className="text-gray-600">Easy scheduling and management of appointments with your chosen midwife</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Nutrition Guidance</h3>
                <p className="text-gray-600">
                  Personalized nutrition plans and meal tracking for optimal maternal health
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Direct Communication</h3>
                <p className="text-gray-600">
                  Secure messaging system to stay connected with your midwife between appointments
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Educational Resources</h3>
                <p className="text-gray-600">Access to evidence-based information and tips for a healthy pregnancy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-pink-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of women who have found their perfect midwife through MyMidwife. Start your personalized
          pregnancy care journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
            <Link href="/search">Find a Midwife</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/register">Sign Up Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
