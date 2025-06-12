export type VisitStatus = "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "rescheduled"
export type VisitType = "online" | "in-person-office" | "in-person-home"
export type UserRole = "patient" | "midwife" | "admin"
export type NotificationType = "email" | "sms" | "push" | "in-app"
export type ReminderType = "24h" | "2h" | "30m" | "15m"

export interface Visit {
  id: string
  patientId: string
  midwifeId: string
  type: VisitType
  status: VisitStatus
  scheduledDate: Date
  duration: number // in minutes
  timezone: string
  location?: {
    address?: string
    coordinates?: { lat: number; lng: number }
    meetingLink?: string
    roomNumber?: string
  }
  notes?: string
  attachments?: Attachment[]
  price: number
  currency: string
  createdAt: Date
  updatedAt: Date
  cancelledAt?: Date
  cancellationReason?: string
  rescheduledFrom?: string // previous visit ID
  reminders: Reminder[]
  metadata?: Record<string, any>
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: Date
  uploadedBy: string
}

export interface Reminder {
  id: string
  type: ReminderType
  scheduledFor: Date
  sent: boolean
  sentAt?: Date
  notificationTypes: NotificationType[]
}

export interface AvailabilitySlot {
  id: string
  midwifeId: string
  startTime: Date
  endTime: Date
  isAvailable: boolean
  visitTypes: VisitType[]
  maxBookings: number
  currentBookings: number
  timezone: string
}

export interface VisitConflict {
  type: "time_overlap" | "double_booking" | "unavailable_slot" | "timezone_mismatch"
  message: string
  conflictingVisitId?: string
  suggestedAlternatives?: Date[]
}

export interface VisitFilters {
  status?: VisitStatus[]
  type?: VisitType[]
  dateRange?: { start: Date; end: Date }
  midwifeId?: string
  patientId?: string
  search?: string
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  description?: string
  location?: string
  attendees?: string[]
  url?: string
}
