import Link from "next/link"
import { Calendar, Heart, Home, MessageCircle, Search } from "lucide-react"

export function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t md:hidden">
      <div className="grid h-full grid-cols-5">
        <Link href="/" className="flex flex-col items-center justify-center text-pink-600">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/search"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-pink-600"
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link
          href="/appointments"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-pink-600"
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Calendar</span>
        </Link>
        <Link
          href="/diary"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-pink-600"
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs mt-1">Diary</span>
        </Link>
        <Link
          href="/chat"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-pink-600"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs mt-1">Chat</span>
        </Link>
      </div>
    </div>
  )
}
