import type { Visit, VisitFilters, AvailabilitySlot, VisitConflict, CalendarEvent, VisitType } from "@/types/visit"

export type NotificationType = "email" | "push"

export class VisitService {
  private static instance: VisitService
  private visits: Visit[] = []
  private availabilitySlots: AvailabilitySlot[] = []

  static getInstance(): VisitService {
    if (!VisitService.instance) {
      VisitService.instance = new VisitService()
    }
    return VisitService.instance
  }

  // Visit CRUD operations
  async createVisit(visitData: Omit<Visit, "id" | "createdAt" | "updatedAt">): Promise<Visit> {
    const conflicts = await this.checkConflicts(visitData.midwifeId, visitData.scheduledDate, visitData.duration)

    if (conflicts.length > 0) {
      throw new Error(`Visit conflicts detected: ${conflicts.map((c) => c.message).join(", ")}`)
    }

    const visit: Visit = {
      ...visitData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      reminders: this.generateDefaultReminders(visitData.scheduledDate),
    }

    this.visits.push(visit)
    await this.scheduleReminders(visit)
    await this.notifyParticipants(visit, "created")

    return visit
  }

  async updateVisit(visitId: string, updates: Partial<Visit>): Promise<Visit> {
    const visitIndex = this.visits.findIndex((v) => v.id === visitId)
    if (visitIndex === -1) {
      throw new Error("Visit not found")
    }

    const currentVisit = this.visits[visitIndex]

    // Check for conflicts if date/time is being changed
    if (updates.scheduledDate || updates.duration) {
      const conflicts = await this.checkConflicts(
        currentVisit.midwifeId,
        updates.scheduledDate || currentVisit.scheduledDate,
        updates.duration || currentVisit.duration,
        visitId,
      )

      if (conflicts.length > 0) {
        throw new Error(`Update conflicts detected: ${conflicts.map((c) => c.message).join(", ")}`)
      }
    }

    const updatedVisit = {
      ...currentVisit,
      ...updates,
      updatedAt: new Date(),
    }

    this.visits[visitIndex] = updatedVisit

    // Reschedule reminders if date changed
    if (updates.scheduledDate) {
      await this.rescheduleReminders(updatedVisit)
    }

    await this.notifyParticipants(updatedVisit, "updated")
    return updatedVisit
  }

  async cancelVisit(visitId: string, reason: string, cancelledBy: string): Promise<Visit> {
    const visit = await this.getVisit(visitId)
    if (!visit) {
      throw new Error("Visit not found")
    }

    const cancelledVisit = await this.updateVisit(visitId, {
      status: "cancelled",
      cancelledAt: new Date(),
      cancellationReason: reason,
    })

    await this.cancelReminders(visitId)
    await this.notifyParticipants(cancelledVisit, "cancelled")

    return cancelledVisit
  }

  async rescheduleVisit(visitId: string, newDate: Date, newDuration?: number): Promise<Visit> {
    const originalVisit = await this.getVisit(visitId)
    if (!originalVisit) {
      throw new Error("Visit not found")
    }

    // Create new visit
    const newVisit = await this.createVisit({
      ...originalVisit,
      scheduledDate: newDate,
      duration: newDuration || originalVisit.duration,
      status: "scheduled",
      rescheduledFrom: visitId,
    })

    // Mark original as rescheduled
    await this.updateVisit(visitId, {
      status: "rescheduled",
    })

    await this.notifyParticipants(newVisit, "rescheduled")
    return newVisit
  }

  // Query operations
  async getVisit(visitId: string): Promise<Visit | null> {
    return this.visits.find((v) => v.id === visitId) || null
  }

  async getVisits(filters: VisitFilters = {}): Promise<Visit[]> {
    let filteredVisits = [...this.visits]

    if (filters.status) {
      filteredVisits = filteredVisits.filter((v) => filters.status!.includes(v.status))
    }

    if (filters.type) {
      filteredVisits = filteredVisits.filter((v) => filters.type!.includes(v.type))
    }

    if (filters.dateRange) {
      filteredVisits = filteredVisits.filter(
        (v) => v.scheduledDate >= filters.dateRange!.start && v.scheduledDate <= filters.dateRange!.end,
      )
    }

    if (filters.midwifeId) {
      filteredVisits = filteredVisits.filter((v) => v.midwifeId === filters.midwifeId)
    }

    if (filters.patientId) {
      filteredVisits = filteredVisits.filter((v) => v.patientId === filters.patientId)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredVisits = filteredVisits.filter(
        (v) => v.notes?.toLowerCase().includes(searchLower) || v.location?.address?.toLowerCase().includes(searchLower),
      )
    }

    return filteredVisits.sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
  }

