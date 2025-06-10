"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChatList } from "@/components/chat-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileLayout } from "@/components/mobile-layout"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

export default function ChatPage() {
  const { t } = useLanguage()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <MobileLayout enablePullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-4 p-4 pb-24 md:pb-6">
        <div className="mobile-section">
          <h1 className="text-2xl md:text-3xl font-bold heading-responsive">{t("nav.chat")}</h1>
          <p className="text-muted-foreground text-responsive mt-1">Chat with your midwives</p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
            <TabsTrigger value="active" className="touch-target text-sm font-medium">
              Active
            </TabsTrigger>
            <TabsTrigger value="archived" className="touch-target text-sm font-medium">
              Archived
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-0">
            <ChatList />
          </TabsContent>

          <TabsContent value="archived" className="mt-0">
            <Card className="bg-pink-50/50 mobile-card">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <p className="text-muted-foreground font-medium">No archived conversations</p>
                <p className="text-sm text-muted-foreground mt-2">Archived chats will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}
