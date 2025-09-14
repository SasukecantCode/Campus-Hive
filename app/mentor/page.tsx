"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, BookOpen, Upload, Bell, TrendingUp } from "lucide-react"

export default function MentorDashboard() {
  const [todaysClasses] = useState([
    { subject: "Cybersecurity", time: "9:00 AM - 10:30 AM", room: "A-201", students: 45, status: "upcoming" },
    { subject: "Java Programming", time: "11:00 AM - 12:30 PM", room: "B-105", students: 38, status: "completed" },
    { subject: "Python", time: "2:00 PM - 3:30 PM", room: "C-301", students: 42, status: "upcoming" },
  ])

  const [attendanceAlerts] = useState([
    { student: "John Doe", regNo: "CS2021001", subject: "Cybersecurity", attendance: 68, alert: "low" },
    { student: "Jane Smith", regNo: "CS2021002", subject: "Java Programming", attendance: 72, alert: "low" },
  ])

  const [pendingUploads] = useState([
    { subject: "Cybersecurity", type: "Lecture Notes", topic: "Network Security Fundamentals", dueDate: "2024-01-15" },
    { subject: "Python", type: "Assignment", topic: "Data Structures Implementation", dueDate: "2024-01-18" },
  ])

  const [recentActivities] = useState([
    { action: "Uploaded lecture notes", subject: "Java Programming", time: "2 hours ago" },
    { action: "Took attendance", subject: "Cybersecurity", time: "4 hours ago" },
    { action: "Posted announcement", subject: "Python", time: "1 day ago" },
  ])

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="mentor" />

      <div className="flex">
        <Sidebar userType="mentor" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Welcome back, Professor!</h1>
              <p className="text-gray-600">Manage your classes, track student progress, and share resources.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today's Classes</p>
                      <p className="text-2xl font-bold text-campus-green-dark">{todaysClasses.length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-campus-green-dark">125</p>
                    </div>
                    <Users className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Attendance Alerts</p>
                      <p className="text-2xl font-bold text-yellow-600">{attendanceAlerts.length}</p>
                    </div>
                    <Bell className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Uploads</p>
                      <p className="text-2xl font-bold text-blue-600">{pendingUploads.length}</p>
                    </div>
                    <Upload className="w-8 h-8 text-blue-500" />
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
                    Today's Classes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysClasses.map((classItem, index) => (
                      <div key={index} className="p-4 bg-campus-cream rounded-apple border border-campus-beige">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-campus-green-dark">{classItem.subject}</h4>
                          <Badge
                            variant={classItem.status === "completed" ? "default" : "secondary"}
                            className="rounded-apple"
                          >
                            {classItem.status === "completed" ? "Completed" : "Upcoming"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p>
                              <strong>Time:</strong> {classItem.time}
                            </p>
                            <p>
                              <strong>Room:</strong> {classItem.room}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Students:</strong> {classItem.students}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                            Take Attendance
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-apple bg-transparent">
                            Upload Resources
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Alerts */}
              <Card className="rounded-apple border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-700">
                    <Bell className="w-5 h-5 mr-2" />
                    Attendance Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendanceAlerts.map((alert, index) => (
                      <div key={index} className="p-4 bg-yellow-50 rounded-apple border border-yellow-200">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-yellow-800">{alert.student}</h4>
                            <p className="text-sm text-yellow-700">Reg No: {alert.regNo}</p>
                            <p className="text-sm text-yellow-700">Subject: {alert.subject}</p>
                          </div>
                          <Badge variant="destructive" className="rounded-apple">
                            {alert.attendance}%
                          </Badge>
                        </div>
                        <Progress value={alert.attendance} className="mb-3" />
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-apple">
                          Send Reminder
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-apple">
                    View All Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Pending Uploads */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <Upload className="w-5 h-5 mr-2" />
                    Pending Uploads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingUploads.map((upload, index) => (
                      <div key={index} className="p-4 bg-campus-cream rounded-apple border border-campus-beige">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-campus-green-dark">{upload.topic}</h4>
                            <p className="text-sm text-gray-600">{upload.subject}</p>
                            <p className="text-sm text-gray-500">Type: {upload.type}</p>
                          </div>
                          <Badge variant="outline" className="rounded-apple">
                            Due: {upload.dueDate}
                          </Badge>
                        </div>
                        <Button size="sm" className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                          Upload Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-campus-cream rounded-apple">
                        <div className="w-2 h-2 bg-campus-green-dark rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-campus-green-dark">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.subject}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Upload Resources
                  </Button>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Users className="w-4 h-4 mr-2" />
                    Take Attendance
                  </Button>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Bell className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
