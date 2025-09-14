"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Clock, BookOpen, Building, UtensilsCrossed, AlertTriangle, Users } from "lucide-react"

export default function StudentDashboard() {
  const [todaysClasses] = useState([
    { subject: "Cybersecurity", time: "9:00 AM - 10:30 AM", room: "A-201", status: "upcoming" },
    { subject: "Java Programming", time: "11:00 AM - 12:30 PM", room: "B-105", status: "upcoming" },
    { subject: "Python", time: "2:00 PM - 3:30 PM", room: "C-301", status: "completed" },
    { subject: "CAD", time: "4:00 PM - 5:30 PM", room: "D-102", status: "upcoming" },
  ])

  const attendanceData = [
    { name: "Present", value: 70, color: "#A7C1A8" },
    { name: "Absent", value: 20, color: "#ff6b6b" },
    { name: "Cancelled", value: 10, color: "#ffd93d" },
  ]

  const [pendingAssignments] = useState([
    { subject: "Cybersecurity", title: "Network Security Analysis", dueDate: "2024-01-15", priority: "high" },
    { subject: "Java", title: "OOP Concepts Implementation", dueDate: "2024-01-18", priority: "medium" },
    { subject: "Python", title: "Data Structures Project", dueDate: "2024-01-20", priority: "low" },
  ])

  const [hostelStatus] = useState({
    currentStatus: "Inside",
    lastEntry: "2024-01-10 08:30 AM",
    leaveStatus: "No active leave",
  })

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="student" />

      <div className="flex">
        <Sidebar userType="student" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Welcome back, Student!</h1>
              <p className="text-gray-600">Here's what's happening in your campus life today.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today's Classes</p>
                      <p className="text-2xl font-bold text-campus-green-dark">4</p>
                    </div>
                    <Clock className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Attendance</p>
                      <p className="text-2xl font-bold text-campus-green-dark">70%</p>
                    </div>
                    <Users className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                      <p className="text-2xl font-bold text-campus-green-dark">3</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hostel Status</p>
                      <p className="text-2xl font-bold text-campus-green-dark">Inside</p>
                    </div>
                    <Building className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Today's Classes */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <Clock className="w-5 h-5 mr-2" />
                    Today's Classes & Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysClasses.map((classItem, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-campus-cream rounded-apple">
                        <div>
                          <h4 className="font-semibold text-campus-green-dark">{classItem.subject}</h4>
                          <p className="text-sm text-gray-600">{classItem.time}</p>
                          <p className="text-sm text-gray-500">Room: {classItem.room}</p>
                        </div>
                        <Badge
                          variant={classItem.status === "completed" ? "default" : "secondary"}
                          className="rounded-apple"
                        >
                          {classItem.status === "completed" ? "Completed" : "Upcoming"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Status */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <Users className="w-5 h-5 mr-2" />
                    Attendance Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-48 h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={attendanceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {attendanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {attendanceData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                  {attendanceData[0].value < 75 && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-apple">
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-red-700">Low attendance alert! Maintain 75% minimum.</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Pending Assignments */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Pending Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingAssignments.map((assignment, index) => (
                      <div key={index} className="p-3 bg-campus-cream rounded-apple">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-campus-green-dark">{assignment.title}</h4>
                            <p className="text-sm text-gray-600">{assignment.subject}</p>
                            <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                          </div>
                          <Badge
                            variant={
                              assignment.priority === "high"
                                ? "destructive"
                                : assignment.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="rounded-apple"
                          >
                            {assignment.priority}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          className="mt-2 bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                        >
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    View All Assignments
                  </Button>
                </CardContent>
              </Card>

              {/* Hostel Status */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <Building className="w-5 h-5 mr-2" />
                    Hostel Leave/Entry Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-campus-cream rounded-apple">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Current Status</span>
                        <Badge className="bg-campus-green-light text-white rounded-apple">
                          {hostelStatus.currentStatus}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Last Entry: {hostelStatus.lastEntry}</p>
                      <p className="text-sm text-gray-600">Leave Status: {hostelStatus.leaveStatus}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                        Apply for Leave
                      </Button>
                      <Button
                        variant="outline"
                        className="border-campus-green-dark text-campus-green-dark hover:bg-campus-green-dark hover:text-white rounded-apple bg-transparent"
                      >
                        Entry/Exit Log
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Meal Booking */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <UtensilsCrossed className="w-5 h-5 mr-2" />
                    Pre-book Meal (Day Scholars)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-campus-cream rounded-apple">
                      <h4 className="font-semibold text-campus-green-dark mb-2">Today's Menu</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• North Indian Thali - ₹120</li>
                        <li>• South Indian Combo - ₹100</li>
                        <li>• Chinese Special - ₹150</li>
                        <li>• Jain Meal - ₹110</li>
                      </ul>
                    </div>
                    <Button className="w-full bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                      Pre-book Today's Meal
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Grievances */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Grievances & Complaints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Have an issue? Submit your complaint and track its progress.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                        Submit New Complaint
                      </Button>
                      <Button
                        variant="outline"
                        className="border-campus-green-dark text-campus-green-dark hover:bg-campus-green-dark hover:text-white rounded-apple bg-transparent"
                      >
                        Track Existing Complaints
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
