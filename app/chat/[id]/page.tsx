"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Paperclip, Send, Phone, Video, MoreVertical } from "lucide-react"
import Link from "next/link"
import { MobileLayout } from "@/components/mobile-layout"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ChatDetailPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // This would normally come from an API based on the ID
  const conversation = {
    id: params.id,
    midwife: {
      id: "1",
      name: "Dr. Anna Kowalska",
      specialty: "Certified Lactation Consultant",
      avatar: "/placeholder.svg?height=48&width=48",
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
        text: "I'm glad to hear that! Regarding milk supply, there are several factors that can help increase production. Would you like me to share some tips?",
        time: "10:30 AM",
      },
    ],
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation.messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would send the message to your API
      console.log("Sending message:", message)
      setMessage("")

      // Haptic feedback
      if ("vibrate" in navigator) {
        navigator.vibrate(10)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <MobileLayout className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 safe-area-top">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" asChild className="touch-target md:hidden">
            <Link href="/chat">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>

          <div className="relative w-12 h-12 flex-shrink-0">
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
            <h2 className="font-semibold text-lg truncate">{conversation.midwife.name}</h2>
            <p className="text-sm text-muted-foreground truncate">{conversation.midwife.specialty}</p>
            <p className="text-xs text-green-600">Online now</p>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="touch-target">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="touch-target">
              <Video className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="touch-target">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                <DropdownMenuItem>Archive Chat</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Block User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-safe">
        {conversation.messages.map((msg, index) => (
          <div key={msg.id} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
            {msg.sender === "midwife" && (
              <div className="relative w-8 h-8 mr-3 flex-shrink-0">
                <Image
                  src={conversation.midwife.avatar || "/placeholder.svg"}
                  alt={conversation.midwife.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            )}

            <div className={cn("max-w-[85%] sm:max-w-[75%]", msg.sender === "user" ? "order-1" : "order-2")}>
              <div
                className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  msg.sender === "user"
                    ? "bg-pink-500 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md",
                )}
              >
                <p>{msg.text}</p>
              </div>
              <p
                className={cn(
                  "text-xs text-muted-foreground mt-1 px-1",
                  msg.sender === "user" ? "text-right" : "text-left",
                )}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="relative w-8 h-8 mr-3 flex-shrink-0">
              <Image
                src={conversation.midwife.avatar || "/placeholder.svg"}
                alt={conversation.midwife.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 safe-area-bottom">
        <div className="flex gap-3 items-end">
          <Button variant="outline" size="icon" className="touch-target flex-shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>

          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="mobile-form pr-12 min-h-[44px] resize-none"
              style={{ fontSize: "16px" }} // Prevents zoom on iOS
            />
          </div>

          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="touch-target flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-2 text-center px-4">
          This chat is for appointment coordination only. For medical advice, please book an appointment.
        </p>
      </div>
    </MobileLayout>
  )
}
