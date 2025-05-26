import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

export function DiaryEntryList() {
  // This would normally come from an API or state
  const entries = [
    {
      id: "1",
      date: "May 25, 2023",
      bloodPressure: "120/80",
      mood: "Good",
      symptoms: ["Fatigue", "Breast Tenderness"],
      notes:
        "Feeling a bit tired today, but otherwise good. Had a light breakfast and took a short walk in the afternoon.",
    },
    {
      id: "2",
      date: "May 24, 2023",
      bloodPressure: "118/78",
      mood: "Great",
      symptoms: [],
      notes: "Feeling energetic and positive today. Had a good night's sleep and ate well.",
    },
    {
      id: "3",
      date: "May 23, 2023",
      bloodPressure: "122/82",
      mood: "Tired",
      symptoms: ["Headache", "Fatigue", "Nausea"],
      notes: "Woke up with a headache. Feeling quite nauseous and tired throughout the day. Rested most of the day.",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Entries</h3>

      {entries.map((entry) => (
        <Card key={entry.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-pink-50 px-4 py-2 flex justify-between items-center">
              <h4 className="font-medium">{entry.date}</h4>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="font-medium">{entry.bloodPressure} mmHg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mood</p>
                  <p className="font-medium">{entry.mood}</p>
                </div>
              </div>

              {entry.symptoms.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Symptoms</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="outline" className="bg-pink-50">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {entry.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{entry.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" className="w-full">
        Load More
      </Button>
    </div>
  )
}
