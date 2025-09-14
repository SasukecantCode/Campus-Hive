"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Plus } from "lucide-react"

export default function LeaveManagerPage() {
  const [leaveRequests] = useState([
    {
      id: 1,
      type: "Day Out",
      fromDate: "2024-01-15",
      toDate: "2024-01-15",
      reason: "Medical appointment",
      status: "approved",
      appliedOn: "2024-01-10",
      approvedBy: "Warden Smith",
    },
    {
      id: 2,
      type: "Weekend Leave",
      fromDate: "2024-01-20",
      toDate: "2024-01-21",
      reason: "Family function",
      status: "pending",
      appliedOn: "2024-01-12",
    },
    {
      id: 3,
      type: "Long Leave",
      fromDate: "2024-01-25",
      toDate: "2024-01-28",
      reason: "Sister's wedding",
      status: "rejected",
      appliedOn: "2024-01-08",
      rejectedBy: "Warden Smith",
      rejectionReason: "Insufficient notice period",
    },
  ])

  const [newLeave, setNewLeave] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
    guardianContact: "",
    emergencyContact: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmitLeave = () => {
    // Handle leave submission logic here
    console.log("Submitting leave:", newLeave)
    setIsDialogOpen(false)
    setNewLeave({
      type: "",
      fromDate: "",
      toDate: "",
      reason: "",
      guardianContact: "",
      emergencyContact: "",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="student" />

      <div className="flex">
        <Sidebar userType="student" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Leave Manager</h1>
                <p className="text-gray-600">Apply for hostel leave and track your requests.</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Plus className="w-4 h-4 mr-2" />
                    Apply for Leave
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-apple max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-campus-green-dark">Apply for Leave</DialogTitle>
                    <DialogDescription>Fill in the details for your leave request.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="leaveType">Leave Type</Label>
                      <Select
                        value={newLeave.type}
                        onValueChange={(value) => setNewLeave({ ...newLeave, type: value })}
                      >
                        <SelectTrigger className="rounded-apple">
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-apple">
                          <SelectItem value="day-out">Day Out</SelectItem>
                          <SelectItem value="weekend">Weekend Leave</SelectItem>
                          <SelectItem value="long-leave">Long Leave</SelectItem>
                          <SelectItem value="emergency">Emergency Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fromDate">From Date</Label>
                        <Input
                          id="fromDate"
                          type="date"
                          value={newLeave.fromDate}
                          onChange={(e) => setNewLeave({ ...newLeave, fromDate: e.target.value })}
                          className="rounded-apple"
                        />
                      </div>
                      <div>
                        <Label htmlFor="toDate">To Date</Label>
                        <Input
                          id="toDate"
                          type="date"
                          value={newLeave.toDate}
                          onChange={(e) => setNewLeave({ ...newLeave, toDate: e.target.value })}
                          className="rounded-apple"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reason">Reason for Leave</Label>
                      <Textarea
                        id="reason"
                        placeholder="Please provide a detailed reason for your leave..."
                        value={newLeave.reason}
                        onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                        className="rounded-apple"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="guardianContact">Guardian Contact</Label>
                      <Input
                        id="guardianContact"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={newLeave.guardianContact}
                        onChange={(e) => setNewLeave({ ...newLeave, guardianContact: e.target.value })}
                        className="rounded-apple"
                      />
                    </div>

                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={newLeave.emergencyContact}
                        onChange={(e) => setNewLeave({ ...newLeave, emergencyContact: e.target.value })}
                        className="rounded-apple"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSubmitLeave}
                        className="flex-1 bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                        disabled={!newLeave.type || !newLeave.fromDate || !newLeave.toDate || !newLeave.reason}
                      >
                        Submit Request
                      </Button>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 rounded-apple">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Leave Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Requests</p>
                      <p className="text-2xl font-bold text-campus-green-dark">{leaveRequests.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Approved</p>
                      <p className="text-2xl font-bold text-green-600">
                        {leaveRequests.filter((req) => req.status === "approved").length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {leaveRequests.filter((req) => req.status === "pending").length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Rejected</p>
                      <p className="text-2xl font-bold text-red-600">
                        {leaveRequests.filter((req) => req.status === "rejected").length}
                      </p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leave Requests History */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Leave Requests History</CardTitle>
                <CardDescription>Track all your leave applications and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map((request) => (
                    <div key={request.id} className="p-4 bg-campus-cream rounded-apple border border-campus-beige">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-campus-green-dark">{request.type}</h3>
                            <Badge className={`rounded-apple ${getStatusColor(request.status)}`}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(request.status)}
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </div>
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p>
                                <strong>Duration:</strong> {request.fromDate} to {request.toDate}
                              </p>
                              <p>
                                <strong>Applied on:</strong> {request.appliedOn}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Reason:</strong> {request.reason}
                              </p>
                              {request.status === "approved" && request.approvedBy && (
                                <p>
                                  <strong>Approved by:</strong> {request.approvedBy}
                                </p>
                              )}
                              {request.status === "rejected" && request.rejectedBy && (
                                <p>
                                  <strong>Rejected by:</strong> {request.rejectedBy}
                                </p>
                              )}
                            </div>
                          </div>

                          {request.status === "rejected" && request.rejectionReason && (
                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-apple">
                              <p className="text-sm text-red-700">
                                <strong>Rejection Reason:</strong> {request.rejectionReason}
                              </p>
                            </div>
                          )}
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
