"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle, Info } from "lucide-react"

export function NutritionInsights() {
  // This would normally come from API/state, integrated with BMI data
  const userProfile = {
    currentBMI: 24.3,
    bmiCategory: "Normal weight",
    targetBMI: 22.0,
    startingWeight: 68,
    currentWeight: 65,
    targetWeight: 62,
  }

  const weeklyData = [
    { date: "Mon", calories: 1650, target: 1800, weight: 65.2 },
    { date: "Tue", calories: 1720, target: 1800, weight: 65.1 },
    { date: "Wed", calories: 1580, target: 1800, weight: 65.0 },
    { date: "Thu", calories: 1820, target: 1800, weight: 64.9 },
    { date: "Fri", calories: 1750, target: 1800, weight: 64.8 },
    { date: "Sat", calories: 1900, target: 1800, weight: 64.9 },
    { date: "Sun", calories: 1680, target: 1800, weight: 65.0 },
  ]

  const macroDistribution = [
    { name: "Protein", value: 25, color: "#f472b6" },
    { name: "Carbs", value: 45, color: "#fb7185" },
    { name: "Fat", value: 30, color: "#fda4af" },
  ]

  const nutritionGoals = [
    { name: "Daily Calories", current: 1720, target: 1800, unit: "cal", status: "good" },
    { name: "Protein", current: 85, target: 90, unit: "g", status: "good" },
    { name: "Fiber", current: 18, target: 25, unit: "g", status: "needs-improvement" },
    { name: "Water", current: 6, target: 8, unit: "glasses", status: "needs-improvement" },
    { name: "Vegetables", current: 4, target: 5, unit: "servings", status: "good" },
  ]

  const insights = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Great Progress!",
      message: "You've maintained consistent calorie intake this week, supporting your BMI goals.",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Fiber Intake",
      message: "Consider adding more whole grains and vegetables to reach your fiber goal.",
    },
    {
      type: "info",
      icon: Info,
      title: "BMI Trend",
      message: "Your current nutrition plan aligns well with maintaining a healthy BMI range.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600"
      case "needs-improvement":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "needs-improvement":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "poor":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Target className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* BMI & Weight Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">{userProfile.currentBMI}</div>
            <div className="text-sm text-muted-foreground">Current BMI</div>
            <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
              {userProfile.bmiCategory}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">{userProfile.currentWeight}kg</div>
            <div className="text-sm text-muted-foreground">Current Weight</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingDown className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">-3kg from start</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">{userProfile.targetWeight}kg</div>
            <div className="text-sm text-muted-foreground">Target Weight</div>
            <div className="text-xs text-muted-foreground mt-1">3kg to go</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Nutrition Trends</CardTitle>
          <CardDescription>Your calorie intake vs targets over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calories" stroke="#f472b6" name="Actual Calories" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="#fb7185" strokeDasharray="5 5" name="Target Calories" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Macro Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Macronutrient Distribution</CardTitle>
            <CardDescription>Your average macro breakdown this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {macroDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nutrition Goals</CardTitle>
            <CardDescription>How you're tracking against your daily targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {nutritionGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(goal.status)}
                    <span className="text-sm font-medium">{goal.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Insights</CardTitle>
          <CardDescription>Based on your BMI, nutrition data, and health goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = insight.icon
            return (
              <Alert
                key={index}
                className={
                  insight.type === "success"
                    ? "bg-green-50 border-green-200"
                    : insight.type === "warning"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-blue-50 border-blue-200"
                }
              >
                <IconComponent className="h-4 w-4" />
                <AlertDescription>
                  <strong>{insight.title}:</strong> {insight.message}
                </AlertDescription>
              </Alert>
            )
          })}
        </CardContent>
      </Card>

      {/* BMI-Nutrition Connection */}
      <Card className="bg-pink-50/50 border-pink-200">
        <CardHeader>
          <CardTitle>BMI & Nutrition Connection</CardTitle>
          <CardDescription>How your nutrition choices support your BMI goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Current Status</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>BMI in healthy range (24.3)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Consistent calorie tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>Gradual weight loss progress</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Recommendations</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-pink-600" />
                  <span>Maintain current calorie deficit</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-pink-600" />
                  <span>Increase fiber intake for satiety</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-pink-600" />
                  <span>Stay hydrated for metabolism</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
