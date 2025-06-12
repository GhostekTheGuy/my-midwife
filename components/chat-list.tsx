import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ChatList() {
  // This would normally come from an API or state
  const conversations = [
    {
      id: "1",
      midwife: {
        id: "1",
        name: "Dr. Anna Kowalska",
        specialty: "Certified Lactation Consultant",
        avatar: "/placeholder.svg?height=48&width=48&query=female doctor with blonde hair smiling",
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
        avatar: "/placeholder.svg?height=48&width=48&query=female doctor with brown hair smiling",
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
        avatar: "/placeholder.svg?height=48&width=48&query=female doctor with black hair smiling",
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
      <Card className="bg-pink-50/50">
        <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
          <p className="text-sm md:text-base text-muted-foreground">No conversations yet</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Start a conversation with a midwife by booking an appointment or viewing their profile
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-2 md:space-y-4">
      {conversations.map((conversation) => (
        <Link key={conversation.id} href={`/chat/${conversation.id}`}>
          <Card
            className={`hover:bg-pink-50/50 transition-colors active:scale-[0.98] md:active:scale-100 ${
              conversation.lastMessage.isUnread ? "border-pink-200 bg-pink-50/30" : ""
            }`}
          >
            <CardContent className="p-3 md:p-4 flex gap-3 md:gap-4">
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <Image
                  src={conversation.midwife.avatar || "/placeholder.svg"}
                  alt={conversation.midwife.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm md:text-base truncate">{conversation.midwife.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{conversation.midwife.specialty}</p>
                  </div>
                  <div className="flex flex-col items-end ml-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.lastMessage.time}</span>
                    {conversation.lastMessage.isUnread && (
                      <Badge className="mt-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        <span className="sr-only">Unread message</span>
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs md:text-sm mt-1 line-clamp-2 text-muted-foreground leading-relaxed">
                  {conversation.lastMessage.text}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}