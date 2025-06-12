"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Paperclip, Send, Phone, Video } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ChatDetailPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")

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
        text: "I'm glad to hear that! Regarding milk supply, there are several factors that can influence it. Would you like to schedule a call to discuss this in detail?",
        time: "10:30 AM",
      },
    ],
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border-b bg-white sticky top-0 z-10">
        <Button variant="ghost" size="icon" asChild className="md:hidden flex-shrink-0">
          <Link href="/chat">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
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
        <div className="flex-1 min-w-0">
          <h2 className="font-medium text-sm md:text-base truncate">{conversation.midwife.name}</h2>
          <p className="text-xs md:text-sm text-muted-foreground truncate">{conversation.midwife.specialty}</p>
        </div>
        <div className="flex gap-1 md:gap-2 flex-shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
            <Phone className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
            <Video className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50">
        {conversation.messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender === "midwife" && (
              <div className="relative w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 flex-shrink-0 mt-1">
                <Image
                  src={conversation.midwife.avatar || "/placeholder.svg"}
                  alt={conversation.midwife.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            )}
            <div className="max-w-[85%] md:max-w-[75%]">
              <div
                className={`p-3 md:p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                  message.sender === "user" 
                    ? "bg-pink-500 text-white rounded-br-md" 
                    : "bg-white border rounded-bl-md shadow-sm"
                }`}
              >
                <p>{message.text}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 px-2">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 md:p-4 border-t bg-white">
        <div className="flex gap-2 md:gap-3 items-end">
          <Button variant="outline" size="icon" className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
            <Paperclip className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              className="pr-12 md:pr-14 min-h-[2.5rem] md:min-h-[3rem] text-sm md:text-base resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center px-2 leading-relaxed">
          This chat is for appointment coordination only. For medical advice, please book an appointment.
        </p>
      </div>
    </div>
  )
}