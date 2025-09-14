"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

export default function UpcomingEventsPage() {
  const [userType] = useState<"student" | "mentor" | "warden" | "food-manager">("student")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Tech Symposium 2024",
      description:
        "A comprehensive technology conference featuring industry experts, workshops, and networking opportunities for students and faculty.",
      date: "2024-03-20",
      time: "09:00 AM - 05:00 PM",
      venue: "Main Auditorium",
      category: "Academic",
      attendees: 500,
      organizer: "Computer Science Department",
      registrationRequired: true,
    },
    {
      id: 2,
      title: "Cultural Night - Rang Barse",
      description: "Celebrate the colors of Holi with traditional dance performances, music, and cultural activities.",
      date: "2024-03-25",
      time: "06:00 PM - 10:00 PM",
      venue: "Open Air Theatre",
      category: "Cultural",
      attendees: 800,
      organizer: "Student Cultural Committee",
      registrationRequired: false,
    },
    {
      id: 3,
      title: "Inter-College Cricket Tournament",
      description: "Annual cricket championship featuring teams from various colleges across the region.",
      date: "2024-04-05",
      time: "08:00 AM - 06:00 PM",
      venue: "Cricket Ground",
      category: "Sports",
      attendees: 200,
      organizer: "Sports Committee",
      registrationRequired: true,
    },
    {
      id: 4,
      title: "Career Fair 2024",
      description: "Meet with top recruiters and explore career opportunities across various industries.",
      date: "2024-04-15",
      time: "10:00 AM - 04:00 PM",
      venue: "Convention Center",
      category: "Career",
      attendees: 1000,
      organizer: "Placement Cell",
      registrationRequired: true,
    },
    {
      id: 5,
      title: "Science Exhibition",
      description: "Showcase of innovative projects and research work by students from science departments.",
      date: "2024-04-22",
      time: "09:00 AM - 05:00 PM",
      venue: "Science Block",
      category: "Academic",
      attendees: 300,
      organizer: "Science Faculty",
      registrationRequired: false,
    },
    {
      id: 6,
      title: "Food Festival - Flavors of India",
      description:
        "Experience diverse Indian cuisines from different states, prepared by local chefs and food vendors.",
      date: "2024-05-01",
      time: "11:00 AM - 09:00 PM",
      venue: "Food Court Area",
      category: "Cultural",
      attendees: 600,
      organizer: "Food Committee",
      registrationRequired: false,
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-500"
      case "Cultural":
        return "bg-purple-500"
      case "Sports":
        return "bg-green-500"
      case "Career":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navigation userType={userType} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Upcoming Events</h1>
          <p className="text-gray-600">Don't miss out on exciting campus activities and events</p>
        </div>

        <div className="grid gap-6">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold mb-2">{event.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(event.category)} text-white`}>{event.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{event.attendees} Expected Attendees</span>
                  </div>
                  <div className="text-sm text-gray-500">Organized by: {event.organizer}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {event.registrationRequired && (
                      <Badge variant="outline" className="text-xs">
                        Registration Required
                      </Badge>
                    )}
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" className="rounded-apple bg-transparent">
                      View Details
                    </Button>
                    {event.registrationRequired && (
                      <Button size="sm" className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                        Register Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
