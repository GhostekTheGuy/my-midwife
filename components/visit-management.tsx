"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { VisitService } from "@/services/visit-service"
import type { Visit, VisitFilters, VisitType, VisitStatus, UserRole } from "@/types/visit"
import { CalendarIcon, Clock, MapPin, Video, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"

interface VisitManagementProps {
  userRole: UserRole
  userId: string
  initialFilters?: VisitFilters
}

export function VisitManagement({ userRole, userId, initialFilters = {} }: VisitManagementProps) {
  const { t } = useLanguage()
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<VisitFilters>(initialFilters)
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false)
  const visitService = VisitService.getInstance()

  useEffect(() => {
    loadVisits()
  }, [filters])

  const loadVisits = async () => {
    setLoading(true)
    try {
      const userFilters = {
        ...filters,
        ...(userRole === "patient" ? { patientId: userId } : {}),
        ...(userRole === "midwife" ? { midwifeId: userId } : {}),
      }
      const visitData = await visitService.getVisits(userFilters)
      setVisits(visitData)
    } catch (error) {
      console.error("Failed to load visits:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (visitId: string, newStatus: VisitStatus) => {
    try {
      await visitService.updateVisit(visitId, { status: newStatus })
      await loadVisits()
    } catch (error) {
      console.error("Failed to update visit status:", error)
    }
  }

  const handleCancelVisit = async (visitId: string, reason: string) => {
    try {
      await visitService.cancelVisit(visitId, reason, userId)
      await loadVisits()
    } catch (error) {
      console.error("Failed to cancel visit:", error)
    }
  }

  const getStatusIcon = (status: VisitStatus) => {
    switch (status) {
      case "scheduled":
        return <CalendarIcon className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "rescheduled":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: VisitType) => {
    switch (type) {
      case "online":
        return <Video className="h-4 w-4" />
      case "in-person-office":
        return <MapPin className="h-4 w-4" />
      case "in-person-home":
        return <MapPin className="h-4 w-4" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  const canModifyVisit = (visit: Visit): boolean => {
    if (userRole === "admin") return true
    if (userRole === "midwife" && visit.midwifeId === userId) return true
    if (userRole === "patient" && visit.patientId === userId && ["scheduled", "confirmed"].includes(visit.status))
      return true
    return false
  }

  const getVisitActions = (visit: Visit) => {
    const actions = []

    if (canModifyVisit(visit) && ["scheduled", "confirmed"].includes(visit.status)) {
      actions.push(
        <Button
          key="reschedule"
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedVisit(visit)
            setShowRescheduleDialog(true)
          }}
        >
          {t("appointments.reschedule")}
        </Button>,
      )

      actions.push(
        <Button
          key="cancel"
          variant="outline"
          size="sm"
          onClick={() => handleCancelVisit(visit.id, "Cancelled by user")}
        >
          {t("appointments.cancel")}
        </Button>,
      )
    }

    if (userRole === "midwife" && visit.status === "scheduled") {
      actions.push(
        <Button key="confirm" size="sm" onClick={() => handleStatusChange(visit.id, "confirmed")}>
          {t("common.confirm")}
        </Button>,
      )
    }

    if (visit.type === "online" && visit.location?.meetingLink && ["confirmed", "in-progress"].includes(visit.status)) {
      actions.push(
        <Button key="join" size="sm" onClick={() => window.open(visit.location?.meetingLink, "_blank")}>
          {t("appointments.join")}
        </Button>,
      )
    }

    return actions
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("appointments.title")}</h1>
          <p className="text-muted-foreground">
            {userRole === "patient" && t("appointments.description")}
            {userRole === "midwife" && "Manage your patient appointments"}
            {userRole === "admin" && "System-wide appointment management"}
          </p>
        </div>
        {(userRole === "patient" || userRole === "admin") && (
          <Button onClick={() => setShowCreateDialog(true)}>{t("appointments.book")}</Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{t("search.filters")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select
                value={filters.status?.[0] || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: value === "all" ? undefined : [value as VisitStatus],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type-filter">Type</Label>
              <Select
                value={filters.type?.[0] || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    type: value === "all" ? undefined : [value as VisitType],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="in-person-office">In-Person (Office)</SelectItem>
                  <SelectItem value="in-person-home">In-Person (Home)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="search-filter">Search</Label>
              <Input
                id="search-filter"
                placeholder="Search visits..."
                value={filters.search || ""}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              />
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={() => setFilters({})}>
                {t("common.clear")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visit List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
            <p className="mt-2 text-muted-foreground">{t("common.loading")}</p>
          </div>
        ) : visits.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No visits found</h3>
              <p className="text-muted-foreground">
                {userRole === "patient" && "You don't have any scheduled visits."}
                {userRole === "midwife" && "No patient visits scheduled."}
                {userRole === "admin" && "No visits in the system."}
              </p>
            </CardContent>
          </Card>
        ) : (
          visits.map((visit) => (
            <Card key={visit.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(visit.status)}
                        <Badge variant={visit.status === "confirmed" ? "default" : "secondary"}>{visit.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(visit.type)}
                        <span className="text-sm text-muted-foreground">{visit.type.replace("-", " ")}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{format(visit.scheduledDate, "PPP")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(visit.scheduledDate, "p")} ({visit.duration}m)
                        </span>
                      </div>
                      {visit.location?.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{visit.location.address}</span>
                        </div>
                      )}
                    </div>

                    {visit.notes && (
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-muted-foreground">{visit.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">
                        {visit.price} {visit.currency}
                      </span>
                      {visit.rescheduledFrom && (
                        <Badge variant="outline" className="text-xs">
                          Rescheduled
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">{getVisitActions(visit)}</div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create Visit Dialog */}
      <CreateVisitDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        userRole={userRole}
        userId={userId}
        onVisitCreated={loadVisits}
      />

      {/* Reschedule Dialog */}
      <RescheduleVisitDialog
        open={showRescheduleDialog}
        onOpenChange={setShowRescheduleDialog}
        visit={selectedVisit}
        onVisitRescheduled={loadVisits}
      />
    </div>
  )
}

// Create Visit Dialog Component
function CreateVisitDialog({
  open,
  onOpenChange,
  userRole,
  userId,
  onVisitCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  userRole: UserRole
  userId: string
  onVisitCreated: () => void
}) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    type: "online" as VisitType,
    scheduledDate: new Date(),
    duration: 60,
    notes: "",
    midwifeId: "",
    patientId: userRole === "patient" ? userId : "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const visitService = VisitService.getInstance()
      await visitService.createVisit({
        ...formData,
        status: "scheduled",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        price: 150,
        currency: "PLN",
        reminders: [],
      })

      onVisitCreated()
      onOpenChange(false)
      setFormData({
        type: "online",
        scheduledDate: new Date(),
        duration: 60,
        notes: "",
        midwifeId: "",
        patientId: userRole === "patient" ? userId : "",
      })
    } catch (error) {
      console.error("Failed to create visit:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("appointments.book")}</DialogTitle>
          <DialogDescription>Schedule a new appointment</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="visit-type">Visit Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: VisitType) => setFormData((prev) => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online Consultation</SelectItem>
                <SelectItem value="in-person-office">In-Person (Office)</SelectItem>
                <SelectItem value="in-person-home">In-Person (Home)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="scheduled-date">Date & Time</Label>
            <Input
              type="datetime-local"
              value={format(formData.scheduledDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  scheduledDate: new Date(e.target.value),
                }))
              }
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select
              value={formData.duration.toString()}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: Number.parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {userRole !== "patient" && (
            <div>
              <Label htmlFor="patient-id">Patient ID</Label>
              <Input
                id="patient-id"
                value={formData.patientId}
                onChange={(e) => setFormData((prev) => ({ ...prev, patientId: e.target.value }))}
                placeholder="Enter patient ID"
              />
            </div>
          )}

          {userRole === "patient" && (
            <div>
              <Label htmlFor="midwife-id">Midwife ID</Label>
              <Input
                id="midwife-id"
                value={formData.midwifeId}
                onChange={(e) => setFormData((prev) => ({ ...prev, midwifeId: e.target.value }))}
                placeholder="Enter midwife ID"
              />
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes for the visit..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t("common.loading") : t("appointments.book")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Reschedule Visit Dialog Component
function RescheduleVisitDialog({
  open,
  onOpenChange,
  visit,
  onVisitRescheduled,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  visit: Visit | null
  onVisitRescheduled: () => void
}) {
  const { t } = useLanguage()
  const [newDate, setNewDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState(false)

  const handleReschedule = async () => {
    if (!visit) return

    setLoading(true)
    try {
      const visitService = VisitService.getInstance()
      await visitService.rescheduleVisit(visit.id, newDate)
      onVisitRescheduled()
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to reschedule visit:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!visit) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("appointments.reschedule")}</DialogTitle>
          <DialogDescription>Select a new date and time for your appointment</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Current Date</Label>
            <p className="text-sm text-muted-foreground">{format(visit.scheduledDate, "PPP p")}</p>
          </div>

          <div>
            <Label htmlFor="new-date">New Date & Time</Label>
            <Input
              type="datetime-local"
              value={format(newDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setNewDate(new Date(e.target.value))}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleReschedule} disabled={loading}>
              {loading ? t("common.loading") : t("appointments.reschedule")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
