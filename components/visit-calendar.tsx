"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { useLanguage } from "@/contexts/language-context"
import { VisitService } from "@/services/visit-service"
import type { Visit, UserRole } from "@/types/visit"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, MapPin, Video } from "lucide-react"
import { format, startOfMonth, endOfMonth, isSameDay, addMonths, subMonths } from "date-fns"

interface VisitCalendarProps {
  userRole: UserRole
  userId: string
  onVisitSelect?: (visit: Visit) => void
}

export function VisitCalendar({ userRole, userId, onVisitSelect }: VisitCalendarProps) {
  const { t } = useLanguage()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [visits, setVisits] = useState<Visit[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState(true)
  const visitService = VisitService.getInstance()

  useEffect(() => {
    loadVisitsForMonth()
  }, [currentDate, userId])

  const loadVisitsForMonth = async () => {
    setLoading(true)
    try {
      const startDate = startOfMonth(currentDate)
      const endDate = endOfMonth(currentDate)

      const filters = {
        dateRange: { start: startDate, end: endDate },
        ...(userRole === "patient" ? { patientId: userId } : {}),
        ...(userRole === "midwife" ? { midwifeId: userId } : {}),
      }

      const visitData = await visitService.getVisits(filters)
      setVisits(visitData)
    } catch (error) {
      console.error("Failed to load visits:", error)
    } finally {
      setLoading(false)
    }
  }

  const getVisitsForDate = (date: Date): Visit[] => {
    return visits.filter((visit) => isSameDay(visit.scheduledDate, date))
  }

  const getVisitStatusColor = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => (direction === "prev" ? subMonths(prev, 1) : addMonths(prev, 1)))
  }

  const selectedDateVisits = selectedDate ? getVisitsForDate(selectedDate) : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {format(currentDate, "MMMM yyyy")}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentDate}
            onMonthChange={setCurrentDate}
            className="rounded-md border"
            components={{
              Day: ({ date, ...props }) => {
                const dayVisits = getVisitsForDate(date)
                return (
                  <div className="relative">
                    <button
                      {...props}
                      className={`
                        w-full h-full p-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground
                        ${isSameDay(date, selectedDate || new Date()) ? "bg-primary text-primary-foreground" : ""}
                        ${dayVisits.length > 0 ? "font-semibold" : ""}
                      `}
                    >
                      {format(date, "d")}
                    </button>
                    {dayVisits.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-1">
                          {dayVisits.slice(0, 3).map((visit, index) => (
                            <div
                              key={visit.id}
                              className={`w-2 h-2 rounded-full ${getVisitStatusColor(visit.status).split(" ")[0]}`}
                            />
                          ))}
                          {dayVisits.length > 3 && <div className="w-2 h-2 rounded-full bg-gray-400" />}
                        </div>
                      </div>
                    )}
                  </div>
                )
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{selectedDate ? format(selectedDate, "PPP") : "Select a date"}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600 mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">{t("common.loading")}</p>
            </div>
          ) : selectedDateVisits.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No visits scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="p-3 rounded-lg border hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => onVisitSelect?.(visit)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getVisitStatusColor(visit.status)}>{visit.status}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {visit.type === "online" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                      {visit.type.replace("-", " ")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{format(visit.scheduledDate, "p")}</span>
                    <span className="text-xs text-muted-foreground">({visit.duration}m)</span>
                  </div>

                  {visit.notes && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{visit.notes}</p>}

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium">
                      {visit.price} {visit.currency}
                    </span>
                    {visit.rescheduledFrom && (
                      <Badge variant="outline" className="text-xs">
                        Rescheduled
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
