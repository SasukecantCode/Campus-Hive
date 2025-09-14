"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, FileText } from "lucide-react"

export default function LeaveRequestsPage() {
  const [userType] = useState<"student" | "mentor" | "warden" | "food-manager">("student")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const leaveRequests = [
    {
      id: 1,
      studentName: "Roshan Kumar",
      regNo: "21CS001",
      applicationNo: "LR2024001",
      leaveType: "Home Visit",
      fromDate: "2024-03-15",
      toDate: "2024-03-17",
      reason: "Family wedding ceremony",
      status: "Approved",
      appliedDate: "2024-03-10",
      approvedBy: "Warden Rajesh Singh",
    },
    {
      id: 2,
      studentName: "Vijit Sharma",
      regNo: "21CS002",
      applicationNo: "LR2024002",
      leaveType: "Medical",
      fromDate: "2024-03-20",
      toDate: "2024-03-22",
      reason: "Medical treatment at home town",
      status: "Pending",
      appliedDate: "2024-03-12",
      approvedBy: null,
    },
    {
      id: 3,
      studentName: "Nasir Ahmed",
      regNo: "21CS003",
      applicationNo: "LR2024003",
      leaveType: "Emergency",
      fromDate: "2024-03-18",
      toDate: "2024-03-19",
      reason: "Family emergency",
      status: "Approved",
      appliedDate: "2024-03-17",
      approvedBy: "Warden Priya Patel",
    },
    {
      id: 4,
      studentName: "Saurabh Patel",
      regNo: "21CS004",
      applicationNo: "LR2024004",
      leaveType: "Personal",
      fromDate: "2024-03-25",
      toDate: "2024-03-27",
      reason: "Job interview preparation",
      status: "Rejected",
      appliedDate: "2024-03-14",
      approvedBy: "Warden Rajesh Singh",
    },
    {
      id: 5,
      studentName: "Pranav Singh",
      regNo: "21CS005",
      applicationNo: "LR2024005",
      leaveType: "Academic",
      fromDate: "2024-03-30",
      toDate: "2024-04-02",
      reason: "Conference participation",
      status: "Approved",
      appliedDate: "2024-03-15",
      approvedBy: "Warden Meera Nair",
    },
    {
      id: 6,
      studentName: "Inderjeet Kaur",
      regNo: "21CS006",
      applicationNo: "LR2024006",
      leaveType: "Festival",
      fromDate: "2024-04-05",
      toDate: "2024-04-08",
      reason: "Religious festival celebration",
      status: "Pending",
      appliedDate: "2024-03-16",
      approvedBy: null,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500 text-white"
      case "Pending":
        return "bg-yellow-500 text-white"
      case "Rejected":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "Medical":
        return "bg-blue-100 text-blue-800"
      case "Emergency":
        return "bg-red-100 text-red-800"
      case "Academic":
        return "bg-purple-100 text-purple-800"
      case "Festival":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navigation userType={userType} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Leave Requests</h1>
          <p className="text-gray-600">Manage student leave applications and approvals</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {leaveRequests.filter((req) => req.status === "Pending").length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </CardContent>
          </Card>
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {leaveRequests.filter((req) => req.status === "Approved").length}
              </div>
              <div className="text-sm text-gray-500">Approved</div>
            </CardContent>
          </Card>
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {leaveRequests.filter((req) => req.status === "Rejected").length}
              </div>
              <div className="text-sm text-gray-500">Rejected</div>
            </CardContent>
          </Card>
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{leaveRequests.length}</div>
              <div className="text-sm text-gray-500">Total Requests</div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Requests List */}
        <div className="grid gap-6">
          {leaveRequests.map((request) => (
            <Card
              key={request.id}
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold mb-2">{request.studentName}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{request.regNo}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{request.applicationNo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getLeaveTypeColor(request.leaveType)}>{request.leaveType}</Badge>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Leave Period</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(request.fromDate).toLocaleDateString()} -{" "}
                      {new Date(request.toDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Applied On</span>
                    </div>
                    <p className="text-sm text-gray-600">{new Date(request.appliedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Reason</h4>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{request.reason}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {request.approvedBy && (
                      <p className="text-sm text-gray-500">
                        {request.status === "Approved" ? "Approved" : "Processed"} by: {request.approvedBy}
                      </p>
                    )}
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" className="rounded-apple bg-transparent">
                      View Details
                    </Button>
                    {request.status === "Pending" && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-apple">
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="rounded-apple">
                          Reject
                        </Button>
                      </>
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
