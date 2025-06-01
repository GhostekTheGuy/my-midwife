"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("profile.title")}</h1>
        <p className="text-muted-foreground">{t("profile.preferences")}</p>
      </div>

      <div className="grid gap-6">
        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t("user.language")}</CardTitle>
            <CardDescription>Wybierz preferowany język aplikacji</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">🇵🇱</span>
                <Label htmlFor="polish">Polski</Label>
              </div>
              <Switch id="polish" checked={language === "pl"} onCheckedChange={() => setLanguage("pl")} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">🇺🇸</span>
                <Label htmlFor="english">English</Label>
              </div>
              <Switch id="english" checked={language === "en"} onCheckedChange={() => setLanguage("en")} />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.notifications")}</CardTitle>
            <CardDescription>Zarządzaj swoimi powiadomieniami</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="appointment-reminders">Przypomnienia o wizytach</Label>
              <Switch id="appointment-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="message-notifications">Powiadomienia o wiadomościach</Label>
              <Switch id="message-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="health-reminders">Przypomnienia o zdrowiu</Label>
              <Switch id="health-reminders" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.privacy")}</CardTitle>
            <CardDescription>Kontroluj swoje ustawienia prywatności</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visibility">Widoczność profilu</Label>
              <Switch id="profile-visibility" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-sharing">Udostępnianie danych</Label>
              <Switch id="data-sharing" />
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end">
          <Button>{t("common.save")}</Button>
        </div>
      </div>
    </div>
  )
}
