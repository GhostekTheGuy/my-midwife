import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MessageCircle, Video } from "lucide-react"

export function UpcomingAppointment() {
  // This would normally come from an API or state
  const hasAppointment = true

  if (!hasAppointment) {
    return (
      <Card className="bg-pink-50/50">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Calendar className="h-12 w-12 text-pink-300 mb-4" />
          <h3 className="text-lg font-medium">No Upcoming Appointments</h3>
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            You don't have any scheduled appointments. Find a midwife and book your visit.
          </p>
          <Button asChild>
            <Link href="/search">Find a Midwife</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-24 h-24 flex-shrink-0">
            <Image
              src="/placeholder.svg?height=96&width=96&query=female doctor with blonde hair smiling"
              alt="Dr. Anna Kowalska"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-lg">Dr. Anna Kowalska</h3>
              <p className="text-sm text-muted-foreground">Certified Lactation Consultant</p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-pink-600" />
                <span>Tomorrow, May 27</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-pink-600" />
                <span>10:00 AM</span>
              </div>
              <div className="flex items-center gap-1">
                <Video className="h-4 w-4 text-pink-600" />
                <span>Online Consultation</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" size="sm" className="h-8">
                Reschedule
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                Cancel
              </Button>
              <Button size="sm" className="h-8 ml-auto" asChild>
                <Link href="/chat/1">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
