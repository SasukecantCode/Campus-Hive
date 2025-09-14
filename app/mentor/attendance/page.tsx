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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Search, CheckCircle, XCircle, Clock } from "lucide-react"

export default function MentorAttendancePage() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const classes = [
    { id: "cs2021", name: "CS 2021 Batch", students: 45 },
    { id: "cs2022", name: "CS 2022 Batch", students: 38 },
    { id: "cs2023", name: "CS 2023 Batch", students: 42 },
  ]

  const subjects = [
    { id: "cybersecurity", name: "Cybersecurity" },
    { id: "java", name: "Java Programming" },
    { id: "python", name: "Python" },
    { id: "cad", name: "CAD" },
  ]

  const [students] = useState([
    { regNo: "CS2021001", name: "John Doe", attendance: "present" },
    { regNo: "CS2021002", name: "Jane Smith", attendance: "absent" },
    { regNo: "CS2021003", name: "Mike Johnson", attendance: "present" },
    { regNo: "CS2021004", name: "Sarah Wilson", attendance: "present" },
    { regNo: "CS2021005", name: "David Brown", attendance: "absent" },
    { regNo: "CS2021006", name: "Emily Davis", attendance: "present" },
    { regNo: "CS2021007", name: "Chris Miller", attendance: "present" },
    { regNo: "CS2021008", name: "Lisa Anderson", attendance: "present" },
  ])

  const [attendanceData, setAttendanceData] = useState(
    students.reduce(
      (acc, student) => {
        acc[student.regNo] = student.attendance
        return acc
      },
      {} as Record<string, string>,
    ),
  )

  const [searchRegNo, setSearchRegNo] = useState("")
  const [studentReport, setStudentReport] = useState<any>(null)

  const handleAttendanceChange = (regNo: string, status: string) => {
    setAttendanceData((prev) => ({
      ...prev,
      [regNo]: status,
    }))
  }

  const handleSubmitAttendance = () => {
    console.log("Submitting attendance:", attendanceData)
    // Handle attendance submission logic
  }

  const handleSearchStudent = () => {
    if (searchRegNo) {
      // Mock student report data
      setStudentReport({
        regNo: searchRegNo,
        name: "John Doe",
        totalClasses: 25,
        attended: 18,
        percentage: 72,
        subjects: [
          { name: "Cybersecurity", attended: 15, total: 20, percentage: 75 },
          { name: "Java Programming", attended: 18, total: 22, percentage: 82 },
          { name: "Python", attended: 12, total: 18, percentage: 67 },
        ],
      })
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const presentCount = Object.values(attendanceData).filter((status) => status === "present").length
  const absentCount = Object.values(attendanceData).filter((status) => status === "absent").length

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="mentor" />

      <div className="flex">
        <Sidebar userType="mentor" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Attendance Management</h1>
                <p className="text-gray-600">Take attendance and monitor student participation.</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Search className="w-4 h-4 mr-2" />
                    Student Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-apple max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-campus-green-dark">Student Attendance Report</DialogTitle>
                    <DialogDescription>
                      Search for a student to view their detailed attendance report.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <Label htmlFor="searchRegNo">Student Registration Number</Label>
                        <Input
                          id="searchRegNo"
                          placeholder="e.g., CS2021001"
                          value={searchRegNo}
                          onChange={(e) => setSearchRegNo(e.target.value)}
                          className="rounded-apple"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={handleSearchStudent}
                          className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                        >
                          Search
                        </Button>
                      </div>
                    </div>

                    {studentReport && (
                      <Card className="rounded-apple border-campus-green-light">
                        <CardHeader>
                          <CardTitle className="text-campus-green-dark">{studentReport.name}</CardTitle>
                          <CardDescription>Registration: {studentReport.regNo}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3 bg-campus-cream rounded-apple">
                              <p className="text-2xl font-bold text-campus-green-dark">{studentReport.percentage}%</p>
                              <p className="text-sm text-gray-600">Overall</p>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-apple">
                              <p className="text-2xl font-bold text-green-600">{studentReport.attended}</p>
                              <p className="text-sm text-gray-600">Attended</p>
                            </div>
                            <div className="text-center p-3 bg-red-50 rounded-apple">
                              <p className="text-2xl font-bold text-red-600">
                                {studentReport.totalClasses - studentReport.attended}
                              </p>
                              <p className="text-sm text-gray-600">Missed</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-campus-green-dark">Subject-wise Breakdown</h4>
                            {studentReport.subjects.map((subject: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-campus-cream rounded-apple"
                              >
                                <div>
                                  <p className="font-medium">{subject.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {subject.attended}/{subject.total} classes
                                  </p>
                                </div>
                                <Badge
                                  variant={subject.percentage >= 75 ? "default" : "destructive"}
                                  className="rounded-apple"
                                >
                                  {subject.percentage}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Class Selection */}
            <Card className="rounded-apple border-campus-green-light mb-8">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Select Class and Subject</CardTitle>
                <CardDescription>Choose the class and subject to take attendance for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class">Select Class</Label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="rounded-apple">
                        <SelectValue placeholder="Choose a class" />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name} ({cls.students} students)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Select Subject</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="rounded-apple">
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedClass && selectedSubject && (
              <>
                {/* Attendance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="rounded-apple border-campus-green-light">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Students</p>
                          <p className="text-2xl font-bold text-campus-green-dark">{students.length}</p>
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
                </div>

                {/* Student List */}
                <Card className="rounded-apple border-campus-green-light">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-campus-green-dark">Student Attendance</CardTitle>
                        <CardDescription>Mark attendance for each student</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search students..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-64 rounded-apple"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredStudents.map((student) => (
                        <div
                          key={student.regNo}
                          className="flex items-center justify-between p-4 bg-campus-cream rounded-apple border border-campus-beige"
                        >
                          <div>
                            <h4 className="font-semibold text-campus-green-dark">{student.name}</h4>
                            <p className="text-sm text-gray-600">Reg No: {student.regNo}</p>
                          </div>
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
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={handleSubmitAttendance}
                        className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Submit Attendance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
