import { BMICalculator } from "@/components/bmi-calculator"
import { BMIHistory } from "@/components/bmi-history"
import { BMIEducation } from "@/components/bmi-education"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BMICalculatorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">BMI Calculator</h1>
        <p className="text-muted-foreground">Calculate and track your Body Mass Index</p>
      </div>

      <Tabs defaultValue="calculator">
        <TabsList>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="education">Learn More</TabsTrigger>
        </TabsList>
        <TabsContent value="calculator" className="mt-4">
          <BMICalculator />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <BMIHistory />
        </TabsContent>
        <TabsContent value="education" className="mt-4">
          <BMIEducation />
        </TabsContent>
      </Tabs>
    </div>
  )
}
