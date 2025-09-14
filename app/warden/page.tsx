"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Users, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function WardenDashboard() {
  const [selectedSection, setSelectedSection] = useState("boys")
  const [selectedFloor, setSelectedFloor] = useState("1")

  // Mock data for hostel occupancy
  const hostelData = {
    boys: {
      "1": [
        { room: "101", status: "occupied", student: "John Doe", regNo: "CS2021001" },
        { room: "102", status: "vacant", student: null, regNo: null },
        { room: "103", status: "occupied", student: "Mike Johnson", regNo: "CS2021003" },
        { room: "104", status: "occupied", student: "David Brown", regNo: "CS2021005" },
        { room: "105", status: "vacant", student: null, regNo: null },
        { room: "106", status: "occupied", student: "Chris Miller", regNo: "CS2021007" },
      ],
      "2": [
        { room: "201", status: "occupied", student: "Alex Wilson", regNo: "CS2021009" },
        { room: "202", status: "occupied", student: "Ryan Davis", regNo: "CS2021011" },
        { room: "203", status: "vacant", student: null, regNo: null },
        { room: "204", status: "occupied", student: "Kevin Brown", regNo: "CS2021013" },
        { room: "205", status: "occupied", student: "Mark Taylor", regNo: "CS2021015" },
        { room: "206", status: "vacant", student: null, regNo: null },
      ],
    },
    girls: {
      "1": [
        { room: "101", status: "occupied", student: "Jane Smith", regNo: "CS2021002" },
        { room: "102", status: "occupied", student: "Sarah Wilson", regNo: "CS2021004" },
        { room: "103", status: "vacant", student: null, regNo: null },
        { room: "104", status: "occupied", student: "Emily Davis", regNo: "CS2021006" },
        { room: "105", status: "occupied", student: "Lisa Anderson", regNo: "CS2021008" },
        { room: "106", status: "vacant", student: null, regNo: null },
      ],
      "2": [
        { room: "201", status: "occupied", student: "Anna Johnson", regNo: "CS2021010" },
        { room: "202", status: "vacant", student: null, regNo: null },
        { room: "203", status: "occupied", student: "Maria Garcia", regNo: "CS2021012" },
        { room: "204", status: "occupied", student: "Sophie Miller", regNo: "CS2021014" },
        { room: "205", status: "vacant", student: null, regNo: null },
        { room: "206", status: "occupied", student: "Emma Wilson", regNo: "CS2021016" },
      ],
    },
  }

  const [leaveRequests] = useState([
    {
      id: 1,
      student: "John Doe",
      regNo: "CS2021001",
      type: "Weekend Leave",
      fromDate: "2024-01-20",
      toDate: "2024-01-21",
      reason: "Family function",
      status: "pending",
      appliedOn: "2024-01-12",
    },
    {
      id: 2,
      student: "Jane Smith",
      regNo: "CS2021002",
      type: "Day Out",
      fromDate: "2024-01-18",
      toDate: "2024-01-18",
      reason: "Medical appointment",
      status: "pending",
      appliedOn: "2024-01-15",
    },
    {
      id: 3,
      student: "Mike Johnson",
      regNo: "CS2021003",
      type: "Long Leave",
      fromDate: "2024-01-25",
      toDate: "2024-01-28",
      reason: "Sister's wedding",
      status: "pending",
      appliedOn: "2024-01-10",
    },
  ])

  const [lateEntries] = useState([
    { student: "David Brown", regNo: "CS2021005", time: "11:30 PM", date: "2024-01-15", room: "104" },
    { student: "Chris Miller", regNo: "CS2021007", time: "12:15 AM", date: "2024-01-15", room: "106" },
  ])

  const [absentees] = useState([
    { student: "Alex Wilson", regNo: "CS2021009", room: "201", floor: "2", lastSeen: "2024-01-14 6:00 PM" },
    { student: "Kevin Brown", regNo: "CS2021013", room: "204", floor: "2", lastSeen: "2024-01-14 8:30 PM" },
  ])

  const currentRooms = hostelData[selectedSection as keyof typeof hostelData]?.[selectedFloor] || []
  const occupiedRooms = currentRooms.filter((room) => room.status === "occupied").length
  const vacantRooms = currentRooms.filter((room) => room.status === "vacant").length

  const handleApproveLeave = (id: number) => {
    console.log("Approving leave request:", id)
    // Handle leave approval logic
  }

  const handleRejectLeave = (id: number) => {
    console.log("Rejecting leave request:", id)
    // Handle leave rejection logic
  }

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="warden" />

      <div className="flex">
        <Sidebar userType="warden" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Warden Dashboard</h1>
              <p className="text-gray-600">
                Manage hostel operations, monitor student activities, and handle requests.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-campus-green-dark">156</p>
                    </div>
                    <Users className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                      <p className="text-2xl font-bold text-yellow-600">{leaveRequests.length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Late Entries</p>
                      <p className="text-2xl font-bold text-red-600">{lateEntries.length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Absentees</p>
                      <p className="text-2xl font-bold text-orange-600">{absentees.length}</p>
                    </div>
                    <Building className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Hostel Occupancy */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <Building className="w-5 h-5 mr-2" />
                    Hostel Occupancy
                  </CardTitle>
                  <div className="flex gap-4">
                    <Select value={selectedSection} onValueChange={setSelectedSection}>
                      <SelectTrigger className="w-32 rounded-apple">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        <SelectItem value="boys">Boys</SelectItem>
                        <SelectItem value="girls">Girls</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                      <SelectTrigger className="w-32 rounded-apple">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        <SelectItem value="1">Floor 1</SelectItem>
                        <SelectItem value="2">Floor 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex gap-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                      <span className="text-sm">Occupied ({occupiedRooms})</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                      <span className="text-sm">Vacant ({vacantRooms})</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {currentRooms.map((room) => (
                      <div
                        key={room.room}
                        className={`p-3 rounded-apple border-2 ${
                          room.status === "occupied" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                        }`}
                      >
                        <div className="text-center">
                          <p className="font-semibold text-sm">{room.room}</p>
                          {room.student && (
                            <div className="mt-1">
                              <p className="text-xs font-medium">{room.student}</p>
                              <p className="text-xs text-gray-500">{room.regNo}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leave Requests */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <Clock className="w-5 h-5 mr-2" />
                    Pending Leave Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaveRequests.map((request) => (
                      <div key={request.id} className="p-4 bg-campus-cream rounded-apple border border-campus-beige">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-campus-green-dark">{request.student}</h4>
                            <p className="text-sm text-gray-600">Reg No: {request.regNo}</p>
                            <p className="text-sm text-gray-600">Type: {request.type}</p>
                          </div>
                          <Badge variant="outline" className="rounded-apple">
                            {request.fromDate} to {request.toDate}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">
                          <strong>Reason:</strong> {request.reason}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveLeave(request.id)}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-apple"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectLeave(request.id)}
                            className="rounded-apple"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Late Entries */}
              <Card className="rounded-apple border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Late Entries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lateEntries.map((entry, index) => (
                      <div key={index} className="p-3 bg-red-50 rounded-apple border border-red-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-red-800">{entry.student}</h4>
                            <p className="text-sm text-red-700">Reg No: {entry.regNo}</p>
                            <p className="text-sm text-red-700">Room: {entry.room}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-red-800">{entry.time}</p>
                            <p className="text-xs text-red-600">{entry.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white rounded-apple">
                    View All Late Entries
                  </Button>
                </CardContent>
              </Card>

              {/* Absentees */}
              <Card className="rounded-apple border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <Building className="w-5 h-5 mr-2" />
                    Current Absentees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {absentees.map((absentee, index) => (
                      <div key={index} className="p-3 bg-orange-50 rounded-apple border border-orange-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-orange-800">{absentee.student}</h4>
                            <p className="text-sm text-orange-700">Reg No: {absentee.regNo}</p>
                            <p className="text-sm text-orange-700">
                              Room: {absentee.room} (Floor {absentee.floor})
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-orange-600">Last seen:</p>
                            <p className="text-sm font-semibold text-orange-800">{absentee.lastSeen}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white rounded-apple">
                    View All Absentees
                  </Button>
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
                    <Users className="w-4 h-4 mr-2" />
                    Mark Attendance
                  </Button>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Building className="w-4 h-4 mr-2" />
                    Entry/Exit Logs
                  </Button>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Clock className="w-4 h-4 mr-2" />
                    Leave Manager
                  </Button>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Handle Grievances
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
