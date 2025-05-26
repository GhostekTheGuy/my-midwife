"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, ChefHat, Clock, Info, Star, Users } from "lucide-react"

interface MealPlan {
  id: string
  name: string
  description: string
  duration: string
  targetBMI: string
  calories: number
  meals: number
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
  image: string
}

interface Recipe {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  prepTime: number
  difficulty: "Easy" | "Medium" | "Hard"
  ingredients: string[]
  instructions: string[]
  image: string
  tags: string[]
}

export function MealPlanner() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // This would normally come from an API, personalized based on BMI
  const userBMI = 24.3
  const bmiCategory = "Normal weight"

  const mealPlans: MealPlan[] = [
    {
      id: "1",
      name: "Balanced Maintenance Plan",
      description: "Perfect for maintaining a healthy weight with balanced nutrition",
      duration: "7 days",
      targetBMI: "18.5-24.9",
      calories: 1800,
      meals: 21,
      difficulty: "Easy",
      tags: ["Balanced", "Maintenance", "Heart-healthy"],
      image: "/placeholder.svg?height=200&width=300&query=healthy balanced meal with vegetables and protein",
    },
    {
      id: "2",
      name: "Gentle Weight Loss Plan",
      description: "Gradual weight loss with nutrient-dense, satisfying meals",
      duration: "14 days",
      targetBMI: "25-29.9",
      calories: 1500,
      meals: 42,
      difficulty: "Medium",
      tags: ["Weight Loss", "Low Calorie", "High Protein"],
      image: "/placeholder.svg?height=200&width=300&query=healthy weight loss meal with salad and lean protein",
    },
    {
      id: "3",
      name: "Pregnancy Nutrition Plan",
      description: "Specially designed for expecting mothers with essential nutrients",
      duration: "7 days",
      targetBMI: "All ranges",
      calories: 2200,
      meals: 21,
      difficulty: "Easy",
      tags: ["Pregnancy", "Folic Acid", "Iron Rich"],
      image: "/placeholder.svg?height=200&width=300&query=pregnancy nutrition meal with leafy greens and salmon",
    },
    {
      id: "4",
      name: "Postpartum Recovery Plan",
      description: "Nourishing meals to support recovery and breastfeeding",
      duration: "10 days",
      targetBMI: "All ranges",
      calories: 2000,
      meals: 30,
      difficulty: "Easy",
      tags: ["Postpartum", "Breastfeeding", "Recovery"],
      image: "/placeholder.svg?height=200&width=300&query=postpartum nutrition meal with oats and berries",
    },
  ]

  const todaysRecipes: Recipe[] = [
    {
      id: "1",
      name: "Quinoa Power Bowl",
      calories: 420,
      protein: 18,
      carbs: 45,
      fat: 16,
      prepTime: 25,
      difficulty: "Easy",
      ingredients: ["1 cup quinoa", "1 cup chickpeas", "2 cups spinach", "1/2 avocado", "2 tbsp tahini"],
      instructions: [
        "Cook quinoa according to package instructions",
        "Sauté chickpeas with spices",
        "Massage spinach with lemon juice",
        "Assemble bowl and top with avocado and tahini",
      ],
      image: "/placeholder.svg?height=150&width=200&query=quinoa power bowl with chickpeas and avocado",
      tags: ["Vegetarian", "High Protein", "Gluten-Free"],
    },
    {
      id: "2",
      name: "Baked Salmon with Sweet Potato",
      calories: 380,
      protein: 32,
      carbs: 28,
      fat: 14,
      prepTime: 30,
      difficulty: "Medium",
      ingredients: ["6oz salmon fillet", "1 medium sweet potato", "2 cups broccoli", "1 tbsp olive oil"],
      instructions: [
        "Preheat oven to 400°F",
        "Season salmon and sweet potato",
        "Bake for 20-25 minutes",
        "Steam broccoli and serve together",
      ],
      image: "/placeholder.svg?height=150&width=200&query=baked salmon with sweet potato and broccoli",
      tags: ["High Protein", "Omega-3", "Low Carb"],
    },
  ]

  const getRecommendedPlans = () => {
    if (userBMI < 18.5) {
      return mealPlans.filter((plan) => plan.calories >= 2000)
    } else if (userBMI >= 18.5 && userBMI < 25) {
      return mealPlans.filter((plan) => plan.targetBMI.includes("18.5-24.9") || plan.targetBMI === "All ranges")
    } else if (userBMI >= 25 && userBMI < 30) {
      return mealPlans.filter((plan) => plan.targetBMI.includes("25-29.9") || plan.calories <= 1600)
    } else {
      return mealPlans.filter((plan) => plan.calories <= 1500)
    }
  }

  const recommendedPlans = getRecommendedPlans()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-50 text-green-700 border-green-200"
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Hard":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* BMI-Based Recommendation */}
      <Alert className="bg-pink-50 border-pink-200">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>
            Personalized for your BMI ({userBMI} - {bmiCategory}):
          </strong>{" "}
          We've selected meal plans that align with your current health profile and nutrition goals.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="plans">
        <TabsList>
          <TabsTrigger value="plans">Meal Plans</TabsTrigger>
          <TabsTrigger value="recipes">Today's Recipes</TabsTrigger>
          <TabsTrigger value="shopping">Shopping List</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          {/* Recommended Plans */}
          <div>
            <h3 className="text-lg font-medium mb-4">Recommended for You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image src={plan.image || "/placeholder.svg"} alt={plan.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className={getDifficultyColor(plan.difficulty)} variant="outline">
                        {plan.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-pink-600" />
                        <span>{plan.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4 text-pink-600" />
                        <span>{plan.meals} meals</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-pink-600" />
                        <span>{plan.calories} cal/day</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-pink-600" />
                        <span>BMI {plan.targetBMI}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {plan.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-pink-50 text-pink-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => setSelectedPlan(plan.id)}
                        variant={selectedPlan === plan.id ? "default" : "outline"}
                      >
                        {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                      </Button>
                      <Button variant="outline">Preview</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Plans */}
          <div>
            <h3 className="text-lg font-medium mb-4">All Meal Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mealPlans
                .filter((plan) => !recommendedPlans.includes(plan))
                .map((plan) => (
                  <Card key={plan.id} className="overflow-hidden hover:shadow-md transition-shadow opacity-75">
                    <div className="relative h-48">
                      <Image src={plan.image || "/placeholder.svg"} alt={plan.name} fill className="object-cover" />
                      <div className="absolute top-2 right-2">
                        <Badge className={getDifficultyColor(plan.difficulty)} variant="outline">
                          {plan.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-pink-600" />
                          <span>{plan.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChefHat className="h-4 w-4 text-pink-600" />
                          <span>{plan.meals} meals</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-pink-600" />
                          <span>{plan.calories} cal/day</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-pink-600" />
                          <span>BMI {plan.targetBMI}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {plan.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Today's Recommended Recipes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todaysRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden">
                  <div className="relative h-40">
                    <Image src={recipe.image || "/placeholder.svg"} alt={recipe.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className={getDifficultyColor(recipe.difficulty)} variant="outline">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.prepTime} min</span>
                      </div>
                      <span>{recipe.calories} cal</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-pink-600">{recipe.protein}g</div>
                        <div className="text-muted-foreground">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-pink-600">{recipe.carbs}g</div>
                        <div className="text-muted-foreground">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-pink-600">{recipe.fat}g</div>
                        <div className="text-muted-foreground">Fat</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {recipe.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-pink-50 text-pink-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">View Recipe</Button>
                      <Button variant="outline">Add to Diary</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shopping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Shopping List</CardTitle>
              <CardDescription>Based on your selected meal plan</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPlan ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Proteins</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Salmon fillets (6 pieces)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Chicken breast (2 lbs)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Greek yogurt (32 oz)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Vegetables</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Spinach (2 bags)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Broccoli (3 heads)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Sweet potatoes (5 medium)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Grains & Pantry</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Quinoa (2 lbs)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Oats (1 container)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Olive oil (1 bottle)</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full">Export Shopping List</Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Select a meal plan to generate your shopping list</p>
                  <Button asChild variant="outline">
                    <Link href="#plans">Choose Meal Plan</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
