"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, MessageCircle, Star, Video } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface AppointmentListProps {
  type: "upcoming" | "past"
}

export function AppointmentList({ type }: AppointmentListProps) {
  const { t } = useLanguage()

  // This would normally come from an API or state
  const upcomingAppointments = [
    {
      id: "1",
      midwife: {
        id: "1",
        name: "Dr. Anna Kowalska",
        specialty: "Certified Lactation Consultant",
        avatar: "/placeholder.svg?height=80&width=80&query=female doctor with blonde hair smiling",
      },
      date: "Tomorrow, May 27",
      time: "10:00 AM",
      type: "Online Consultation",
      location: "Google Meet",
      status: "confirmed",
    },
    {
      id: "2",
      midwife: {
        id: "2",
        name: "Maria Nowak",
        specialty: "Urogynecological Therapist",
        avatar: "/placeholder.svg?height=80&width=80&query=female doctor with brown hair smiling",
      },
      date: "June 3, 2023",
      time: "2:00 PM",
      type: "In-Office Visit",
      location: "ul. Mokotowska 15, Warsaw",
      status: "confirmed",
    },
  ]

  const pastAppointments = [
    {
      id: "3",
      midwife: {
        id: "1",
        name: "Dr. Anna Kowalska",
        specialty: "Certified Lactation Consultant",
        avatar: "/placeholder.svg?height=80&width=80&query=female doctor with blonde hair smiling",
      },
      date: "May 13, 2023",
      time: "11:30 AM",
      type: "Online Consultation",
      location: "Google Meet",
      status: "completed",
      hasReview: false,
    },
    {
      id: "4",
      midwife: {
        id: "3",
        name: "Joanna Wiśniewska",
        specialty: "Birth Preparation Specialist",
        avatar: "/placeholder.svg?height=80&width=80&query=female doctor with black hair smiling",
      },
      date: "May 5, 2023",
      time: "3:00 PM",
      type: "In-Office Visit",
      location: "ul. Krakowska 5, Warsaw",
      status: "completed",
      hasReview: true,
    },
  ]

  const appointments = type === "upcoming" ? upcomingAppointments : pastAppointments

  if (appointments.length === 0) {
    return (
      <Card className="bg-pink-50/50">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Calendar className="h-12 w-12 text-pink-300 mb-4" />
          <h3 className="text-lg font-medium">
            {type === "upcoming" ? t("appointments.noUpcoming") : t("appointments.noPast")}
          </h3>
          {type === "upcoming" ? (
            <p className="text-sm text-muted-foreground mt-2 mb-4">{t("appointments.noAppointments")}</p>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">You don't have any past appointments.</p>
          )}
          {type === "upcoming" && (
            <Button asChild>
              <Link href="/search">{t("appointments.findMidwife")}</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  const getAppointmentType = (type: string) => {
    switch (type) {
      case "Online Consultation":
        return t("appointments.types.online")
      case "In-Office Visit":
        return t("appointments.types.office")
      case "Home Visit":
        return t("appointments.types.home")
      default:
        return type
    }
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-20 h-20 flex-shrink-0">
                <Image
                  src={appointment.midwife.avatar || "/placeholder.svg"}
                  alt={appointment.midwife.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{appointment.midwife.name}</h3>
                  <p className="text-sm text-muted-foreground">{appointment.midwife.specialty}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-pink-600" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-pink-600" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {appointment.type === "Online Consultation" ? (
                      <Video className="h-4 w-4 text-pink-600" />
                    ) : (
                      <MapPin className="h-4 w-4 text-pink-600" />
                    )}
                    <span>{getAppointmentType(appointment.type)}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {type === "upcoming" ? (
                    <>
                      <Button variant="outline" size="sm" className="h-8">
                        {t("appointments.reschedule")}
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        {t("appointments.cancel")}
                      </Button>
                      {appointment.type === "Online Consultation" && (
                        <Button size="sm" className="h-8 ml-auto">
                          {t("appointments.join")}
                        </Button>
                      )}
                      <Button size="sm" className="h-8" asChild>
                        <Link href={`/chat/${appointment.midwife.id}`}>
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {t("appointments.message")}
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      {!appointment.hasReview ? (
                        <Button size="sm" className="h-8">
                          <Star className="h-4 w-4 mr-1" />
                          {t("appointments.review")}
                        </Button>
                      ) : (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {t("appointments.reviewed")}
                        </Badge>
                      )}
                      <Button variant="outline" size="sm" className="h-8 ml-auto">
                        {t("appointments.bookAgain")}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
