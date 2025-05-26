"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Info, Save, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Utensils } from "lucide-react"

interface BMIResult {
  value: number
  category: string
  color: string
  recommendations: string[]
  healthRisks: string[]
}

export function BMICalculator() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [result, setResult] = useState<BMIResult | null>(null)

  const calculateBMI = () => {
    let heightInMeters: number
    let weightInKg: number

    if (units === "metric") {
      heightInMeters = Number.parseFloat(height) / 100
      weightInKg = Number.parseFloat(weight)
    } else {
      const totalInches = Number.parseFloat(heightFeet) * 12 + Number.parseFloat(heightInches)
      heightInMeters = totalInches * 0.0254
      weightInKg = Number.parseFloat(weight) * 0.453592
    }

    if (!heightInMeters || !weightInKg || heightInMeters <= 0 || weightInKg <= 0) {
      return
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters)
    const bmiResult = interpretBMI(bmi)
    setResult(bmiResult)
  }

  const interpretBMI = (bmi: number): BMIResult => {
    if (bmi < 18.5) {
      return {
        value: bmi,
        category: "Underweight",
        color: "text-blue-600",
        recommendations: [
          "Consult with a healthcare provider about healthy weight gain",
          "Focus on nutrient-dense foods and regular meals",
          "Consider strength training to build muscle mass",
          "Monitor your health regularly",
        ],
        healthRisks: [
          "Increased risk of osteoporosis",
          "Weakened immune system",
          "Fertility issues",
          "Delayed wound healing",
        ],
      }
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        value: bmi,
        category: "Normal weight",
        color: "text-green-600",
        recommendations: [
          "Maintain your current healthy lifestyle",
          "Continue regular physical activity",
          "Eat a balanced, nutritious diet",
          "Regular health check-ups",
        ],
        healthRisks: ["Lowest risk for weight-related health problems"],
      }
    } else if (bmi >= 25 && bmi < 30) {
      return {
        value: bmi,
        category: "Overweight",
        color: "text-yellow-600",
        recommendations: [
          "Aim for gradual weight loss (1-2 pounds per week)",
          "Increase physical activity to 150+ minutes per week",
          "Focus on portion control and healthy eating",
          "Consider consulting a nutritionist",
        ],
        healthRisks: [
          "Increased risk of heart disease",
          "Higher risk of type 2 diabetes",
          "Sleep apnea risk",
          "High blood pressure risk",
        ],
      }
    } else {
      return {
        value: bmi,
        category: "Obese",
        color: "text-red-600",
        recommendations: [
          "Consult with healthcare providers for a weight management plan",
          "Consider medically supervised weight loss programs",
          "Focus on sustainable lifestyle changes",
          "Regular monitoring of health markers",
        ],
        healthRisks: [
          "Significantly increased risk of heart disease",
          "High risk of type 2 diabetes",
          "Increased risk of certain cancers",
          "Sleep apnea and breathing problems",
        ],
      }
    }
  }

  const getBMIProgress = (bmi: number) => {
    // Map BMI to a 0-100 scale for visual representation
    if (bmi < 18.5) return (bmi / 18.5) * 25
    if (bmi < 25) return 25 + ((bmi - 18.5) / (25 - 18.5)) * 50
    if (bmi < 30) return 75 + ((bmi - 25) / (30 - 25)) * 20
    return Math.min(100, 95 + ((bmi - 30) / 10) * 5)
  }

  const saveBMIResult = () => {
    if (result) {
      // In a real app, this would save to a database or local storage
      console.log("Saving BMI result:", result)
      // Show success message
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-pink-600" />
            BMI Calculator
          </CardTitle>
          <CardDescription>Enter your height and weight to calculate your Body Mass Index</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Units</Label>
            <RadioGroup value={units} onValueChange={(value) => setUnits(value as "metric" | "imperial")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="metric" id="metric" />
                <Label htmlFor="metric">Metric (cm, kg)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="imperial" id="imperial" />
                <Label htmlFor="imperial">Imperial (ft, in, lbs)</Label>
              </div>
            </RadioGroup>
          </div>

          {units === "metric" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Height</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      type="number"
                      placeholder="5"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                    />
                    <Label className="text-xs text-muted-foreground">feet</Label>
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="7"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                    />
                    <Label className="text-xs text-muted-foreground">inches</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight-lbs">Weight (lbs)</Label>
                <Input
                  id="weight-lbs"
                  type="number"
                  placeholder="154"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
          )}

          <Button onClick={calculateBMI} className="w-full" size="lg">
            Calculate BMI
          </Button>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              BMI is a screening tool and doesn't diagnose body fatness or health. Consult your healthcare provider for
              personalized advice.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your BMI Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600">{result.value.toFixed(1)}</div>
                <Badge className={`mt-2 ${result.color}`} variant="outline">
                  {result.category}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>BMI Scale</span>
                  <span>{result.value.toFixed(1)}</span>
                </div>
                <Progress value={getBMIProgress(result.value)} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={saveBMIResult} variant="outline" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Result
                </Button>
                <Button variant="outline" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Trends
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/nutrition">
                    <Utensils className="h-4 w-4 mr-2" />
                    Nutrition Plan
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Health Recommendations:</h4>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Health Considerations:</h4>
                <ul className="space-y-1">
                  {result.healthRisks.map((risk, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-pink-50/50 border-pink-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-pink-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-pink-800">Important Note</h4>
                  <p className="text-sm text-pink-700 mt-1">
                    This BMI calculator is for informational purposes only. For personalized health advice, especially
                    during pregnancy or if you have health conditions, please consult with your midwife or healthcare
                    provider.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
