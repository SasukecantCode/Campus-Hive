"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, AlertCircle } from "lucide-react"

export default function AssignmentsPage() {
  const [userType] = useState<"student" | "mentor" | "warden" | "food-manager">("student")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const assignments = [
    {
      id: 1,
      title: "Write a program to swap 2 variables without using a 3rd variable",
      subject: "Java Programming",
      faculty: "Dr. Priya Sharma",
      assignedDate: "2024-03-01",
      dueDate: "2024-03-15",
      status: "Pending",
      priority: "Medium",
      description:
        "Create a Java program that demonstrates swapping of two integer variables without using a third temporary variable. Use arithmetic operations or XOR method.",
      maxMarks: 10,
    },
    {
      id: 2,
      title: "Implement Binary Search Algorithm in Python",
      subject: "Python",
      faculty: "Prof. Rajesh Kumar",
      assignedDate: "2024-03-03",
      dueDate: "2024-03-18",
      status: "Submitted",
      priority: "High",
      description:
        "Write a Python function to implement binary search algorithm. Include proper documentation and test cases for different scenarios.",
      maxMarks: 15,
    },
    {
      id: 3,
      title: "Design a Simple CPU Architecture Diagram",
      subject: "COA",
      faculty: "Dr. Meera Patel",
      assignedDate: "2024-03-05",
      dueDate: "2024-03-20",
      status: "In Progress",
      priority: "High",
      description:
        "Create a detailed diagram showing the basic components of a CPU including ALU, Control Unit, and Registers. Explain the data flow.",
      maxMarks: 20,
    },
    {
      id: 4,
      title: "Write a program to find factorial using recursion",
      subject: "Data Structures",
      faculty: "Dr. Arjun Reddy",
      assignedDate: "2024-03-02",
      dueDate: "2024-03-16",
      status: "Overdue",
      priority: "High",
      description:
        "Implement factorial calculation using recursive approach. Compare time complexity with iterative approach and provide analysis.",
      maxMarks: 12,
    },
    {
      id: 5,
      title: "Create a simple calculator using functions",
      subject: "Python",
      faculty: "Prof. Rajesh Kumar",
      assignedDate: "2024-03-04",
      dueDate: "2024-03-19",
      status: "Pending",
      priority: "Low",
      description:
        "Build a calculator that can perform basic arithmetic operations (add, subtract, multiply, divide) using separate functions for each operation.",
      maxMarks: 8,
    },
    {
      id: 6,
      title: "Database normalization exercise",
      subject: "Database Systems",
      faculty: "Prof. Kiran Nair",
      assignedDate: "2024-03-06",
      dueDate: "2024-03-21",
      status: "Pending",
      priority: "Medium",
      description:
        "Given a denormalized table, normalize it to 3NF. Explain each step of normalization and identify functional dependencies.",
      maxMarks: 18,
    },
    {
      id: 7,
      title: "Implement Stack using Array in Java",
      subject: "Data Structures",
      faculty: "Dr. Arjun Reddy",
      assignedDate: "2024-03-07",
      dueDate: "2024-03-22",
      status: "Pending",
      priority: "Medium",
      description:
        "Create a complete Stack implementation using arrays with push, pop, peek, and isEmpty operations. Handle overflow and underflow conditions.",
      maxMarks: 15,
    },
    {
      id: 8,
      title: "Write a program to reverse a string without using built-in functions",
      subject: "Java Programming",
      faculty: "Dr. Priya Sharma",
      assignedDate: "2024-03-08",
      dueDate: "2024-03-23",
      status: "Pending",
      priority: "Low",
      description:
        "Implement string reversal using character array manipulation. Do not use StringBuilder.reverse() or any built-in reverse functions.",
      maxMarks: 8,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-green-500 text-white"
      case "In Progress":
        return "bg-blue-500 text-white"
      case "Pending":
        return "bg-yellow-500 text-white"
      case "Overdue":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "border-red-500"
      case "Medium":
        return "border-yellow-500"
      case "Low":
        return "border-green-500"
      default:
        return "border-gray-500"
    }
  }

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navigation userType={userType} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Assignments</h1>
          <p className="text-gray-600">Track and manage your academic assignments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {assignments.filter((a) => a.status === "Pending").length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </CardContent>
          </Card>
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {assignments.filter((a) => a.status === "In Progress").length}
              </div>
              <div className="text-sm text-gray-500">In Progress</div>
            </CardContent>
          </Card>
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {assignments.filter((a) => a.status === "Submitted").length}
              </div>
              <div className="text-sm text-gray-500">Submitted</div>
            </CardContent>
          </Card>
          <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {assignments.filter((a) => a.status === "Overdue").length}
              </div>
              <div className="text-sm text-gray-500">Overdue</div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="grid gap-6">
          {assignments.map((assignment) => {
            const daysRemaining = getDaysRemaining(assignment.dueDate)
            return (
              <Card
                key={assignment.id}
                className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg hover:shadow-xl transition-shadow border-l-4 ${getPriorityColor(assignment.priority)}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold mb-2">{assignment.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{assignment.subject}</Badge>
                        <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                        <Badge variant="outline" className={`border-${assignment.priority.toLowerCase()}-500`}>
                          {assignment.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">Faculty: {assignment.faculty}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Max Marks: {assignment.maxMarks}</div>
                      {daysRemaining > 0 ? (
                        <div className="text-sm text-green-600">{daysRemaining} days left</div>
                      ) : daysRemaining === 0 ? (
                        <div className="text-sm text-yellow-600">Due today</div>
                      ) : (
                        <div className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {Math.abs(daysRemaining)} days overdue
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>{assignment.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" className="rounded-apple bg-transparent">
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {assignment.status !== "Submitted" && (
                        <Button size="sm" className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                          Submit Assignment
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
