"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Search, CheckCircle, XCircle, Clock, Building } from "lucide-react"

export default function WardenAttendancePage() {
  const [selectedSection, setSelectedSection] = useState("all")
  const [selectedFloor, setSelectedFloor] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("mark") // "mark" or "view"

  const students = [
    { regNo: "CS2021001", name: "John Doe", room: "101", floor: "1", section: "boys", attendance: "present" },
    { regNo: "CS2021002", name: "Jane Smith", room: "101", floor: "1", section: "girls", attendance: "absent" },
    { regNo: "CS2021003", name: "Mike Johnson", room: "103", floor: "1", section: "boys", attendance: "present" },
    { regNo: "CS2021004", name: "Sarah Wilson", room: "102", floor: "1", section: "girls", attendance: "present" },
    { regNo: "CS2021005", name: "David Brown", room: "104", floor: "1", section: "boys", attendance: "absent" },
    { regNo: "CS2021006", name: "Emily Davis", room: "104", floor: "1", section: "girls", attendance: "present" },
    { regNo: "CS2021007", name: "Chris Miller", room: "106", floor: "1", section: "boys", attendance: "present" },
    { regNo: "CS2021008", name: "Lisa Anderson", room: "105", floor: "1", section: "girls", attendance: "present" },
    { regNo: "CS2021009", name: "Alex Wilson", room: "201", floor: "2", section: "boys", attendance: "present" },
    { regNo: "CS2021010", name: "Anna Johnson", room: "201", floor: "2", section: "girls", attendance: "absent" },
  ]

  const [attendanceData, setAttendanceData] = useState(
    students.reduce(
      (acc, student) => {
        acc[student.regNo] = student.attendance
        return acc
      },
      {} as Record<string, string>,
    ),
  )

  const handleAttendanceChange = (regNo: string, status: string) => {
    setAttendanceData((prev) => ({
      ...prev,
      [regNo]: status,
    }))
  }

  const handleSubmitAttendance = () => {
    console.log("Submitting hostel attendance:", attendanceData)
    // Handle attendance submission logic
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSection = selectedSection === "all" || student.section === selectedSection
    const matchesFloor = selectedFloor === "all" || student.floor === selectedFloor
    return matchesSearch && matchesSection && matchesFloor
  })

  const presentCount = Object.values(attendanceData).filter((status) => status === "present").length
  const absentCount = Object.values(attendanceData).filter((status) => status === "absent").length

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="warden" />

      <div className="flex">
        <Sidebar userType="warden" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Hostel Attendance</h1>
                <p className="text-gray-600">Mark and view hostel attendance for students.</p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant={viewMode === "mark" ? "default" : "outline"}
                  onClick={() => setViewMode("mark")}
                  className="rounded-apple"
                >
                  Mark Attendance
                </Button>
                <Button
                  variant={viewMode === "view" ? "default" : "outline"}
                  onClick={() => setViewMode("view")}
                  className="rounded-apple"
                >
                  View Attendance
                </Button>
              </div>
            </div>

            {/* Filters */}
            <Card className="rounded-apple border-campus-green-light mb-8">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Filter Students</CardTitle>
                <CardDescription>Select section and floor to filter students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Select value={selectedSection} onValueChange={setSelectedSection}>
                      <SelectTrigger className="rounded-apple">
                        <SelectValue placeholder="All sections" />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        <SelectItem value="all">All Sections</SelectItem>
                        <SelectItem value="boys">Boys</SelectItem>
                        <SelectItem value="girls">Girls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="floor">Floor</Label>
                    <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                      <SelectTrigger className="rounded-apple">
                        <SelectValue placeholder="All floors" />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        <SelectItem value="all">All Floors</SelectItem>
                        <SelectItem value="1">Floor 1</SelectItem>
                        <SelectItem value="2">Floor 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-apple"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-campus-green-dark">{filteredStudents.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Present</p>
                      <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Absent</p>
                      <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Attendance %</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round((presentCount / (presentCount + absentCount)) * 100) || 0}%
                      </p>
                    </div>
                    <Building className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Student List */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">
                  {viewMode === "mark" ? "Mark Hostel Attendance" : "View Hostel Attendance"}
                </CardTitle>
                <CardDescription>
                  {viewMode === "mark"
                    ? "Mark attendance for each student in the hostel"
                    : "View current attendance status"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.regNo}
                      className="flex items-center justify-between p-4 bg-campus-cream rounded-apple border border-campus-beige"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="font-semibold text-campus-green-dark">{student.name}</h4>
                            <p className="text-sm text-gray-600">Reg No: {student.regNo}</p>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Room: {student.room}</p>
                            <p>Floor: {student.floor}</p>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Section: {student.section.charAt(0).toUpperCase() + student.section.slice(1)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {viewMode === "view" ? (
                          <Badge
                            variant={attendanceData[student.regNo] === "present" ? "default" : "destructive"}
                            className="rounded-apple"
                          >
                            {attendanceData[student.regNo] === "present" ? "Present" : "Absent"}
                          </Badge>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={attendanceData[student.regNo] === "present" ? "default" : "outline"}
                              onClick={() => handleAttendanceChange(student.regNo, "present")}
                              className="rounded-apple bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Present
                            </Button>
                            <Button
                              size="sm"
                              variant={attendanceData[student.regNo] === "absent" ? "destructive" : "outline"}
                              onClick={() => handleAttendanceChange(student.regNo, "absent")}
                              className="rounded-apple"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Absent
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {viewMode === "mark" && (
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleSubmitAttendance}
                      className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Submit Attendance
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
