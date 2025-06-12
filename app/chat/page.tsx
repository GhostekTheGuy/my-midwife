import { Card, CardContent } from "@/components/ui/card"
import { ChatList } from "@/components/chat-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Chat with your midwives</p>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <ChatList />
        </TabsContent>
        <TabsContent value="archived" className="mt-4">
          <Card className="bg-pink-50/50">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <p className="text-muted-foreground">No archived conversations</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
