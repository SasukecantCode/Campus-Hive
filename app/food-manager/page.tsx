"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { UtensilsCrossed, Users, TrendingUp, AlertTriangle, Star, Sparkles } from "lucide-react"

export default function FoodManagerDashboard() {
  const [todaysMenu] = useState([
    { category: "North Indian", items: ["Dal Makhani", "Butter Naan", "Jeera Rice"], price: 120, orders: 45 },
    { category: "South Indian", items: ["Sambar", "Coconut Rice", "Papad"], price: 100, orders: 38 },
    { category: "Chinese", items: ["Fried Rice", "Manchurian", "Spring Rolls"], price: 150, orders: 32 },
    { category: "Jain Special", items: ["Jain Dal", "Roti", "Sabzi"], price: 110, orders: 15 },
  ])

  const [preBookings] = useState([
    { student: "John Doe", regNo: "CS2021001", meal: "North Indian Thali", time: "12:30 PM", status: "confirmed" },
    { student: "Jane Smith", regNo: "CS2021002", meal: "South Indian Combo", time: "1:00 PM", status: "confirmed" },
    { student: "Mike Johnson", regNo: "CS2021003", meal: "Chinese Special", time: "12:45 PM", status: "pending" },
  ])

  const [cancellations] = useState([
    {
      student: "Sarah Wilson",
      regNo: "CS2021004",
      meal: "Hostel Dinner",
      reason: "Going out with family",
      time: "6:00 PM",
    },
    { student: "David Brown", regNo: "CS2021005", meal: "Hostel Lunch", reason: "Not feeling well", time: "12:00 PM" },
  ])

  const [aiPredictions] = useState([
    {
      event: "Republic Day Celebration",
      date: "2024-01-26",
      prediction: "30% students likely to go home",
      recommendation: "Reduce food preparation by 25%",
      confidence: 85,
    },
    {
      event: "Weekend",
      date: "2024-01-20-21",
      prediction: "40% students going out",
      recommendation: "Prepare lighter menu options",
      confidence: 78,
    },
  ])

  const [recentFeedback] = useState([
    {
      student: "Alex Wilson",
      rating: 4,
      comment: "Good taste, fresh vegetables",
      meal: "North Indian Thali",
      status: "unread",
    },
    {
      student: "Emma Davis",
      rating: 5,
      comment: "Excellent sambhar and crispy dosa",
      meal: "South Indian Combo",
      status: "unread",
    },
    {
      student: "Chris Miller",
      rating: 2,
      comment: "Too oily and not fresh",
      meal: "Chinese Special",
      status: "unread",
    },
  ])

  const totalOrders = todaysMenu.reduce((acc, item) => acc + item.orders, 0)
  const avgRating = recentFeedback.reduce((acc, feedback) => acc + feedback.rating, 0) / recentFeedback.length
  const unreadFeedback = recentFeedback.filter((f) => f.status === "unread").length

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="food-manager" />

      <div className="flex">
        <Sidebar userType="food-manager" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Food Manager Dashboard</h1>
              <p className="text-gray-600">Manage menus, track orders, and optimize food services.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                      <p className="text-2xl font-bold text-campus-green-dark">{totalOrders}</p>
                    </div>
                    <UtensilsCrossed className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pre-bookings</p>
                      <p className="text-2xl font-bold text-blue-600">{preBookings.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cancellations</p>
                      <p className="text-2xl font-bold text-yellow-600">{cancellations.length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                      <p className="text-2xl font-bold text-green-600">{avgRating.toFixed(1)}</p>
                    </div>
                    <Star className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Today's Menu */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <UtensilsCrossed className="w-5 h-5 mr-2" />
                    Today's Menu Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysMenu.map((item, index) => (
                      <div key={index} className="p-4 bg-campus-cream rounded-apple border border-campus-beige">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-campus-green-dark">{item.category}</h4>
                          <Badge variant="outline" className="rounded-apple">
                            ₹{item.price}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{item.items.join(", ")}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Orders: {item.orders}</span>
                          <Progress value={(item.orders / totalOrders) * 100} className="w-24 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    Update Today's Menu
                  </Button>
                </CardContent>
              </Card>

              {/* AI Predictions */}
              <Card className="rounded-apple border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700">
                    <Sparkles className="w-5 h-5 mr-2" />
                    AI Demand Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiPredictions.map((prediction, index) => (
                      <div key={index} className="p-4 bg-purple-50 rounded-apple border border-purple-200">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-purple-800">{prediction.event}</h4>
                            <p className="text-sm text-purple-700">{prediction.date}</p>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800 rounded-apple">
                            {prediction.confidence}% confident
                          </Badge>
                        </div>
                        <p className="text-sm text-purple-700 mb-2">
                          <strong>Prediction:</strong> {prediction.prediction}
                        </p>
                        <p className="text-sm text-purple-800 font-medium">
                          <strong>Recommendation:</strong> {prediction.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-apple">
                    <p className="text-sm text-green-700 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <strong>Impact:</strong> AI predictions help reduce food waste by 35% on average
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Pre-bookings */}
              <Card className="rounded-apple border-campus-green-light">
                <CardHeader>
                  <CardTitle className="flex items-center text-campus-green-dark">
                    <Users className="w-5 h-5 mr-2" />
                    Day Scholar Pre-bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {preBookings.map((booking, index) => (
                      <div key={index} className="p-3 bg-campus-cream rounded-apple border border-campus-beige">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-campus-green-dark">{booking.student}</h4>
                            <p className="text-sm text-gray-600">{booking.regNo}</p>
                            <p className="text-sm text-gray-600">{booking.meal}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{booking.time}</p>
                            <Badge
                              variant={booking.status === "confirmed" ? "default" : "secondary"}
                              className="rounded-apple"
                            >
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    View All Pre-bookings
                  </Button>
                </CardContent>
              </Card>

              {/* Cancellations */}
              <Card className="rounded-apple border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-700">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Meal Cancellations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cancellations.map((cancellation, index) => (
                      <div key={index} className="p-3 bg-yellow-50 rounded-apple border border-yellow-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-yellow-800">{cancellation.student}</h4>
                            <p className="text-sm text-yellow-700">{cancellation.regNo}</p>
                            <p className="text-sm text-yellow-700">{cancellation.meal}</p>
                            <p className="text-xs text-yellow-600 mt-1">
                              <strong>Reason:</strong> {cancellation.reason}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-yellow-800">{cancellation.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-apple">
                    <p className="text-sm text-green-700 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <strong>Waste Reduction:</strong> Pre-cancellations save ~15kg food daily
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Feedback */}
            <Card className="rounded-apple border-campus-green-light mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-campus-green-dark">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Recent Student Feedback
                  </div>
                  <Badge variant="destructive" className="rounded-apple">
                    {unreadFeedback} unread
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => (
                    <div key={index} className="p-4 bg-campus-cream rounded-apple border border-campus-beige">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-campus-green-dark">{feedback.student}</h4>
                          <p className="text-sm text-gray-600">{feedback.meal}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <Badge
                            variant={feedback.status === "unread" ? "destructive" : "default"}
                            className="rounded-apple"
                          >
                            {feedback.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{feedback.comment}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                          Mark as Read
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-apple bg-transparent">
                          Add Notes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <UtensilsCrossed className="w-4 h-4 mr-2" />
                    Update Menu
                  </Button>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Users className="w-4 h-4 mr-2" />
                    View Bookings
                  </Button>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Star className="w-4 h-4 mr-2" />
                    Review Feedback
                  </Button>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
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
