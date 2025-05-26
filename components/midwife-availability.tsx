"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Clock, Video, MapPin, Home } from "lucide-react"

interface MidwifeAvailabilityProps {
  midwifeId: string
}

export function MidwifeAvailability({ midwifeId }: MidwifeAvailabilityProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // This would normally come from an API
  const availableSlots = [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "12:00 PM", available: false },
    { time: "01:00 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: false },
    { time: "05:00 PM", available: true },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-4">Select a Date</h3>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-4">Available Time Slots</h3>
              {date ? (
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant={slot.available ? "outline" : "ghost"}
                      className={`justify-start ${
                        slot.available
                          ? "hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!slot.available}
                      asChild={slot.available}
                    >
                      {slot.available ? (
                        <Link href={`/appointments/book/${midwifeId}?date=${date.toISOString()}&time=${slot.time}`}>
                          <Clock className="h-4 w-4 mr-2" />
                          {slot.time}
                        </Link>
                      ) : (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {slot.time}
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Please select a date to see available slots</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Appointment Types</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border">
              <Video className="h-5 w-5 text-pink-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Online Consultation</h4>
                <p className="text-sm text-muted-foreground">
                  Video call via Google Meet. You'll receive a link after booking.
                </p>
                <p className="text-sm font-medium mt-1">Duration: 45 minutes</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-medium">150 PLN</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border">
              <MapPin className="h-5 w-5 text-pink-600 mt-0.5" />
              <div>
                <h4 className="font-medium">In-Office Visit</h4>
                <p className="text-sm text-muted-foreground">
                  Visit at the midwife's office: ul. Mokotowska 15, Warsaw
                </p>
                <p className="text-sm font-medium mt-1">Duration: 60 minutes</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-medium">200 PLN</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border">
              <Home className="h-5 w-5 text-pink-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Home Visit</h4>
                <p className="text-sm text-muted-foreground">The midwife will visit you at your home address</p>
                <p className="text-sm font-medium mt-1">Duration: 90 minutes</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-medium">300 PLN</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
