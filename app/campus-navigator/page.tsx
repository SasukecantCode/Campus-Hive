"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { MapPin, NavigationIcon, Search, Clock, Phone } from "lucide-react"

export default function CampusNavigatorPage() {
  const [userType] = useState<"student" | "mentor" | "warden" | "food-manager">("student")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const campusLocations = [
    {
      id: "main-entrance",
      name: "Main Entrance & Flag Post",
      category: "Entrance",
      description: "Main entry point to the campus with the iconic flag post",
      coordinates: { x: 15, y: 85 },
      timings: "24/7 Open",
      contact: "+91 9876543210",
    },
    {
      id: "central-vista",
      name: "Central Vista",
      category: "Academic",
      description: "Central academic building with administrative offices",
      coordinates: { x: 25, y: 60 },
      timings: "8:00 AM - 6:00 PM",
      contact: "+91 9876543211",
    },
    {
      id: "food-court",
      name: "Food Court",
      category: "Dining",
      description: "Main dining area with multiple food options",
      coordinates: { x: 45, y: 55 },
      timings: "7:00 AM - 10:00 PM",
      contact: "+91 9876543212",
    },
    {
      id: "football-field",
      name: "Football Field",
      category: "Sports",
      description: "Main football ground for sports activities",
      coordinates: { x: 55, y: 35 },
      timings: "6:00 AM - 8:00 PM",
      contact: "+91 9876543213",
    },
    {
      id: "cricket-ground",
      name: "Cricket Ground",
      category: "Sports",
      description: "Cricket ground with pavilion and practice nets",
      coordinates: { x: 75, y: 25 },
      timings: "6:00 AM - 8:00 PM",
      contact: "+91 9876543214",
    },
    {
      id: "basketball-court",
      name: "Basketball Court",
      category: "Sports",
      description: "Indoor and outdoor basketball courts",
      coordinates: { x: 85, y: 40 },
      timings: "6:00 AM - 10:00 PM",
      contact: "+91 9876543215",
    },
    {
      id: "hostel-block-a",
      name: "Hostel Block A",
      category: "Residential",
      description: "Student residential block with modern amenities",
      coordinates: { x: 80, y: 70 },
      timings: "24/7 Access",
      contact: "+91 9876543216",
    },
    {
      id: "library",
      name: "Central Library",
      category: "Academic",
      description: "Main library with extensive collection and study areas",
      coordinates: { x: 35, y: 45 },
      timings: "8:00 AM - 10:00 PM",
      contact: "+91 9876543217",
    },
  ]

  const filteredLocations = campusLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-500"
      case "Sports":
        return "bg-green-500"
      case "Dining":
        return "bg-orange-500"
      case "Residential":
        return "bg-purple-500"
      case "Entrance":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navigation userType={userType} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Campus Navigator</h1>
          <p className="text-gray-600">Find your way around Chanakya University campus</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Campus Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Image
                    src="/images/campus-map-labeled.png"
                    alt="Campus Map"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-apple"
                  />

                  {/* Interactive Location Markers */}
                  {campusLocations.map((location) => (
                    <button
                      key={location.id}
                      className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform ${getCategoryColor(location.category)} ${
                        selectedLocation === location.id ? "scale-125 ring-4 ring-white" : ""
                      }`}
                      style={{
                        left: `${location.coordinates.x}%`,
                        top: `${location.coordinates.y}%`,
                      }}
                      onClick={() => setSelectedLocation(location.id)}
                      title={location.name}
                    />
                  ))}
                </div>

                {/* Selected Location Details */}
                {selectedLocation && (
                  <div className="mt-4 p-4 bg-campus-cream rounded-apple">
                    {(() => {
                      const location = campusLocations.find((loc) => loc.id === selectedLocation)
                      return location ? (
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                          <p className="text-gray-700 mb-2">{location.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{location.timings}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>{location.contact}</span>
                            </div>
                          </div>
                        </div>
                      ) : null
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Location Search and List */}
          <div className="space-y-6">
            {/* Search */}
            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Find Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-apple"
                />
              </CardContent>
            </Card>

            {/* Location Categories */}
            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Academic", "Sports", "Dining", "Residential", "Entrance"].map((category) => (
                    <Badge
                      key={category}
                      className={`${getCategoryColor(category)} text-white cursor-pointer hover:opacity-80`}
                      onClick={() => setSearchQuery(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location List */}
            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
              <CardHeader>
                <CardTitle>Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`p-3 rounded-apple border cursor-pointer hover:shadow-md transition-shadow ${
                        selectedLocation === location.id
                          ? "border-campus-green-dark bg-campus-cream"
                          : isDarkMode
                            ? "border-gray-600 hover:border-gray-500"
                            : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedLocation(location.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{location.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{location.description}</p>
                        </div>
                        <Badge className={`${getCategoryColor(location.category)} text-white text-xs`}>
                          {location.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg`}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                  <NavigationIcon className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full rounded-apple bg-transparent">
                  Report Issue
                </Button>
                <Button variant="outline" className="w-full rounded-apple bg-transparent">
                  Emergency Contacts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
