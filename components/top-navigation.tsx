"use client"

import Link from "next/link"
import { Bell, Menu, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainMenu } from "@/components/main-menu"
import { useLanguage } from "@/contexts/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock user data - in real app this would come from auth context
const userData = {
  name: "Anna Kowalska",
  email: "anna.kowalska@example.com",
  initials: "AK",
}

export function TopNavigation() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t("nav.menu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <MainMenu />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-pink-600">{t("app.title")}</span>
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex md:flex-1 md:max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search.placeholder")}
              className="pl-9 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/search">
              <Plus className="h-4 w-4 mr-2" />
              {t("appointments.book")}
            </Link>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
                <span className="sr-only">{t("nav.notifications")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{t("nav.notifications")}</h4>
                  <Button variant="ghost" size="sm" className="text-xs">
                    {t("notifications.markAllRead")}
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-pink-50 border border-pink-200">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Przypomnienie o wizycie</p>
                      <p className="text-xs text-muted-foreground">
                        Twoja wizyta z Dr. Anna Kowalska jest jutro o 10:00
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 godziny temu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nowa wiadomość</p>
                      <p className="text-xs text-muted-foreground">Dr. Anna Kowalska wysłała wiadomość</p>
                      <p className="text-xs text-muted-foreground mt-1">1 dzień temu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Przypomnienie o dzienniku</p>
                      <p className="text-xs text-muted-foreground">Nie zapomnij o dzisiejszym wpisie</p>
                      <p className="text-xs text-muted-foreground mt-1">2 dni temu</p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    {t("notifications.viewAll")}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-avatar.png" alt={userData.name} />
                  <AvatarFallback>{userData.initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{userData.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">{userData.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">
                  {t("user.profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="w-full">
                  {t("user.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t("user.language")}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-3 cursor-pointer ${language === "en" ? "bg-pink-50 text-pink-600" : ""}`}
              >
                <span className="text-lg">🇺🇸</span>
                <span>{t("language.english")}</span>
                {language === "en" && <span className="ml-auto text-xs text-pink-600">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("pl")}
                className={`flex items-center gap-3 cursor-pointer ${language === "pl" ? "bg-pink-50 text-pink-600" : ""}`}
              >
                <span className="text-lg">🇵🇱</span>
                <span>{t("language.polish")}</span>
                {language === "pl" && <span className="ml-auto text-xs text-pink-600">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">{t("user.logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">{t("nav.search")}</span>
            </Link>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
                <span className="sr-only">{t("nav.notifications")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{t("nav.notifications")}</h4>
                  <Button variant="ghost" size="sm" className="text-xs">
                    {t("notifications.markAllRead")}
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-pink-50 border border-pink-200">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Przypomnienie o wizycie</p>
                      <p className="text-xs text-muted-foreground">
                        Twoja wizyta z Dr. Anna Kowalska jest jutro o 10:00
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 godziny temu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nowa wiadomość</p>
                      <p className="text-xs text-muted-foreground">Dr. Anna Kowalska wysłała wiadomość</p>
                      <p className="text-xs text-muted-foreground mt-1">1 dzień temu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Przypomnienie o dzienniku</p>
                      <p className="text-xs text-muted-foreground">Nie zapomnij o dzisiejszym wpisie</p>
                      <p className="text-xs text-muted-foreground mt-1">2 dni temu</p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    {t("notifications.viewAll")}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-avatar.png" alt={userData.name} />
                  <AvatarFallback>{userData.initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{userData.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">{userData.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">
                  {t("user.profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="w-full">
                  {t("user.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t("user.language")}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-3 cursor-pointer ${language === "en" ? "bg-pink-50 text-pink-600" : ""}`}
              >
                <span className="text-lg">🇺🇸</span>
                <span>{t("language.english")}</span>
                {language === "en" && <span className="ml-auto text-xs text-pink-600">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("pl")}
                className={`flex items-center gap-3 cursor-pointer ${language === "pl" ? "bg-pink-50 text-pink-600" : ""}`}
              >
                <span className="text-lg">🇵🇱</span>
                <span>{t("language.polish")}</span>
                {language === "pl" && <span className="ml-auto text-xs text-pink-600">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">{t("user.logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
