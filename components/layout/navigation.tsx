"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Search,
  Home,
  Calendar,
  Building,
  GraduationCap,
  Shirt,
  UtensilsCrossed,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react"

interface NavigationProps {
  userType: "student" | "mentor" | "warden" | "food-manager"
}

export default function Navigation({ userType }: NavigationProps) {
  const [notifications] = useState(3) // Mock notification count

  return (
    <nav className="bg-campus-green-dark text-white shadow-lg sticky top-0 z-50">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-campus-green-light rounded-apple">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>
                  <Link href={`/${userType}`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Announcements</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-campus-green-light rounded-apple">
                  <Calendar className="w-4 h-4 mr-2" />
                  Events
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>View Calendar</DropdownMenuItem>
                <DropdownMenuItem>Upcoming Events</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-campus-green-light rounded-apple">
                  <Building className="w-4 h-4 mr-2" />
                  Hostel
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>Entry/Exit Logs</DropdownMenuItem>
                <DropdownMenuItem>Leave Requests</DropdownMenuItem>
                <DropdownMenuItem>Complaints</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-campus-green-light rounded-apple">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Academics
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>Timetable</DropdownMenuItem>
                <DropdownMenuItem>Study Material</DropdownMenuItem>
                <DropdownMenuItem>Assignments</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-campus-green-light rounded-apple">
                  <Shirt className="w-4 h-4 mr-2" />
                  Laundry
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>Book Slot</DropdownMenuItem>
                <DropdownMenuItem>Track Order</DropdownMenuItem>
                <DropdownMenuItem>Complaints</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-campus-green-light rounded-apple">
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  Cafeteria
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>Menu</DropdownMenuItem>
                <DropdownMenuItem>Meal Booking</DropdownMenuItem>
                <DropdownMenuItem>Feedback</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="text-white hover:bg-campus-green-light rounded-apple">
              <MessageSquare className="w-4 h-4 mr-2" />
              Grievances
            </Button>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-campus-green-light rounded-apple">
              <Search className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-campus-green-light rounded-apple relative"
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
                <Button variant="ghost" size="sm" className="text-white hover:bg-campus-green-light rounded-apple">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-apple">
                <DropdownMenuItem>My Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
