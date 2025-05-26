import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Paperclip, Send } from "lucide-react"
import Link from "next/link"

export default function ChatDetailPage({ params }: { params: { id: string } }) {
  // This would normally come from an API based on the ID
  const conversation = {
    id: params.id,
    midwife: {
      id: "1",
      name: "Dr. Anna Kowalska",
      specialty: "Certified Lactation Consultant",
      avatar: "/placeholder.svg?height=48&width=48&query=female doctor with blonde hair smiling",
      isOnline: true,
    },
    messages: [
      {
        id: "1",
        sender: "midwife",
        text: "Hello! How are you feeling today?",
        time: "10:15 AM",
      },
      {
        id: "2",
        sender: "user",
        text: "Hi Dr. Anna! I'm feeling better today, thank you for asking.",
        time: "10:20 AM",
      },
      {
        id: "3",
        sender: "midwife",
        text: "That's great to hear! Did the breastfeeding techniques we discussed help?",
        time: "10:25 AM",
      },
      {
        id: "4",
        sender: "midwife",
        text: "Remember, it's normal to experience some discomfort initially, but it should improve with proper technique.",
        time: "10:26 AM",
      },
      {
        id: "5",
        sender: "user",
        text: "Yes, they did help a lot! The cradle hold position is working well for us now. I still have some questions about milk supply though.",
        time: "10:28 AM",
      },
      {
        id: "6",
        sender: "midwife",
        text: "Hello! How are you feeling today? Did the breastfeeding techniques we discussed help?",
        time: "10:30 AM",
      },
    ],
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <div className="flex items-center gap-4 pb-4 border-b">
        <Button variant="ghost" size="icon" asChild className="md:hidden">
          <Link href="/chat">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={conversation.midwife.avatar || "/placeholder.svg"}
            alt={conversation.midwife.name}
            fill
            className="object-cover rounded-full"
          />
          {conversation.midwife.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
          )}
        </div>
        <div>
          <h2 className="font-medium">{conversation.midwife.name}</h2>
          <p className="text-xs text-muted-foreground">{conversation.midwife.specialty}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {conversation.messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender === "midwife" && (
              <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                <Image
                  src={conversation.midwife.avatar || "/placeholder.svg"}
                  alt={conversation.midwife.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            )}
            <div className="max-w-[75%]">
              <div
                className={`p-3 rounded-lg ${
                  message.sender === "user" ? "bg-pink-500 text-white rounded-br-none" : "bg-gray-100 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 px-1">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="pt-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input placeholder="Type a message..." className="flex-1" />
          <Button size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This chat is for appointment coordination only. For medical advice, please book an appointment.
        </p>
      </div>
    </div>
  )
}
