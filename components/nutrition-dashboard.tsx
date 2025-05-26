"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Target, TrendingUp, Utensils } from "lucide-react"

export function NutritionDashboard() {
  // This would normally come from API/state, including BMI data
  const userProfile = {
    currentBMI: 24.3,
    bmiCategory: "Normal weight",
    targetCalories: 1800,
    targetProtein: 90,
    targetCarbs: 225,
    targetFat: 60,
  }

  const todaysIntake = {
    calories: 1420,
    protein: 68,
    carbs: 180,
    fat: 45,
    water: 6, // glasses
  }

  const calorieProgress = (todaysIntake.calories / userProfile.targetCalories) * 100
  const proteinProgress = (todaysIntake.protein / userProfile.targetProtein) * 100
  const carbsProgress = (todaysIntake.carbs / userProfile.targetCarbs) * 100
  const fatProgress = (todaysIntake.fat / userProfile.targetFat) * 100

  const getBMIBasedRecommendation = () => {
    if (userProfile.currentBMI < 18.5) {
      return {
        message: "Focus on healthy weight gain with nutrient-dense foods",
        color: "bg-blue-50 border-blue-200 text-blue-800",
        icon: "📈",
      }
    } else if (userProfile.currentBMI >= 18.5 && userProfile.currentBMI < 25) {
      return {
        message: "Maintain your healthy weight with balanced nutrition",
        color: "bg-green-50 border-green-200 text-green-800",
        icon: "✅",
      }
    } else if (userProfile.currentBMI >= 25 && userProfile.currentBMI < 30) {
      return {
        message: "Focus on portion control and nutrient-dense foods",
        color: "bg-yellow-50 border-yellow-200 text-yellow-800",
        icon: "⚖️",
      }
    } else {
      return {
        message: "Consider consulting a nutritionist for personalized guidance",
        color: "bg-red-50 border-red-200 text-red-800",
        icon: "🏥",
      }
    }
  }

  const recommendation = getBMIBasedRecommendation()

  return (
    <div className="space-y-6">
      {/* BMI-Based Recommendation */}
      <Alert className={recommendation.color}>
        <AlertDescription className="flex items-center gap-2">
          <span className="text-lg">{recommendation.icon}</span>
          <div>
            <strong>Based on your BMI ({userProfile.currentBMI}):</strong> {recommendation.message}
          </div>
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">{todaysIntake.calories}</div>
            <div className="text-sm text-muted-foreground">Calories Today</div>
            <div className="text-xs text-muted-foreground">Goal: {userProfile.targetCalories}</div>
          </CardContent>
        </Card>
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
            <div className="text-2xl font-bold text-pink-600">{todaysIntake.water}</div>
            <div className="text-sm text-muted-foreground">Glasses of Water</div>
            <div className="text-xs text-muted-foreground">Goal: 8 glasses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">3</div>
            <div className="text-sm text-muted-foreground">Meals Logged</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Macronutrient Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Nutrition Progress</CardTitle>
          <CardDescription>Track your macronutrients based on your BMI and health goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Calories</span>
                <span className="text-sm text-muted-foreground">
                  {todaysIntake.calories} / {userProfile.targetCalories}
                </span>
              </div>
              <Progress value={calorieProgress} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {userProfile.targetCalories - todaysIntake.calories} calories remaining
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Protein</span>
                <span className="text-sm text-muted-foreground">
                  {todaysIntake.protein}g / {userProfile.targetProtein}g
                </span>
              </div>
              <Progress value={proteinProgress} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Carbohydrates</span>
                <span className="text-sm text-muted-foreground">
                  {todaysIntake.carbs}g / {userProfile.targetCarbs}g
                </span>
              </div>
              <Progress value={carbsProgress} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Fat</span>
                <span className="text-sm text-muted-foreground">
                  {todaysIntake.fat}g / {userProfile.targetFat}g
                </span>
              </div>
              <Progress value={fatProgress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:bg-pink-50/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Utensils className="h-8 w-8 text-pink-600" />
              <div>
                <h3 className="font-medium">Log Food</h3>
                <p className="text-sm text-muted-foreground">Add meals to your diary</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-pink-50/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-pink-600" />
              <div>
                <h3 className="font-medium">Meal Plans</h3>
                <p className="text-sm text-muted-foreground">Get personalized plans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-pink-50/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calculator className="h-8 w-8 text-pink-600" />
              <div>
                <h3 className="font-medium">Update BMI</h3>
                <p className="text-sm text-muted-foreground">Recalculate nutrition goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Meals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Meals</CardTitle>
          <CardDescription>Your latest food entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="font-medium">Breakfast</p>
                  <p className="text-sm text-muted-foreground">Oatmeal with berries and almonds</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">320 cal</p>
                <p className="text-xs text-muted-foreground">8:30 AM</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="font-medium">Lunch</p>
                  <p className="text-sm text-muted-foreground">Grilled chicken salad with quinoa</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">450 cal</p>
                <p className="text-xs text-muted-foreground">12:45 PM</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="font-medium">Snack</p>
                  <p className="text-sm text-muted-foreground">Greek yogurt with honey</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">150 cal</p>
                <p className="text-xs text-muted-foreground">3:20 PM</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            View Full Food Diary
          </Button>
        </CardContent>
      </Card>

      {/* BMI Integration */}
      <Card className="bg-pink-50/50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-pink-600" />
            BMI & Nutrition Connection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Current BMI:</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {userProfile.currentBMI} - {userProfile.bmiCategory}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Daily Calorie Goal:</span>
              <span className="font-medium">{userProfile.targetCalories} calories</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Recommended Approach:</span>
              <span className="font-medium text-green-600">Maintain current weight</span>
            </div>
          </div>
          <Button asChild className="w-full mt-4" variant="outline">
            <Link href="/bmi-calculator">Update BMI Calculation</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
