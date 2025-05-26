import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { AppointmentList } from "@/components/appointment-list"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Manage your midwife appointments</p>
        </div>
        <Button asChild>
          <Link href="/search">
            <Plus className="h-4 w-4 mr-2" />
            Book New
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <AppointmentList type="upcoming" />
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <AppointmentList type="past" />
        </TabsContent>
        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <Calendar mode="single" className="rounded-md border" />
              <div className="mt-6 space-y-2">
                <h3 className="font-medium">May 27, 2023</h3>
                <Card className="bg-pink-50/50 border-pink-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <p className="font-medium">Dr. Anna Kowalska</p>
                        <p className="text-sm text-muted-foreground">10:00 AM - Online Consultation</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">Join</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
