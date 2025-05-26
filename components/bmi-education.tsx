import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Heart, Info, Scale, Users } from "lucide-react"

export function BMIEducation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-pink-600" />
            Understanding BMI
          </CardTitle>
          <CardDescription>Learn about Body Mass Index and what it means for your health</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What is BMI?</h3>
            <p className="text-sm text-muted-foreground">
              Body Mass Index (BMI) is a screening tool that uses your height and weight to estimate whether you're
              underweight, normal weight, overweight, or obese. It's calculated by dividing your weight in kilograms by
              your height in meters squared (kg/m²).
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">BMI Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border bg-blue-50">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-800">Underweight</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">
                    &lt; 18.5
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg border bg-green-50">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-800">Normal weight</span>
                  <Badge variant="outline" className="bg-green-100 text-green-700">
                    18.5 - 24.9
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg border bg-yellow-50">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-yellow-800">Overweight</span>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                    25 - 29.9
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg border bg-red-50">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-red-800">Obese</span>
                  <Badge variant="outline" className="bg-red-100 text-red-700">
                    ≥ 30
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-pink-600" />
            BMI Limitations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Important Considerations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>BMI doesn't distinguish between muscle and fat mass</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>It doesn't account for bone density, overall body composition, or racial/ethnic differences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>Athletes with high muscle mass may have high BMI but low body fat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>Older adults may have acceptable BMI but still have excess body fat</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-600" />
            BMI and Women's Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Special Considerations for Women</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-pink-50 border border-pink-200">
                <h4 className="font-medium text-pink-800 mb-1">Pregnancy</h4>
                <p className="text-sm text-pink-700">
                  BMI before pregnancy helps determine healthy weight gain during pregnancy. Consult your midwife for
                  personalized guidance.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-pink-50 border border-pink-200">
                <h4 className="font-medium text-pink-800 mb-1">Menstrual Health</h4>
                <p className="text-sm text-pink-700">
                  Very low or very high BMI can affect menstrual cycles and fertility. Maintaining a healthy weight
                  supports reproductive health.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-pink-50 border border-pink-200">
                <h4 className="font-medium text-pink-800 mb-1">Menopause</h4>
                <p className="text-sm text-pink-700">
                  Hormonal changes during menopause can affect weight distribution. Regular monitoring helps maintain
                  health.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-pink-600" />
            Healthy Weight Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Tips for Maintaining a Healthy Weight</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Nutrition</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Eat a balanced diet with plenty of fruits and vegetables</li>
                  <li>• Choose whole grains over refined grains</li>
                  <li>• Include lean proteins in your meals</li>
                  <li>• Stay hydrated with water</li>
                  <li>• Practice portion control</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Physical Activity</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Aim for 150 minutes of moderate exercise per week</li>
                  <li>• Include strength training exercises</li>
                  <li>• Find activities you enjoy</li>
                  <li>• Start slowly and gradually increase intensity</li>
                  <li>• Consider working with a fitness professional</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Remember:</strong> BMI is just one tool for assessing health. Your overall health depends on many
          factors including diet, physical activity, genetics, and medical history. Always consult with your healthcare
          provider or midwife for personalized health advice, especially if you're pregnant, breastfeeding, or have
          health conditions.
        </AlertDescription>
      </Alert>
    </div>
  )
}
