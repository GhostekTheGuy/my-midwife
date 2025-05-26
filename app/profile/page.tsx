import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Edit, Settings } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button variant="outline" asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative">
              <div className="relative w-24 h-24">
                <Image
                  src="/placeholder.svg?height=96&width=96&query=woman with brown hair smiling"
                  alt="Profile"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-semibold">Anna Nowak</h2>
              <p className="text-muted-foreground">anna.nowak@example.com</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                <Badge variant="outline" className="bg-pink-50">
                  Patient
                </Badge>
                <Badge variant="outline" className="bg-pink-50">
                  Premium Member
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="health">Health Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="Anna" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Nowak" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="anna.nowak@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+48 123 456 789" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="ul. Marszałkowska 1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Warsaw" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal code</Label>
                  <Input id="postal-code" defaultValue="00-001" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="health" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
              <CardDescription>Your health details help midwives provide better care</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of birth</Label>
                  <Input id="dob" type="date" defaultValue="1990-01-15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blood-type">Blood type</Label>
                  <Input id="blood-type" defaultValue="A+" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" defaultValue="165" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" defaultValue="60" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Input id="allergies" defaultValue="Penicillin" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medications">Current medications</Label>
                  <Input id="medications" defaultValue="None" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medical-conditions">Medical conditions</Label>
                  <Textarea id="medical-conditions" defaultValue="None" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="appointment-reminders">Appointment reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminders about upcoming appointments</p>
                  </div>
                  <Switch id="appointment-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="health-reminders">Health reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about check-ups and health activities
                    </p>
                  </div>
                  <Switch id="health-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="messages">Messages</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about new messages</p>
                  </div>
                  <Switch id="messages" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing emails</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
                  </div>
                  <Switch id="marketing" />
                </div>
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
