"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

export function DiaryEntryForm() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Diary Entry</CardTitle>
        <CardDescription>Record your symptoms and wellbeing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="blood-pressure">Blood Pressure (mmHg)</Label>
          <div className="flex gap-2">
            <Input id="systolic" placeholder="Systolic (top)" type="number" />
            <span className="flex items-center">/</span>
            <Input id="diastolic" placeholder="Diastolic (bottom)" type="number" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Mood</Label>
          <RadioGroup defaultValue="good" className="flex justify-between max-w-md">
            <div className="flex flex-col items-center space-y-1">
              <RadioGroupItem value="great" id="great" className="sr-only" />
              <Label
                htmlFor="great"
                className="cursor-pointer rounded-md border border-transparent p-2 hover:bg-pink-50 [&:has([data-state=checked])]:border-pink-500 [&:has([data-state=checked])]:bg-pink-50"
              >
                😄
              </Label>
              <span className="text-xs">Great</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <RadioGroupItem value="good" id="good" className="sr-only" />
              <Label
                htmlFor="good"
                className="cursor-pointer rounded-md border border-transparent p-2 hover:bg-pink-50 [&:has([data-state=checked])]:border-pink-500 [&:has([data-state=checked])]:bg-pink-50"
              >
                🙂
              </Label>
              <span className="text-xs">Good</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
              <Label
                htmlFor="neutral"
                className="cursor-pointer rounded-md border border-transparent p-2 hover:bg-pink-50 [&:has([data-state=checked])]:border-pink-500 [&:has([data-state=checked])]:bg-pink-50"
              >
                😐
              </Label>
              <span className="text-xs">Neutral</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <RadioGroupItem value="tired" id="tired" className="sr-only" />
              <Label
                htmlFor="tired"
                className="cursor-pointer rounded-md border border-transparent p-2 hover:bg-pink-50 [&:has([data-state=checked])]:border-pink-500 [&:has([data-state=checked])]:bg-pink-50"
              >
                😴
              </Label>
              <span className="text-xs">Tired</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <RadioGroupItem value="bad" id="bad" className="sr-only" />
              <Label
                htmlFor="bad"
                className="cursor-pointer rounded-md border border-transparent p-2 hover:bg-pink-50 [&:has([data-state=checked])]:border-pink-500 [&:has([data-state=checked])]:bg-pink-50"
              >
                🙁
              </Label>
              <span className="text-xs">Bad</span>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Symptoms (select all that apply)</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="nausea" />
              <Label htmlFor="nausea">Nausea</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="headache" />
              <Label htmlFor="headache">Headache</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="fatigue" />
              <Label htmlFor="fatigue">Fatigue</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="cramps" />
              <Label htmlFor="cramps">Cramps</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="bloating" />
              <Label htmlFor="bloating">Bloating</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="breast-tenderness" />
              <Label htmlFor="breast-tenderness">Breast Tenderness</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="insomnia" />
              <Label htmlFor="insomnia">Insomnia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="mood-swings" />
              <Label htmlFor="mood-swings">Mood Swings</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add any additional notes about how you're feeling today..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button className="flex-1">Save Entry</Button>
        </div>
      </CardContent>
    </Card>
  )
}
