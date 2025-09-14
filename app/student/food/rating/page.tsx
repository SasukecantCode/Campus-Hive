"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, CheckCircle, Plus, UtensilsCrossed } from "lucide-react"

export default function FoodRatingPage() {
  const [ratings] = useState([
    {
      id: 1,
      meal: "North Indian Thali",
      date: "2024-01-10",
      rating: 4,
      comment: "Good taste, fresh vegetables. Could use more variety in dal.",
      image: null,
      status: "submitted",
    },
    {
      id: 2,
      meal: "South Indian Combo",
      date: "2024-01-08",
      rating: 5,
      comment: "Excellent sambhar and crispy dosa. Very satisfied!",
      image: null,
      status: "acknowledged",
    },
    {
      id: 3,
      meal: "Chinese Special",
      date: "2024-01-05",
      rating: 2,
      comment: "Too oily and not fresh. Noodles were overcooked.",
      image: null,
      status: "resolved",
    },
  ])

  const [newRating, setNewRating] = useState({
    meal: "",
    rating: 0,
    comment: "",
    image: null as File | null,
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleStarClick = (rating: number) => {
    setNewRating({ ...newRating, rating })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewRating({ ...newRating, image: file })
    }
  }

  const handleSubmitRating = () => {
    console.log("Submitting rating:", newRating)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setIsDialogOpen(false)
      setNewRating({
        meal: "",
        rating: 0,
        comment: "",
        image: null,
      })
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "acknowledged":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const renderStars = (rating: number, interactive = false, size = "w-5 h-5") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive ? () => handleStarClick(star) : undefined}
          />
        ))}
      </div>
    )
  }

  const averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="student" />

      <div className="flex">
        <Sidebar userType="student" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Food Quality Rating</h1>
                <p className="text-gray-600">Rate your meals and help improve food quality on campus.</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Plus className="w-4 h-4 mr-2" />
                    Rate a Meal
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-apple max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-campus-green-dark">Rate Your Meal</DialogTitle>
                    <DialogDescription>Share your feedback to help us improve food quality.</DialogDescription>
                  </DialogHeader>

                  {!submitted ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="meal">Meal Name</Label>
                        <Input
                          id="meal"
                          placeholder="e.g., North Indian Thali"
                          value={newRating.meal}
                          onChange={(e) => setNewRating({ ...newRating, meal: e.target.value })}
                          className="rounded-apple"
                        />
                      </div>

                      <div>
                        <Label>Rating (out of 5 stars)</Label>
                        <div className="mt-2">{renderStars(newRating.rating, true, "w-8 h-8")}</div>
                      </div>

                      <div>
                        <Label htmlFor="comment">Your Review</Label>
                        <Textarea
                          id="comment"
                          placeholder="Share your thoughts about taste, quality, freshness..."
                          value={newRating.comment}
                          onChange={(e) => setNewRating({ ...newRating, comment: e.target.value })}
                          className="rounded-apple"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="image">Upload Photo (Optional)</Label>
                        <div className="mt-2">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="rounded-apple"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Upload a photo of your meal to help us understand better
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSubmitRating}
                          className="flex-1 bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                          disabled={!newRating.meal || newRating.rating === 0}
                        >
                          Submit Rating
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          className="flex-1 rounded-apple"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-campus-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-campus-green-dark mb-2">Rating Submitted!</h3>
                      <p className="text-gray-600">
                        Thank you for your feedback. It helps us improve our food quality.
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {/* Rating Statistics */}
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

              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                      <p className="text-2xl font-bold text-campus-green-dark">{ratings.length}</p>
                    </div>
                    <UtensilsCrossed className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Acknowledged</p>
                      <p className="text-2xl font-bold text-green-600">
                        {ratings.filter((r) => r.status === "acknowledged").length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Resolved</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {ratings.filter((r) => r.status === "resolved").length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rating History */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Your Food Ratings</CardTitle>
                <CardDescription>Track your meal reviews and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ratings.map((rating) => (
                    <div key={rating.id} className="p-4 bg-campus-cream rounded-apple border border-campus-beige">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-campus-green-dark">{rating.meal}</h3>
                          <p className="text-sm text-gray-600">Rated on {rating.date}</p>
                        </div>
                        <Badge className={`rounded-apple ${getStatusColor(rating.status)}`}>
                          {rating.status.charAt(0).toUpperCase() + rating.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        {renderStars(rating.rating)}
                        <span className="text-sm font-medium text-gray-700">{rating.rating}/5 stars</span>
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed">{rating.comment}</p>

                      {rating.status === "resolved" && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-apple">
                          <p className="text-sm text-green-700">
                            <strong>Update:</strong> Thank you for your feedback! We've made improvements based on your
                            suggestions.
                          </p>
                        </div>
                      )}
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
