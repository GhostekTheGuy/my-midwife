"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { MobileCard } from "@/components/mobile-card"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function ChatList() {
  const { isMobile } = useMobile()

  // This would normally come from an API or state
  const conversations = [
    {
      id: "1",
      midwife: {
        id: "1",
        name: "Dr. Anna Kowalska",
        specialty: "Certified Lactation Consultant",
        avatar: "/placeholder.svg?height=48&width=48",
      },
      lastMessage: {
        text: "Hello! How are you feeling today? Did the breastfeeding techniques we discussed help?",
        time: "10:30 AM",
        isUnread: true,
      },
    },
    {
      id: "2",
      midwife: {
        id: "2",
        name: "Maria Nowak",
        specialty: "Urogynecological Therapist",
        avatar: "/placeholder.svg?height=48&width=48",
      },
      lastMessage: {
        text: "Your appointment is confirmed for tomorrow at 2:00 PM. Please let me know if you need to reschedule.",
        time: "Yesterday",
        isUnread: false,
      },
    },
    {
      id: "3",
      midwife: {
        id: "3",
        name: "Joanna Wiśniewska",
        specialty: "Birth Preparation Specialist",
        avatar: "/placeholder.svg?height=48&width=48",
      },
      lastMessage: {
        text: "I've sent you the breathing exercises we practiced. Let me know if you have any questions!",
        time: "May 23",
        isUnread: false,
      },
    },
  ]

  if (conversations.length === 0) {
    return (
      <MobileCard className="bg-pink-50/50">
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">💬</span>
          </div>
          <p className="text-muted-foreground font-medium text-lg">No conversations yet</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            Start a conversation with a midwife by booking an appointment or viewing their profile
          </p>
        </div>
      </MobileCard>
    )
  }

  return (
    <div className="space-y-3">
      {conversations.map((conversation) => (
        <Link key={conversation.id} href={`/chat/${conversation.id}`}>
          <MobileCard
            interactive
            className={cn(
              "hover:bg-pink-50/50 transition-colors",
              conversation.lastMessage.isUnread ? "border-pink-200 bg-pink-50/30 border-2" : "",
            )}
          >
            <div className="flex gap-4 items-start">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src={conversation.midwife.avatar || "/placeholder.svg"}
                  alt={conversation.midwife.name}
                  fill
                  className="object-cover rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base truncate">{conversation.midwife.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{conversation.midwife.specialty}</p>
                  </div>
                  <div className="flex flex-col items-end ml-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {conversation.lastMessage.time}
                    </span>
                    {conversation.lastMessage.isUnread && (
                      <Badge className="mt-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
                        <span className="sr-only">Unread message</span>
                      </Badge>
                    )}
                  </div>
                </div>

                <p
                  className={cn(
                    "text-sm mt-2 line-clamp-2",
                    conversation.lastMessage.isUnread ? "font-medium text-gray-900" : "text-muted-foreground",
                  )}
                >
                  {conversation.lastMessage.text}
                </p>
              </div>
            </div>
          </MobileCard>
        </Link>
      ))}
    </div>
  )
}
