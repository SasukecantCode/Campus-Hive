"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export default function EventsCalendarPage() {
  const [userType] = useState<"student" | "mentor" | "warden" | "food-manager">("student")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  // Indian holidays and events for 2024
  const events = {
    "2024-03-08": [{ name: "Holi", type: "holiday", color: "bg-red-500" }],
    "2024-03-15": [{ name: "Mid-Sem Exams Start", type: "academic", color: "bg-blue-500" }],
    "2024-03-25": [{ name: "Cultural Fest", type: "event", color: "bg-purple-500" }],
    "2024-04-14": [{ name: "Baisakhi", type: "holiday", color: "bg-red-500" }],
    "2024-04-17": [{ name: "Ram Navami", type: "holiday", color: "bg-red-500" }],
    "2024-05-01": [{ name: "Labour Day", type: "holiday", color: "bg-red-500" }],
    "2024-05-23": [{ name: "Buddha Purnima", type: "holiday", color: "bg-red-500" }],
    "2024-08-15": [{ name: "Independence Day", type: "holiday", color: "bg-red-500" }],
    "2024-08-26": [{ name: "Janmashtami", type: "holiday", color: "bg-red-500" }],
    "2024-10-02": [{ name: "Gandhi Jayanti", type: "holiday", color: "bg-red-500" }],
    "2024-10-12": [{ name: "Dussehra", type: "holiday", color: "bg-red-500" }],
    "2024-11-01": [{ name: "Diwali", type: "holiday", color: "bg-red-500" }],
    "2024-11-15": [{ name: "Guru Nanak Jayanti", type: "holiday", color: "bg-red-500" }],
    "2024-12-25": [{ name: "Christmas", type: "holiday", color: "bg-red-500" }],
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = events[dateKey] || []

      days.push(
        <div
          key={day}
          className={`h-24 p-2 border rounded-apple ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} hover:shadow-md transition-shadow`}
        >
          <div className="font-semibold text-sm mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.map((event, index) => (
              <div key={index} className={`text-xs p-1 rounded text-white ${event.color} truncate`}>
                {event.name}
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return days
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navigation userType={userType} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Events Calendar</h1>
          <p className="text-gray-600">View all campus events and Indian holidays</p>
        </div>

        <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="rounded-apple">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="rounded-apple">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Indian Holidays</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Academic Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">Campus Events</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
