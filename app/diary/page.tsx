import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DiaryEntryForm } from "@/components/diary-entry-form"
import { DiaryEntryList } from "@/components/diary-entry-list"
import { DiaryStats } from "@/components/diary-stats"
import { Plus } from "lucide-react"

export default function DiaryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Health Diary</h1>
          <p className="text-muted-foreground">Track your symptoms and wellbeing</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      <Tabs defaultValue="entries">
        <TabsList>
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
        </TabsList>
        <TabsContent value="entries" className="space-y-4 mt-4">
          <DiaryEntryForm />
          <DiaryEntryList />
        </TabsContent>
        <TabsContent value="stats" className="mt-4">
          <DiaryStats />
        </TabsContent>
        <TabsContent value="share" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Health Data</CardTitle>
              <CardDescription>Share your health diary with your midwife or export it as a PDF</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Share with Midwife</h3>
                <p className="text-sm text-muted-foreground">
                  Your midwife will be able to view your health diary entries
                </p>
                <Button>Share with Dr. Anna Kowalska</Button>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Export as PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Download your health diary as a PDF file to share via email
                </p>
                <div className="flex gap-2">
                  <Button variant="outline">Last 7 Days</Button>
                  <Button variant="outline">Last 30 Days</Button>
                  <Button variant="outline">Custom Range</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
