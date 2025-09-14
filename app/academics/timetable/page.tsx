"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, User } from "lucide-react"

export default function TimetablePage() {
  const [userType] = useState<"student" | "mentor" | "warden" | "food-manager">("student")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState("5")

  const timetable = {
    Monday: [
      { time: "9:00-10:00", subject: "Java Programming", faculty: "Dr. Priya Sharma", room: "Lab 1", type: "Lab" },
      { time: "10:00-11:00", subject: "Python", faculty: "Prof. Rajesh Kumar", room: "Room 201", type: "Theory" },
      { time: "11:30-12:30", subject: "COA", faculty: "Dr. Meera Patel", room: "Room 105", type: "Theory" },
      { time: "2:00-3:00", subject: "Life Skills", faculty: "Ms. Sneha Gupta", room: "Room 301", type: "Theory" },
    ],
    Tuesday: [
      { time: "9:00-10:00", subject: "Python", faculty: "Prof. Rajesh Kumar", room: "Lab 2", type: "Lab" },
      { time: "10:00-11:00", subject: "COA", faculty: "Dr. Meera Patel", room: "Room 105", type: "Theory" },
      { time: "11:30-12:30", subject: "Data Structures", faculty: "Dr. Arjun Reddy", room: "Room 202", type: "Theory" },
      { time: "2:00-3:00", subject: "Java Programming", faculty: "Dr. Priya Sharma", room: "Room 201", type: "Theory" },
    ],
    Wednesday: [
      {
        time: "9:00-10:00",
        subject: "Database Systems",
        faculty: "Prof. Kiran Nair",
        room: "Room 103",
        type: "Theory",
      },
      { time: "10:00-11:00", subject: "Life Skills", faculty: "Ms. Sneha Gupta", room: "Room 301", type: "Theory" },
      { time: "11:30-12:30", subject: "Python", faculty: "Prof. Rajesh Kumar", room: "Lab 2", type: "Lab" },
      { time: "2:00-3:00", subject: "COA", faculty: "Dr. Meera Patel", room: "Lab 3", type: "Lab" },
    ],
    Thursday: [
      { time: "9:00-10:00", subject: "Data Structures", faculty: "Dr. Arjun Reddy", room: "Lab 1", type: "Lab" },
      {
        time: "10:00-11:00",
        subject: "Database Systems",
        faculty: "Prof. Kiran Nair",
        room: "Room 103",
        type: "Theory",
      },
      {
        time: "11:30-12:30",
        subject: "Java Programming",
        faculty: "Dr. Priya Sharma",
        room: "Room 201",
        type: "Theory",
      },
      {
        time: "2:00-3:00",
        subject: "Software Engineering",
        faculty: "Dr. Rahul Joshi",
        room: "Room 204",
        type: "Theory",
      },
    ],
    Friday: [
      {
        time: "9:00-10:00",
        subject: "Software Engineering",
        faculty: "Dr. Rahul Joshi",
        room: "Room 204",
        type: "Theory",
      },
      { time: "10:00-11:00", subject: "Database Systems", faculty: "Prof. Kiran Nair", room: "Lab 3", type: "Lab" },
      { time: "11:30-12:30", subject: "Data Structures", faculty: "Dr. Arjun Reddy", room: "Room 202", type: "Theory" },
      { time: "2:00-3:00", subject: "Project Work", faculty: "Multiple Faculty", room: "Lab 1", type: "Project" },
    ],
    Saturday: [
      { time: "9:00-10:00", subject: "Seminar", faculty: "Guest Speaker", room: "Auditorium", type: "Seminar" },
      { time: "10:00-11:00", subject: "Project Work", faculty: "Multiple Faculty", room: "Lab 1", type: "Project" },
    ],
  }

  const getSubjectColor = (type: string) => {
    switch (type) {
      case "Lab":
        return "bg-blue-500 text-white"
      case "Theory":
        return "bg-green-500 text-white"
      case "Project":
        return "bg-purple-500 text-white"
      case "Seminar":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navigation userType={userType} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Class Timetable</h1>
          <p className="text-gray-600">View your weekly class schedule</p>
        </div>

        {/* Semester Selection */}
        <div className="mb-6">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-48 rounded-apple">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Semester 1</SelectItem>
              <SelectItem value="2">Semester 2</SelectItem>
              <SelectItem value="3">Semester 3</SelectItem>
              <SelectItem value="4">Semester 4</SelectItem>
              <SelectItem value="5">Semester 5</SelectItem>
              <SelectItem value="6">Semester 6</SelectItem>
              <SelectItem value="7">Semester 7</SelectItem>
              <SelectItem value="8">Semester 8</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timetable Grid */}
        <div className="grid gap-6">
          {days.map((day) => (
            <Card
              key={day}
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-campus-green-dark">{day}</CardTitle>
              </CardHeader>
              <CardContent>
                {timetable[day as keyof typeof timetable] ? (
                  <div className="grid gap-3">
                    {timetable[day as keyof typeof timetable].map((class_, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-apple border-l-4 border-campus-green-dark ${isDarkMode ? "bg-gray-700" : "bg-campus-cream"}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-lg">{class_.subject}</h4>
                              <Badge className={getSubjectColor(class_.type)}>{class_.type}</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{class_.faculty}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{class_.room}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{class_.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No classes scheduled</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg mt-6`}>
          <CardHeader>
            <CardTitle>Class Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Lab Sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Theory Classes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">Project Work</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm">Seminars</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
