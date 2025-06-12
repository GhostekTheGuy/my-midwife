import type { Visit, NotificationType, Reminder } from "@/types/visit"

export interface NotificationTemplate {
  subject: string
  body: string
  type: NotificationType
}

export class NotificationService {
  private static instance: NotificationService
  private scheduledNotifications: Map<string, NodeJS.Timeout> = new Map()

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async scheduleVisitReminders(visit: Visit): Promise<void> {
    for (const reminder of visit.reminders) {
      if (!reminder.sent && reminder.scheduledFor > new Date()) {
        await this.scheduleReminder(visit, reminder)
      }
    }
  }

  async cancelVisitReminders(visitId: string): Promise<void> {
    const timeoutId = this.scheduledNotifications.get(visitId)
    if (timeoutId) {
      clearTimeout(timeoutId)
      this.scheduledNotifications.delete(visitId)
    }
  }

  private async scheduleReminder(visit: Visit, reminder: Reminder): Promise<void> {
    const delay = reminder.scheduledFor.getTime() - Date.now()

    if (delay <= 0) {
      // Send immediately if time has passed
      await this.sendReminder(visit, reminder)
      return
    }

    const timeoutId = setTimeout(async () => {
      await this.sendReminder(visit, reminder)
      this.scheduledNotifications.delete(`${visit.id}-${reminder.id}`)
    }, delay)

    this.scheduledNotifications.set(`${visit.id}-${reminder.id}`, timeoutId)
  }

  private async sendReminder(visit: Visit, reminder: Reminder): Promise<void> {
    const templates = this.getNotificationTemplates(visit, reminder)

    for (const notificationType of reminder.notificationTypes) {
      const template = templates[notificationType]
      if (template) {
        await this.sendNotification(visit, template)
      }
    }

    // Mark reminder as sent
    reminder.sent = true
    reminder.sentAt = new Date()
  }

  private getNotificationTemplates(visit: Visit, reminder: Reminder): Record<NotificationType, NotificationTemplate> {
    const timeUntilVisit = this.getTimeUntilVisit(reminder.type)
    const visitTypeText = this.getVisitTypeText(visit.type)
    const locationText = this.getLocationText(visit)

    return {
      email: {
        subject: `Appointment Reminder - ${timeUntilVisit}`,
        body: `
          Dear Patient,
          
          This is a reminder that you have a ${visitTypeText} appointment scheduled ${timeUntilVisit}.
          
          Details:
          - Date: ${visit.scheduledDate.toLocaleDateString()}
          - Time: ${visit.scheduledDate.toLocaleTimeString()}
          - Duration: ${visit.duration} minutes
          - Type: ${visitTypeText}
          ${locationText ? `- Location: ${locationText}` : ""}
          
          ${visit.notes ? `Notes: ${visit.notes}` : ""}
          
          Please make sure to be available at the scheduled time.
          
          Best regards,
          MyMidwife Team
        `,
        type: "email",
      },
      sms: {
        subject: "Appointment Reminder",
        body: `Reminder: ${visitTypeText} appointment ${timeUntilVisit} at ${visit.scheduledDate.toLocaleTimeString()}. ${locationText || ""}`,
        type: "sms",
      },
      push: {
        subject: "Appointment Reminder",
        body: `${visitTypeText} appointment ${timeUntilVisit}`,
        type: "push",
      },
      "in-app": {
        subject: "Appointment Reminder",
        body: `You have a ${visitTypeText} appointment ${timeUntilVisit}`,
        type: "in-app",
      },
    }
  }

  private async sendNotification(visit: Visit, template: NotificationTemplate): Promise<void> {
    // Implementation would integrate with actual notification services
    console.log(`Sending ${template.type} notification:`, {
      visitId: visit.id,
      subject: template.subject,
      body: template.body,
    })

    // Here you would integrate with:
    // - Email service (SendGrid, AWS SES, etc.)
    // - SMS service (Twilio, AWS SNS, etc.)
    // - Push notification service (Firebase, OneSignal, etc.)
    // - In-app notification system
  }

  private getTimeUntilVisit(reminderType: string): string {
    switch (reminderType) {
      case "24h":
        return "tomorrow"
      case "2h":
        return "in 2 hours"
      case "30m":
        return "in 30 minutes"
      case "15m":
        return "in 15 minutes"
      default:
        return "soon"
    }
  }

  private getVisitTypeText(type: string): string {
    switch (type) {
      case "online":
        return "online consultation"
      case "in-person-office":
        return "in-person office visit"
      case "in-person-home":
        return "home visit"
      default:
        return "appointment"
    }
  }

  private getLocationText(visit: Visit): string | null {
    if (visit.type === "online" && visit.location?.meetingLink) {
      return `Join: ${visit.location.meetingLink}`
    }
    if (visit.location?.address) {
      return visit.location.address
    }
    return null
  }
}
