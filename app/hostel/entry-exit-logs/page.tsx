"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogIn, LogOut, Search, Filter } from "lucide-react"

export default function EntryExitLogsPage() {
  const [userType] = useState<"student" | "mentor" | "warden" | "food-manager">("student")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const exitedStudents = [
    {
      id: 1,
      name: "Roshan Kumar",
      regNo: "21CS001",
      time: "10:30 AM",
      destination: "City Mall",
      expectedReturn: "6:00 PM",
    },
    {
      id: 2,
      name: "Vijit Sharma",
      regNo: "21CS002",
      time: "11:15 AM",
      destination: "Home Visit",
      expectedReturn: "Tomorrow",
    },
    {
      id: 3,
      name: "Nasir Ahmed",
      regNo: "21CS003",
      time: "2:45 PM",
      destination: "Medical Checkup",
      expectedReturn: "5:00 PM",
    },
    {
      id: 4,
      name: "Saurabh Patel",
      regNo: "21CS004",
      time: "9:20 AM",
      destination: "Bank Work",
      expectedReturn: "4:00 PM",
    },
    {
      id: 5,
      name: "Pranav Singh",
      regNo: "21CS005",
      time: "1:00 PM",
      destination: "Job Interview",
      expectedReturn: "7:00 PM",
    },
    {
      id: 6,
      name: "Inderjeet Kaur",
      regNo: "21CS006",
      time: "8:45 AM",
      destination: "Family Function",
      expectedReturn: "Tomorrow",
    },
  ]

  const enteredStudents = [
    { id: 1, name: "Raiza D'Souza", regNo: "21CS007", time: "3:20 PM", from: "City Center", status: "On Time" },
    { id: 2, name: "Arjun Reddy", regNo: "21CS008", time: "4:15 PM", from: "Library", status: "On Time" },
    { id: 3, name: "Priya Nair", regNo: "21CS009", time: "5:30 PM", from: "Hospital", status: "On Time" },
    { id: 4, name: "Karan Mehta", regNo: "21CS010", time: "6:45 PM", from: "Coaching Center", status: "On Time" },
    { id: 5, name: "Sneha Gupta", regNo: "21CS011", time: "7:20 PM", from: "Shopping", status: "Late" },
    { id: 6, name: "Rahul Joshi", regNo: "21CS012", time: "8:10 PM", from: "Friend's Place", status: "Late" },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navigation userType={userType} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Entry/Exit Logs</h1>
          <p className="text-gray-600">Track student movement in and out of the hostel</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or registration number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-apple"
              />
            </div>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48 rounded-apple">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="exited">Currently Out</SelectItem>
              <SelectItem value="entered">Recently Entered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Students Who Exited */}
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <LogOut className="w-5 h-5" />
                <span>Students Out ({exitedStudents.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {exitedStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 rounded-apple border-l-4 border-red-500 ${isDarkMode ? "bg-gray-700" : "bg-red-50"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-gray-500">{student.regNo}</p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Destination:</span> {student.destination}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Expected Return:</span> {student.expectedReturn}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-red-600 border-red-600">
                          Out
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{student.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Students Who Entered */}
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <LogIn className="w-5 h-5" />
                <span>Students In ({enteredStudents.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {enteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 rounded-apple border-l-4 border-green-500 ${isDarkMode ? "bg-gray-700" : "bg-green-50"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-gray-500">{student.regNo}</p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">From:</span> {student.from}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`${
                            student.status === "On Time" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                          }`}
                        >
                          {student.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{student.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{exitedStudents.length}</div>
              <div className="text-sm text-gray-500">Currently Out</div>
            </CardContent>
          </Card>
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{enteredStudents.length}</div>
              <div className="text-sm text-gray-500">Recently Entered</div>
            </CardContent>
          </Card>
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {enteredStudents.filter((s) => s.status === "Late").length}
              </div>
              <div className="text-sm text-gray-500">Late Returns</div>
            </CardContent>
          </Card>
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{exitedStudents.length + enteredStudents.length}</div>
              <div className="text-sm text-gray-500">Total Movements</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
