"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"

interface TimeSlot {
  time: string
  available: boolean
  spots: number
}

interface DaySchedule {
  date: string
  slots: TimeSlot[]
}

export function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [schedule, setSchedule] = useState<DaySchedule[]>([])

  // Simulation de données temps réel
  useEffect(() => {
    const generateSchedule = () => {
      const scheduleData: DaySchedule[] = []
      const today = new Date()

      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)

        const slots: TimeSlot[] = [
          { time: "10:00", available: Math.random() > 0.3, spots: Math.floor(Math.random() * 8) + 2 },
          { time: "14:00", available: Math.random() > 0.2, spots: Math.floor(Math.random() * 8) + 2 },
          { time: "16:00", available: Math.random() > 0.4, spots: Math.floor(Math.random() * 8) + 2 },
        ]

        scheduleData.push({
          date: date.toISOString().split("T")[0],
          slots,
        })
      }

      setSchedule(scheduleData)
    }

    generateSchedule()
    // Mise à jour toutes les 5 minutes pour simuler le temps réel
    const interval = setInterval(generateSchedule, 300000)

    return () => clearInterval(interval)
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      days.push({ date: currentDate, isCurrentMonth: true })
    }

    return days
  }

  const getAvailabilityForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    const daySchedule = schedule.find((s) => s.date === dateStr)

    if (!daySchedule) return { available: false, spots: 0 }

    const availableSlots = daySchedule.slots.filter((slot) => slot.available)
    const totalSpots = availableSlots.reduce((sum, slot) => sum + slot.spots, 0)

    return { available: availableSlots.length > 0, spots: totalSpots }
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  const selectedSchedule = selectedDate ? schedule.find((s) => s.date === selectedDate) : null

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Disponibilités en Temps Réel
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const availability = getAvailabilityForDate(day.date)
              const dateStr = day.date.toISOString().split("T")[0]
              const isToday = day.date.toDateString() === new Date().toDateString()
              const isPast = day.date < new Date() && !isToday

              return (
                <button
                  key={index}
                  onClick={() => (day.isCurrentMonth && !isPast ? setSelectedDate(dateStr) : null)}
                  disabled={!day.isCurrentMonth || isPast}
                  className={`
                    p-2 text-sm rounded-md transition-colors relative
                    ${!day.isCurrentMonth ? "text-muted-foreground/50" : ""}
                    ${isPast ? "text-muted-foreground/50 cursor-not-allowed" : ""}
                    ${isToday ? "bg-accent text-accent-foreground font-bold" : ""}
                    ${selectedDate === dateStr ? "bg-primary text-primary-foreground" : ""}
                    ${day.isCurrentMonth && !isPast && !isToday && selectedDate !== dateStr ? "hover:bg-muted" : ""}
                  `}
                >
                  {day.date.getDate()}
                  {day.isCurrentMonth && !isPast && availability.available && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedSchedule && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Créneaux Disponibles -{" "}
              {new Date(selectedDate!).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedSchedule.slots.map((slot, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    slot.available ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{slot.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {slot.available ? (
                      <>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {slot.spots} places
                        </Badge>
                        <Button size="sm">Réserver</Button>
                      </>
                    ) : (
                      <Badge variant="destructive">Complet</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
