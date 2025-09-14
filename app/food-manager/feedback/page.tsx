"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MessageSquare, CheckCircle, Clock, TrendingUp } from "lucide-react"

export default function FeedbackPage() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRating, setFilterRating] = useState("all")

  const [feedbackList] = useState([
    {
      id: 1,
      student: "John Doe",
      regNo: "CS2021001",
      meal: "North Indian Thali",
      rating: 4,
      comment: "Good taste, fresh vegetables. Could use more variety in dal.",
      image: null,
      date: "2024-01-15",
      status: "unread",
      response: null,
    },
    {
      id: 2,
      student: "Jane Smith",
      regNo: "CS2021002",
      meal: "South Indian Combo",
      rating: 5,
      comment: "Excellent sambhar and crispy dosa. Very satisfied!",
      image: null,
      date: "2024-01-14",
      status: "acknowledged",
      response: "Thank you for the positive feedback! We'll maintain the quality.",
    },
    {
      id: 3,
      student: "Mike Johnson",
      regNo: "CS2021003",
      meal: "Chinese Special",
      rating: 2,
      comment: "Too oily and not fresh. Noodles were overcooked.",
      image: null,
      date: "2024-01-13",
      status: "resolved",
      response: "We've addressed the oil content and cooking time. Please try again!",
    },
    {
      id: 4,
      student: "Sarah Wilson",
      regNo: "CS2021004",
      meal: "Jain Special",
      rating: 3,
      comment: "Decent taste but portion size could be better.",
      image: null,
      date: "2024-01-12",
      status: "unread",
      response: null,
    },
  ])

  const [responses, setResponses] = useState<Record<number, string>>({})

  const handleMarkAsRead = (id: number) => {
    console.log("Marking feedback as read:", id)
    // Handle mark as read logic
  }

  const handleAddResponse = (id: number) => {
    const response = responses[id]
    if (response) {
      console.log("Adding response to feedback:", id, response)
      // Handle add response logic
      setResponses({ ...responses, [id]: "" })
    }
  }

  const handleResponseChange = (id: number, value: string) => {
    setResponses({ ...responses, [id]: value })
  }

  const filteredFeedback = feedbackList.filter((feedback) => {
    const matchesStatus = filterStatus === "all" || feedback.status === filterStatus
    const matchesRating = filterRating === "all" || feedback.rating.toString() === filterRating
    return matchesStatus && matchesRating
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800 border-red-200"
      case "acknowledged":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <MessageSquare className="w-4 h-4" />
      case "acknowledged":
        return <Clock className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  const averageRating = feedbackList.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbackList.length
  const unreadCount = feedbackList.filter((f) => f.status === "unread").length
  const resolvedCount = feedbackList.filter((f) => f.status === "resolved").length

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="food-manager" />

      <div className="flex">
        <Sidebar userType="food-manager" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Student Feedback & Reviews</h1>
              <p className="text-gray-600">Monitor student satisfaction and respond to feedback.</p>
            </div>

            {/* Feedback Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-campus-green-dark">{averageRating.toFixed(1)}</p>
                    </div>
                    <div className="flex items-center">{renderStars(Math.round(averageRating))}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Unread</p>
                      <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Resolved</p>
                      <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                      <p className="text-2xl font-bold text-blue-600">{feedbackList.length}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="rounded-apple border-campus-green-light mb-8">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Filter Feedback</CardTitle>
                <CardDescription>Filter reviews by status and rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="rounded-apple">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="acknowledged">Acknowledged</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className="rounded-apple">
                        <SelectValue placeholder="Filter by rating" />
                      </SelectTrigger>
                      <SelectContent className="rounded-apple">
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback List */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Student Reviews</CardTitle>
                <CardDescription>Respond to student feedback and track improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredFeedback.map((feedback) => (
                    <div key={feedback.id} className="p-6 bg-campus-cream rounded-apple border border-campus-beige">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-campus-green-dark">{feedback.student}</h3>
                            <Badge className={`rounded-apple ${getStatusColor(feedback.status)}`}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(feedback.status)}
                                {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                              </div>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {feedback.regNo} • {feedback.meal} • {feedback.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(feedback.rating)}
                          <span className="text-sm font-medium text-gray-700">{feedback.rating}/5</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{feedback.comment}</p>

                      {feedback.response && (
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-apple">
                          <p className="text-sm font-medium text-blue-800 mb-1">Your Response:</p>
                          <p className="text-blue-700">{feedback.response}</p>
                        </div>
                      )}

                      {feedback.status === "unread" && (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Write your response to this feedback..."
                            value={responses[feedback.id] || ""}
                            onChange={(e) => handleResponseChange(feedback.id, e.target.value)}
                            className="rounded-apple"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAddResponse(feedback.id)}
                              className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                              disabled={!responses[feedback.id]}
                            >
                              Send Response
                            </Button>
                            <Button
                              onClick={() => handleMarkAsRead(feedback.id)}
                              variant="outline"
                              className="rounded-apple bg-transparent\
