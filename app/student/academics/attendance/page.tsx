"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { AlertTriangle, TrendingUp, Calendar, Users } from "lucide-react"

export default function AttendancePage() {
  const [selectedSubject, setSelectedSubject] = useState("all")

  const subjectAttendance = [
    { subject: "Cybersecurity", present: 18, total: 25, percentage: 72 },
    { subject: "Java Programming", present: 20, total: 24, percentage: 83 },
    { subject: "Python", present: 16, total: 22, percentage: 73 },
    { subject: "CAD", present: 19, total: 23, percentage: 83 },
    { subject: "Color Science", present: 14, total: 20, percentage: 70 },
    { subject: "C Programming", present: 21, total: 26, percentage: 81 },
  ]

  const monthlyData = [
    { month: "Sep", attendance: 78 },
    { month: "Oct", attendance: 82 },
    { month: "Nov", attendance: 75 },
    { month: "Dec", attendance: 73 },
    { month: "Jan", attendance: 76 },
  ]

  const overallAttendance = Math.round(
    subjectAttendance.reduce((acc, subject) => acc + subject.percentage, 0) / subjectAttendance.length,
  )

  const lowAttendanceSubjects = subjectAttendance.filter((subject) => subject.percentage < 75)

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="student" />

      <div className="flex">
        <Sidebar userType="student" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Attendance Overview</h1>
              <p className="text-gray-600">
                Track your attendance across all subjects and maintain the required minimum.
              </p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                      <p className="text-2xl font-bold text-campus-green-dark">{overallAttendance}%</p>
                    </div>
                    <Users className="w-8 h-8 text-campus-green-light" />
                  </div>
                  <Progress value={overallAttendance} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Classes Attended</p>
                      <p className="text-2xl font-bold text-campus-green-dark">108</p>
                    </div>
                    <Calendar className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Classes</p>
                      <p className="text-2xl font-bold text-campus-green-dark">140</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Low Attendance</p>
                      <p className="text-2xl font-bold text-red-500">{lowAttendanceSubjects.length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            {lowAttendanceSubjects.length > 0 && (
              <Card className="rounded-apple border-red-200 bg-red-50 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800 mb-2">Low Attendance Alert</h3>
                      <p className="text-red-700 mb-3">
                        You have {lowAttendanceSubjects.length} subject(s) below the 75% minimum requirement:
                      </p>
                      <div className="space-y-1">
                        {lowAttendanceSubjects.map((subject, index) => (
                          <Badge key={index} variant="destructive" className="mr-2 rounded-apple">
                            {subject.subject}: {subject.percentage}%
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Subject-wise Attendance */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="text-campus-green-dark">Subject-wise Attendance</CardTitle>
                  <CardDescription>Detailed breakdown by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectAttendance.map((subject, index) => (
                      <div key={index} className="p-4 bg-campus-cream rounded-apple">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-campus-green-dark">{subject.subject}</h4>
                          <Badge
                            variant={subject.percentage >= 75 ? "default" : "destructive"}
                            className="rounded-apple"
                          >
                            {subject.percentage}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Present: {subject.present}</span>
                          <span>Total: {subject.total}</span>
                        </div>
                        <Progress value={subject.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trend */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="text-campus-green-dark">Monthly Attendance Trend</CardTitle>
                  <CardDescription>Your attendance pattern over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="attendance" fill="#A7C1A8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    Download Attendance Report
                  </Button>
                  <Button
                    variant="outline"
                    className="border-campus-green-dark text-campus-green-dark hover:bg-campus-green-dark hover:text-white rounded-apple bg-transparent"
                  >
                    View Detailed History
                  </Button>
                  <Button
                    variant="outline"
                    className="border-campus-green-dark text-campus-green-dark hover:bg-campus-green-dark hover:text-white rounded-apple bg-transparent"
                  >
                    Request Attendance Correction
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
