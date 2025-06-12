"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChatList } from "@/components/chat-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"

export default function ChatPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="px-1">
        <h1 className="text-xl md:text-2xl font-bold">{t("chat.title")}</h1>
        <p className="text-sm md:text-base text-muted-foreground">{t("chat.description") || "Chat with your midwives"}</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-10 md:h-auto">
          <TabsTrigger value="active" className="text-sm md:text-base">Active</TabsTrigger>
          <TabsTrigger value="archived" className="text-sm md:text-base">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-3 md:mt-4">
          <ChatList />
        </TabsContent>
        <TabsContent value="archived" className="mt-3 md:mt-4">
          <Card className="bg-pink-50/50">
            <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
              <p className="text-sm md:text-base text-muted-foreground">No archived conversations</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}