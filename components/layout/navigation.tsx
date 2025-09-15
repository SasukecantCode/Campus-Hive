"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Moon,
  Sun,
  Home,
  Calendar,
  Building,
  GraduationCap,
  Shirt,
  UtensilsCrossed,
  MessageSquare,
  User,
  LogOut,
  Wifi,
  ExternalLink,
} from "lucide-react"

interface NavigationProps {
  userType: "student" | "mentor" | "warden" | "food-manager"
  isDarkMode?: boolean
  onToggleDarkMode?: () => void
}

export default function Navigation({ userType, isDarkMode = false, onToggleDarkMode }: NavigationProps) {
  const [notifications] = useState(3) // Mock notification count

  return (
    <nav
      className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-campus-green-dark text-white"} shadow-lg sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${userType}`} className="flex items-center space-x-3">
            <Image
              src="/images/campus-hive-logo.png"
              alt="Campus Hive"
              width={40}
              height={40}
              className="rounded-apple"
            />
            <span className="text-xl font-bold">Campus Hive</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
              onClick={() =>
                window.open(
                  "https://v0.app/chat/campus-navigation-system-kDZODM8CMTD?b=v0-preview-b_OaTvNPirBHm&path=%2F&f=1",
                  "_blank",
                )
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Campus Navigator
            </Button>

            <Button
              variant="ghost"
              className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
              onClick={() => document.getElementById("crowd-management")?.scrollIntoView({ behavior: "smooth" })}
              title="This system uses wifi Pings and takes data from the Number of devices connected to the routers in that region"
            >
              <Wifi className="w-4 h-4 mr-2" />
              Crowd Management
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>
                  <Link href={`/${userType}`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/announcements">Announcements</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Events
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>
                  <Link href="/events/calendar">View Calendar</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/events/upcoming">Upcoming Events</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
                >
                  <Building className="w-4 h-4 mr-2" />
                  Hostel
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>
                  <Link href="/hostel/entry-exit-logs">Entry/Exit Logs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/hostel/leave-requests">Leave Requests</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/hostel/complaints">Complaints</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Academics
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>
                  <Link href="/academics/timetable">Timetable</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/academics/study-material">Study Material</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/academics/assignments">Assignments</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
                >
                  <Shirt className="w-4 h-4 mr-2" />
                  Laundry
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>
                  <Link href="/laundry/book-slot">Book Slot</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/laundry/track-order">Track Order</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/laundry/complaints">Complaints</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
                >
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  Cafeteria
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>
                  <Link href="/cafeteria/menu">Menu</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cafeteria/meal-booking">Meal Booking</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cafeteria/feedback">Feedback</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
            >
              <Link href="/grievances" className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Grievances
              </Link>
            </Button>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
              onClick={onToggleDarkMode}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple relative`}
                >
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple w-64">
                <DropdownMenuItem>New assignment posted</DropdownMenuItem>
                <DropdownMenuItem>Leave request approved</DropdownMenuItem>
                <DropdownMenuItem>Food menu updated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white hover:${isDarkMode ? "bg-gray-700" : "bg-campus-green-light"} rounded-apple`}
                >
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/" className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
