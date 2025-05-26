import Link from "next/link"
import { Calculator, Calendar, Heart, Home, MessageCircle, Search, Settings, User, Utensils } from "lucide-react"

export function MainMenu() {
  return (
    <nav className="flex flex-col gap-4 py-4">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-pink-600">MyMidwife</h2>
        <p className="text-sm text-muted-foreground">Your perinatal health companion</p>
      </div>
      <div className="px-2">
        <div className="space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-pink-100"
          >
            <Home className="h-5 w-5 text-pink-600" />
            <span>Home</span>
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-pink-100"
          >
            <Search className="h-5 w-5 text-pink-600" />
            <span>Find Midwife</span>
          </Link>
          <Link
            href="/appointments"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-pink-100"
          >
            <Calendar className="h-5 w-5 text-pink-600" />
            <span>Appointments</span>
          </Link>
          <Link
            href="/diary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-pink-100"
          >
            <Heart className="h-5 w-5 text-pink-600" />
            <span>Health Diary</span>
          </Link>
          <Link
            href="/bmi-calculator"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-pink-100"
          >
            <Calculator className="h-5 w-5 text-pink-600" />
            <span>BMI Calculator</span>
          </Link>
          <Link
            href="/nutrition"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-pink-100"
          >
            <Utensils className="h-5 w-5 text-pink-600" />
            <span>Nutrition</span>
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-pink-100"
          >
            <MessageCircle className="h-5 w-5 text-pink-600" />
            <span>Chat</span>
          </Link>
        </div>
      </div>
      <div className="px-2 mt-4">
        <div className="space-y-1">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-pink-100"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-pink-100"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