  // Availability management
  async getAvailableSlots(
    midwifeId: string,
    startDate: Date,
    endDate: Date,
    visitType: VisitType,
  ): Promise<AvailabilitySlot[]> {
    return this.availabilitySlots.filter(
      (slot) =>
        slot.midwifeId === midwifeId &&
        slot.startTime >= startDate &&
        slot.endTime <= endDate &&
        slot.isAvailable &&
        slot.visitTypes.includes(visitType) &&
        slot.currentBookings < slot.maxBookings,
    )
  }

  async checkConflicts(
    midwifeId: string,
    scheduledDate: Date,
    duration: number,
    excludeVisitId?: string,
  ): Promise<VisitConflict[]> {
    const conflicts: VisitConflict[] = []
    const endTime = new Date(scheduledDate.getTime() + duration * 60000)

    // Check for overlapping visits
    const overlappingVisits = this.visits.filter(
      (v) =>
        v.midwifeId === midwifeId &&
        v.id !== excludeVisitId &&
        ["scheduled", "confirmed", "in-progress"].includes(v.status) &&
        this.timesOverlap(
          scheduledDate,
          endTime,
          v.scheduledDate,
          new Date(v.scheduledDate.getTime() + v.duration * 60000),
        ),
    )

    if (overlappingVisits.length > 0) {
      conflicts.push({
        type: "time_overlap",
        message: "Time slot conflicts with existing appointment",
        conflictingVisitId: overlappingVisits[0].id,
      })
    }

    // Check availability slots
    const availableSlot = this.availabilitySlots.find(
      (slot) =>
        slot.midwifeId === midwifeId && slot.isAvailable && scheduledDate >= slot.startTime && endTime <= slot.endTime,
    )

    if (!availableSlot) {
      conflicts.push({
        type: "unavailable_slot",
        message: "No available time slot found",
        suggestedAlternatives: await this.getSuggestedAlternatives(midwifeId, scheduledDate, duration),
      })
    }

    return conflicts
  }

  // Calendar integration
  async exportToCalendar(visitId: string): Promise<CalendarEvent> {
    const visit = await this.getVisit(visitId)
    if (!visit) {
      throw new Error("Visit not found")
    }

    return {
      id: visit.id,
      title: `Midwife Appointment - ${visit.type}`,
      start: visit.scheduledDate,
      end: new Date(visit.scheduledDate.getTime() + visit.duration * 60000),
      description: visit.notes,
      location: visit.location?.address || visit.location?.meetingLink,
      attendees: [visit.patientId, visit.midwifeId],
      url: visit.location?.meetingLink,
    }
  }

  // Notification system
  private async notifyParticipants(
    visit: Visit,
    action: "created" | "updated" | "cancelled" | "rescheduled",
  ): Promise<void> {
    // Implementation would integrate with notification service
    console.log(`Notifying participants about visit ${action}:`, visit.id)
  }

  private async scheduleReminders(visit: Visit): Promise<void> {
    // Implementation would integrate with reminder service
    console.log("Scheduling reminders for visit:", visit.id)
  }

  private async rescheduleReminders(visit: Visit): Promise<void> {
    await this.cancelReminders(visit.id)
    await this.scheduleReminders(visit)
  }

  private async cancelReminders(visitId: string): Promise<void> {
    console.log("Cancelling reminders for visit:", visitId)
  }

  // Helper methods
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  private generateDefaultReminders(scheduledDate: Date) {
    const reminders = []
    const reminderTimes = [
      { type: "24h" as const, hours: 24 },
      { type: "2h" as const, hours: 2 },
      { type: "30m" as const, hours: 0.5 },
      { type: "15m" as const, hours: 0.25 },
    ]

    reminderTimes.forEach(({ type, hours }) => {
      const reminderTime = new Date(scheduledDate.getTime() - hours * 60 * 60 * 1000)
      if (reminderTime > new Date()) {
        reminders.push({
          id: this.generateId(),
          type,
          scheduledFor: reminderTime,
          sent: false,
          notificationTypes: ["email", "push"] as NotificationType[],
        })
      }
    })

    return reminders
  }

  private timesOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
    return start1 < end2 && end1 > start2
  }

  private async getSuggestedAlternatives(midwifeId: string, requestedDate: Date, duration: number): Promise<Date[]> {
    // Implementation would suggest alternative time slots
    return []
  }
}
