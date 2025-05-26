"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export function DiaryStats() {
  // This would normally come from an API or state
  const bloodPressureData = [
    { date: "May 19", systolic: 118, diastolic: 78 },
    { date: "May 20", systolic: 120, diastolic: 80 },
    { date: "May 21", systolic: 119, diastolic: 79 },
    { date: "May 22", systolic: 121, diastolic: 81 },
    { date: "May 23", systolic: 122, diastolic: 82 },
    { date: "May 24", systolic: 118, diastolic: 78 },
    { date: "May 25", systolic: 120, diastolic: 80 },
  ]

  const moodData = [
    { date: "May 19", value: 4 },
    { date: "May 20", value: 5 },
    { date: "May 21", value: 3 },
    { date: "May 22", value: 4 },
    { date: "May 23", value: 2 },
    { date: "May 24", value: 5 },
    { date: "May 25", value: 4 },
  ]

  const symptomData = [
    { name: "Fatigue", count: 5 },
    { name: "Headache", count: 3 },
    { name: "Nausea", count: 2 },
    { name: "Breast Tenderness", count: 4 },
    { name: "Cramps", count: 1 },
    { name: "Mood Swings", count: 3 },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="blood-pressure">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="blood-pressure">Blood Pressure</TabsTrigger>
          <TabsTrigger value="mood">Mood</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
        </TabsList>

        <TabsContent value="blood-pressure" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure Trends</CardTitle>
              <CardDescription>Your blood pressure readings over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bloodPressureData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="systolic" stroke="#f472b6" name="Systolic" />
                    <Line type="monotone" dataKey="diastolic" stroke="#9d174d" name="Diastolic" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Average Systolic</p>
                  <p className="text-2xl font-bold text-pink-600">120</p>
                  <p className="text-xs text-muted-foreground">mmHg</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Average Diastolic</p>
                  <p className="text-2xl font-bold text-pink-600">80</p>
                  <p className="text-xs text-muted-foreground">mmHg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Trends</CardTitle>
              <CardDescription>Your mood patterns over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#f472b6" name="Mood" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <div className="text-center">
                  <div>😄</div>
                  <div>Great (5)</div>
                </div>
                <div className="text-center">
                  <div>🙂</div>
                  <div>Good (4)</div>
                </div>
                <div className="text-center">
                  <div>😐</div>
                  <div>Neutral (3)</div>
                </div>
                <div className="text-center">
                  <div>😴</div>
                  <div>Tired (2)</div>
                </div>
                <div className="text-center">
                  <div>🙁</div>
                  <div>Bad (1)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Symptom Frequency</CardTitle>
              <CardDescription>Most common symptoms in the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={symptomData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#f472b6" name="Occurrences" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Health Insights</CardTitle>
          <CardDescription>Personalized observations based on your diary entries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium">Blood Pressure</h4>
            <p className="text-sm mt-1">Your blood pressure has been within normal range over the past week.</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium">Mood Patterns</h4>
            <p className="text-sm mt-1">
              Your mood tends to improve on weekends. Consider what activities might be contributing to this pattern.
            </p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium">Symptom Correlation</h4>
            <p className="text-sm mt-1">
              Fatigue and headaches often occur together in your entries. Consider discussing this with your midwife.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
