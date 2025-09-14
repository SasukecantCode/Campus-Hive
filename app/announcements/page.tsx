"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, MapPin, Users } from "lucide-react"

export default function AnnouncementsPage() {
  const [userType] = useState<"student" | "mentor" | "warden" | "food-manager">("student")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const announcements = [
    {
      id: 1,
      title: "Mid-Semester Examinations Schedule",
      content:
        "Mid-semester examinations will commence from March 15th, 2024. Students are advised to check their individual timetables on the academic portal.",
      type: "Academic",
      author: "Dr. Priya Sharma",
      date: "2024-03-01",
      priority: "high",
      category: "class",
    },
    {
      id: 2,
      title: "Hostel Maintenance Notice",
      content:
        "Water supply will be temporarily suspended in Block A from 10:00 AM to 2:00 PM on March 5th for maintenance work.",
      type: "Hostel",
      author: "Warden Rajesh Kumar",
      date: "2024-03-03",
      priority: "medium",
      category: "hostel",
    },
    {
      id: 3,
      title: "New Menu Items Available",
      content:
        "We're excited to introduce South Indian breakfast options including Masala Dosa and Idli Sambar starting from March 10th.",
      type: "Food Court",
      author: "Chef Suresh Nair",
      date: "2024-03-02",
      priority: "low",
      category: "food",
    },
    {
      id: 4,
      title: "Cultural Fest Registration Open",
      content:
        "Registration for the annual cultural fest 'Utsav 2024' is now open. Students can register for various events until March 20th.",
      type: "Events",
      author: "Student Council",
      date: "2024-03-01",
      priority: "medium",
      category: "class",
    },
    {
      id: 5,
      title: "Library Extended Hours",
      content:
        "Library will remain open 24/7 during examination period from March 10th to March 25th for student convenience.",
      type: "Academic",
      author: "Librarian Meera Patel",
      date: "2024-03-04",
      priority: "medium",
      category: "class",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hostel":
        return <MapPin className="w-4 h-4" />
      case "food":
        return <Users className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navigation userType={userType} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Campus Announcements</h1>
          <p className="text-gray-600">Stay updated with the latest campus news and notices</p>
        </div>

        <div className="grid gap-6">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-apple ${isDarkMode ? "bg-gray-700" : "bg-campus-cream"}`}>
                      {getCategoryIcon(announcement.category)}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">{announcement.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {announcement.type}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(announcement.priority)}`} />
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(announcement.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>{announcement.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By: {announcement.author}</span>
                  <Button variant="outline" size="sm" className="rounded-apple bg-transparent">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
