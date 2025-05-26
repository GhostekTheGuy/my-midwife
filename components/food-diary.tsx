"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Plus, Search, Trash2 } from "lucide-react"

interface FoodEntry {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving: string
  time: string
  meal: "breakfast" | "lunch" | "dinner" | "snack"
}

export function FoodDiary() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  // This would normally come from an API
  const foodEntries: FoodEntry[] = [
    {
      id: "1",
      name: "Oatmeal with berries and almonds",
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 8,
      serving: "1 bowl",
      time: "8:30 AM",
      meal: "breakfast",
    },
    {
      id: "2",
      name: "Grilled chicken salad with quinoa",
      calories: 450,
      protein: 35,
      carbs: 30,
      fat: 18,
      serving: "1 large bowl",
      time: "12:45 PM",
      meal: "lunch",
    },
    {
      id: "3",
      name: "Greek yogurt with honey",
      calories: 150,
      protein: 15,
      carbs: 20,
      fat: 3,
      serving: "1 cup",
      time: "3:20 PM",
      meal: "snack",
    },
  ]

  const commonFoods = [
    { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
    { name: "Apple", calories: 95, protein: 0, carbs: 25, fat: 0 },
    { name: "Greek Yogurt (1 cup)", calories: 130, protein: 23, carbs: 9, fat: 0 },
    { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 4 },
    { name: "Brown Rice (1 cup)", calories: 216, protein: 5, carbs: 45, fat: 2 },
    { name: "Avocado (1 medium)", calories: 234, protein: 3, carbs: 12, fat: 21 },
  ]

  const getMealEntries = (meal: string) => {
    return foodEntries.filter((entry) => entry.meal === meal)
  }

  const getMealTotals = (meal: string) => {
    const entries = getMealEntries(meal)
    return entries.reduce(
      (totals, entry) => ({
        calories: totals.calories + entry.calories,
        protein: totals.protein + entry.protein,
        carbs: totals.carbs + entry.carbs,
        fat: totals.fat + entry.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    )
  }

  const getDayTotals = () => {
    return foodEntries.reduce(
      (totals, entry) => ({
        calories: totals.calories + entry.calories,
        protein: totals.protein + entry.protein,
        carbs: totals.carbs + entry.carbs,
        fat: totals.fat + entry.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    )
  }

  const dayTotals = getDayTotals()

  const MealSection = ({ mealType, displayName }: { mealType: string; displayName: string }) => {
    const entries = getMealEntries(mealType)
    const totals = getMealTotals(mealType)

    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{displayName}</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Food
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Food to {displayName}</DialogTitle>
                  <DialogDescription>Search for food or add custom entry</DialogDescription>
                </DialogHeader>
                <AddFoodForm mealType={mealType} />
              </DialogContent>
            </Dialog>
          </div>
          {totals.calories > 0 && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>{totals.calories} cal</span>
              <span>{totals.protein}g protein</span>
              <span>{totals.carbs}g carbs</span>
              <span>{totals.fat}g fat</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No foods logged for {displayName.toLowerCase()}
            </p>
          ) : (
            <div className="space-y-2">
              {entries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex-1">
                    <p className="font-medium">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.serving} • {entry.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="font-medium">{entry.calories} cal</p>
                      <p className="text-xs text-muted-foreground">
                        P: {entry.protein}g • C: {entry.carbs}g • F: {entry.fat}g
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const AddFoodForm = ({ mealType }: { mealType: string }) => {
    return (
      <div className="space-y-4">
        <Tabs defaultValue="search">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Foods</TabsTrigger>
            <TabsTrigger value="custom">Custom Entry</TabsTrigger>
          </TabsList>
          <TabsContent value="search" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for food..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {commonFoods
                .filter((food) => food.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg border hover:bg-pink-50">
                    <div>
                      <p className="font-medium">{food.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {food.calories} cal • P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                      </p>
                    </div>
                    <Button size="sm">Add</Button>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="food-name">Food Name</Label>
                <Input id="food-name" placeholder="e.g., Homemade smoothie" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <Input id="calories" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="serving">Serving Size</Label>
                  <Input id="serving" placeholder="e.g., 1 cup" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input id="protein" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input id="carbs" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input id="fat" type="number" placeholder="0" />
                </div>
              </div>
              <Button className="w-full">Add to {mealType}</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Food Diary</h3>
              <p className="text-sm text-muted-foreground">Track your daily nutrition</p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary */}
      <Card className="bg-pink-50/50 border-pink-200">
        <CardHeader>
          <CardTitle>Daily Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{dayTotals.calories}</div>
              <div className="text-sm text-muted-foreground">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{dayTotals.protein}g</div>
              <div className="text-sm text-muted-foreground">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{dayTotals.carbs}g</div>
              <div className="text-sm text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{dayTotals.fat}g</div>
              <div className="text-sm text-muted-foreground">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Sections */}
      <div className="space-y-4">
        <MealSection mealType="breakfast" displayName="Breakfast" />
        <MealSection mealType="lunch" displayName="Lunch" />
        <MealSection mealType="dinner" displayName="Dinner" />
        <MealSection mealType="snack" displayName="Snacks" />
      </div>
    </div>
  )
}
