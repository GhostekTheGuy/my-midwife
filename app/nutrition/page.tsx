import { NutritionDashboard } from "@/components/nutrition-dashboard"
import { FoodDiary } from "@/components/food-diary"
import { MealPlanner } from "@/components/meal-planner"
import { NutritionInsights } from "@/components/nutrition-insights"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NutritionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nutrition Tracker</h1>
        <p className="text-muted-foreground">Track your meals and get personalized nutrition recommendations</p>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="diary">Food Diary</TabsTrigger>
          <TabsTrigger value="planner">Meal Plans</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-4">
          <NutritionDashboard />
        </TabsContent>
        <TabsContent value="diary" className="mt-4">
          <FoodDiary />
        </TabsContent>
        <TabsContent value="planner" className="mt-4">
          <MealPlanner />
        </TabsContent>
        <TabsContent value="insights" className="mt-4">
          <NutritionInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}
