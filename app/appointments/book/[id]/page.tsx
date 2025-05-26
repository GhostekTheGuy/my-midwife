import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock, Home, MapPin, Video } from "lucide-react"

export default function BookAppointmentPage({ params }: { params: { id: string } }) {
  // This would normally come from an API based on the ID and query params
  const midwife = {
    id: params.id,
    name: "Dr. Anna Kowalska",
    specialty: "Certified Lactation Consultant",
    avatar: "/placeholder.svg?height=80&width=80&query=female doctor with blonde hair smiling",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Book Appointment</h1>
        <p className="text-muted-foreground">Schedule an appointment with {midwife.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Select your preferred date, time, and type of appointment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>May 27, 2023</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    9:00 AM
                  </Button>
                  <Button variant="outline" className="justify-start bg-pink-50 border-pink-200 text-pink-600">
                    <Clock className="h-4 w-4 mr-2" />
                    10:00 AM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    11:00 AM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    1:00 PM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    2:00 PM
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    3:00 PM
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <RadioGroup defaultValue="online">
                  <div className="flex items-start space-x-2 p-4 rounded-lg border">
                    <RadioGroupItem value="online" id="online" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="online" className="flex items-center">
                        <Video className="h-5 w-5 text-pink-600 mr-2" />
                        Online Consultation
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Video call via Google Meet. You'll receive a link after booking.
                      </p>
                      <p className="text-sm font-medium mt-1">Duration: 45 minutes</p>
                      <p className="text-sm font-medium">Price: 150 PLN</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-4 rounded-lg border mt-2">
                    <RadioGroupItem value="office" id="office" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="office" className="flex items-center">
                        <MapPin className="h-5 w-5 text-pink-600 mr-2" />
                        In-Office Visit
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Visit at the midwife's office: ul. Mokotowska 15, Warsaw
                      </p>
                      <p className="text-sm font-medium mt-1">Duration: 60 minutes</p>
                      <p className="text-sm font-medium">Price: 200 PLN</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-4 rounded-lg border mt-2">
                    <RadioGroupItem value="home" id="home" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="home" className="flex items-center">
                        <Home className="h-5 w-5 text-pink-600 mr-2" />
                        Home Visit
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        The midwife will visit you at your home address
                      </p>
                      <p className="text-sm font-medium mt-1">Duration: 90 minutes</p>
                      <p className="text-sm font-medium">Price: 300 PLN</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Please describe the reason for your appointment..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Enter your payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name-on-card">Name on Card</Label>
                <Input id="name-on-card" placeholder="Anna Nowak" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={midwife.avatar || "/placeholder.svg"}
                    alt={midwife.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{midwife.name}</h3>
                  <p className="text-sm text-muted-foreground">{midwife.specialty}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>May 27, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span>10:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>Online Consultation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>45 minutes</span>
                </div>
                <div className="flex justify-between font-medium pt-2">
                  <span>Total:</span>
                  <span>150 PLN</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button size="lg">Confirm & Pay</Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`/midwife/${params.id}`}>Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
