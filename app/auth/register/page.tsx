import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16">
              <Image
                src="/placeholder.svg?height=64&width=64&query=pink heart with stethoscope logo"
                alt="MyMidwife Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-2">
            <Label>I am a</Label>
            <RadioGroup defaultValue="patient" className="flex">
              <div className="flex items-center space-x-2 mr-4">
                <RadioGroupItem value="patient" id="patient" />
                <Label htmlFor="patient">Patient</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="midwife" id="midwife" />
                <Label htmlFor="midwife">Midwife</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-pink-600 hover:text-pink-700">
                terms of service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-pink-600 hover:text-pink-700">
                privacy policy
              </Link>
            </Label>
          </div>
          <Button className="w-full">Create Account</Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-pink-600 hover:text-pink-700">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
