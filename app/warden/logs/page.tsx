"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Download, Filter, LogIn, LogOut, Search } from "lucide-react"

export default function EntryExitLogsPage() {
  const [dateFilter, setDateFilter] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")
  const [gateFilter, setGateFilter] = useState("all")
  const [studentFilter, setStudentFilter] = useState("")

  const [entryExitLogs] = useState([
    {
      id: 1,
      student: "John Doe",
      regNo: "CS2021001",
      room: "101",
      action: "exit",
      timestamp: "2024-01-15 18:30:00",
      gate: "Main Gate",
      purpose: "Medical appointment",
      expectedReturn: "2024-01-15 20:00:00",
      actualReturn: null,
      status: "out",
    },
    {
      id: 2,
      student: "Jane Smith",
      regNo: "CS2021002",
      room: "101",
      action: "entry",
      timestamp: "2024-01-15 19:45:00",
      gate: "Main Gate",
      purpose: "Shopping",
      expectedReturn: null,
      actualReturn: "2024-01-15 19:45:00",
      status: "in",
    },
    {
      id: 3,
      student: "Mike Johnson",
      regNo: "CS2021003",
      room: "103",
      action: "exit",
      timestamp: "2024-01-15 16:00:00",
      gate: "Side Gate",
      purpose: "Library visit",
      expectedReturn: "2024-01-15 18:00:00",
      actualReturn: "2024-01-15 17:30:00",
      status: "in",
    },
    {
      id: 4,
      student: "Sarah Wilson",
      regNo: "CS2021004",
      room: "102",
      action: "exit",
      timestamp: "2024-01-15 20:15:00",
      gate: "Main Gate",
      purpose: "Family visit",
      expectedReturn: "2024-01-16 10:00:00",
      actualReturn: null,
      status: "out",
    },
    {
      id: 5,
      student: "David Brown",
      regNo: "CS2021005",
      room: "104",
      action: "entry",
      timestamp: "2024-01-15 23:30:00",
      gate: "Main Gate",
      purpose: "Late return",
      expectedReturn: null,
      actualReturn: "2024-01-15 23:30:00",
      status: "in",
      lateEntry: true,
    },
  ])

  const [currentlyOut] = useState([
    {
      student: "John Doe",
      regNo: "CS2021001",
      room: "101",
      exitTime: "2024-01-15 18:30:00",
      expectedReturn: "2024-01-15 20:00:00",
      purpose: "Medical appointment",
      overdue: true,
    },
    {
      student: "Sarah Wilson",
      regNo: "CS2021004",
      room: "102",
      exitTime: "2024-01-15 20:15:00",
      expectedReturn: "2024-01-16 10:00:00",
      purpose: "Family visit",
      overdue: false,
    },
  ])

  const handleExportReport = () => {
    console.log("Exporting entry/exit report")
    // Handle report export logic
  }

  const filteredLogs = entryExitLogs.filter((log) => {
    const matchesDate = !dateFilter || log.timestamp.includes(dateFilter)
    const matchesGate = gateFilter === "all" || log.gate === gateFilter
    const matchesStudent =
      !studentFilter ||
      log.student.toLowerCase().includes(studentFilter.toLowerCase()) ||
      log.regNo.toLowerCase().includes(studentFilter.toLowerCase())
    return matchesDate && matchesGate && matchesStudent
  })

  const getActionIcon = (action: string) => {
    return action === "entry" ? (
      <LogIn className="w-4 h-4 text-green-600" />
    ) : (
      <LogOut className="w-4 h-4 text-red-600" />
    )
  }

  const getStatusBadge = (status: string, lateEntry?: boolean) => {
    if (lateEntry) {
      return (
        <Badge variant="destructive" className="rounded-apple">
          Late Entry
        </Badge>
      )
    }
    return (
      <Badge variant={status === "in" ? "default" : "secondary"} className="rounded-apple">
        {status === "in" ? "Inside" : "Outside"}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="warden" />

      <div className="flex">
        <Sidebar userType="warden" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Entry/Exit Logs</h1>
                <p className="text-gray-600">Monitor student movements and track hostel in/out records.</p>
              </div>

              <Button
                onClick={handleExportReport}
                className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Filters */}
            <Card className="rounded-apple border-campus-green-light mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-campus-green-dark">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter Records
                </CardTitle>
                <CardDescription>Filter entry/exit logs by date, time, gate, or student</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="rounded-apple"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Time Range</Label>
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="rounded-apple">
                        <SelectValue placeholder="All times" />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        <SelectItem value="all">All Times</SelectItem>
                        <SelectItem value="morning">Morning (6AM-12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM-6PM)</SelectItem>
                        <SelectItem value="evening">Evening (6PM-10PM)</SelectItem>
                        <SelectItem value="night">Night (10PM-6AM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="gate">Gate</Label>
                    <Select value={gateFilter} onValueChange={setGateFilter}>
                      <SelectTrigger className="rounded-apple">
                        <SelectValue placeholder="All gates" />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        <SelectItem value="all">All Gates</SelectItem>
                        <SelectItem value="Main Gate">Main Gate</SelectItem>
                        <SelectItem value="Side Gate">Side Gate</SelectItem>
                        <SelectItem value="Back Gate">Back Gate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="student">Student</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="student"
                        placeholder="Search student..."
                        value={studentFilter}
                        onChange={(e) => setStudentFilter(e.target.value)}
                        className="pl-10 rounded-apple"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Currently Outside */}
              <Card className="rounded-apple border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <LogOut className="w-5 h-5 mr-2" />
                    Currently Outside
                  </CardTitle>
                  <CardDescription>Students who are currently out of the hostel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentlyOut.map((student, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-apple border ${
                          student.overdue ? "bg-red-50 border-red-200" : "bg-orange-50 border-orange-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className={`font-semibold ${student.overdue ? "text-red-800" : "text-orange-800"}`}>
                              {student.student}
                            </h4>
                            <p className={`text-sm ${student.overdue ? "text-red-700" : "text-orange-700"}`}>
                              {student.regNo} - Room {student.room}
                            </p>
                            <p className={`text-xs ${student.overdue ? "text-red-600" : "text-orange-600"}`}>
                              {student.purpose}
                            </p>
                          </div>
                          {student.overdue && (
                            <Badge variant="destructive" className="rounded-apple text-xs">
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <div className={`mt-2 text-xs ${student.overdue ? "text-red-600" : "text-orange-600"}`}>
                          <p>Out since: {student.exitTime}</p>
                          <p>Expected: {student.expectedReturn}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="rounded-apple border-campus-green-light">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Today's Entries</p>
                        <p className="text-2xl font-bold text-green-600">
                          {filteredLogs.filter((log) => log.action === "entry").length}
                        </p>
                      </div>
                      <LogIn className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-apple border-campus-green-light">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Today's Exits</p>
                        <p className="text-2xl font-bold text-red-600">
                          {filteredLogs.filter((log) => log.action === "exit").length}
                        </p>
                      </div>
                      <LogOut className="w-8 h-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-apple border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Late Entries</p>
                        <p className="text-2xl font-bold text-red-600">
                          {filteredLogs.filter((log) => log.lateEntry).length}
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Entry/Exit Logs */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Entry/Exit Records</CardTitle>
                <CardDescription>Detailed log of all student movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="p-4 bg-campus-cream rounded-apple border border-campus-beige">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="mt-1">{getActionIcon(log.action)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-campus-green-dark">{log.student}</h4>
                              {getStatusBadge(log.status, log.lateEntry)}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                <p>
                                  <strong>Reg No:</strong> {log.regNo}
                                </p>
                                <p>
                                  <strong>Room:</strong> {log.room}
                                </p>
                                <p>
                                  <strong>Gate:</strong> {log.gate}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <strong>Time:</strong> {log.timestamp}
                                </p>
                                <p>
                                  <strong>Purpose:</strong> {log.purpose}
                                </p>
                                {log.expectedReturn && (
                                  <p>
                                    <strong>Expected Return:</strong> {log.expectedReturn}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={log.action === "entry" ? "default" : "secondary"} className="rounded-apple">
                            {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
