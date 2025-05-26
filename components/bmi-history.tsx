"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calendar, TrendingDown, TrendingUp } from "lucide-react"

export function BMIHistory() {
  // This would normally come from an API or state
  const bmiHistory = [
    { date: "2023-01-15", bmi: 24.2, category: "Normal weight" },
    { date: "2023-02-15", bmi: 24.8, category: "Normal weight" },
    { date: "2023-03-15", bmi: 25.1, category: "Overweight" },
    { date: "2023-04-15", bmi: 24.9, category: "Normal weight" },
    { date: "2023-05-15", bmi: 24.5, category: "Normal weight" },
    { date: "2023-05-25", bmi: 24.3, category: "Normal weight" },
  ]

  const chartData = bmiHistory.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    bmi: entry.bmi,
  }))

  const currentBMI = bmiHistory[bmiHistory.length - 1]
  const previousBMI = bmiHistory[bmiHistory.length - 2]
  const trend = currentBMI.bmi - previousBMI.bmi

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Underweight":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Normal weight":
        return "bg-green-50 text-green-700 border-green-200"
      case "Overweight":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Obese":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  if (bmiHistory.length === 0) {
    return (
      <Card className="bg-pink-50/50">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Calendar className="h-12 w-12 text-pink-300 mb-4" />
          <h3 className="text-lg font-medium">No BMI History</h3>
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            Start tracking your BMI by using the calculator. Your results will appear here.
          </p>
          <Button>Calculate BMI</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current BMI</p>
              <p className="text-2xl font-bold text-pink-600">{currentBMI.bmi}</p>
              <Badge className={getCategoryColor(currentBMI.category)} variant="outline">
                {currentBMI.category}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Trend</p>
              <div className="flex items-center justify-center gap-1">
                {trend > 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : trend < 0 ? (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                ) : (
                  <span className="text-gray-500">→</span>
                )}
                <span
                  className={`font-medium ${trend > 0 ? "text-red-500" : trend < 0 ? "text-green-500" : "text-gray-500"}`}
                >
                  {trend > 0 ? "+" : ""}
                  {trend.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">vs last measurement</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Measurements</p>
              <p className="text-2xl font-bold text-pink-600">{bmiHistory.length}</p>
              <p className="text-xs text-muted-foreground">recorded</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>BMI Trend Chart</CardTitle>
          <CardDescription>Your BMI measurements over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip />
                <Line type="monotone" dataKey="bmi" stroke="#f472b6" strokeWidth={2} dot={{ fill: "#f472b6" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-blue-400"></div>
              <span>Underweight (&lt;18.5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-green-400"></div>
              <span>Normal (18.5-24.9)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-yellow-400"></div>
              <span>Overweight (25-29.9)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-red-400"></div>
              <span>Obese (≥30)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>BMI History</CardTitle>
          <CardDescription>All your recorded BMI measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bmiHistory
              .slice()
              .reverse()
              .map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{new Date(entry.date).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">BMI: {entry.bmi}</p>
                  </div>
                  <Badge className={getCategoryColor(entry.category)} variant="outline">
                    {entry.category}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
