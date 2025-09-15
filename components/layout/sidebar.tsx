"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Calendar,
  Building,
  GraduationCap,
  Shirt,
  UtensilsCrossed,
  MessageSquare,
  User,
  ChevronDown,
  ChevronRight,
  BookOpen,
  ClipboardList,
  MapPin,
  Users,
  Wifi,
  ExternalLink,
} from "lucide-react"

interface SidebarProps {
  userType: "student" | "mentor" | "warden" | "food-manager"
}

export default function Sidebar({ userType }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["dashboard"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const getMentorSidebarItems = () => [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: `/mentor`,
      children: [],
    },
    {
      id: "class-management",
      label: "Class Management",
      icon: GraduationCap,
      children: [
        { label: "Take Attendance", href: `/mentor/attendance`, icon: ClipboardList },
        { label: "Upload Resources", href: `/mentor/resources`, icon: BookOpen },
        { label: "Student Reports", href: `/mentor/reports`, icon: ClipboardList },
      ],
    },
    {
      id: "student-interaction",
      label: "Student Interaction",
      icon: Users,
      children: [
        { label: "View Attendance Reports", href: `/mentor/student-reports` },
        { label: "Send Announcements", href: `/mentor/announcements` },
        { label: "Feedback & Guidance", href: `/mentor/feedback` },
      ],
    },
    {
      id: "grievances",
      label: "Academic Grievances",
      icon: MessageSquare,
      children: [
        { label: "View Complaints", href: `/mentor/grievances/view` },
        { label: "Respond to Issues", href: `/mentor/grievances/respond` },
      ],
    },
    {
      id: "events",
      label: "Events",
      icon: Calendar,
      href: `/mentor/events`,
      children: [],
    },
    {
      id: "profile",
      label: "Profile & Settings",
      icon: User,
      children: [
        { label: "Personal Info", href: `/mentor/profile/info` },
        { label: "Subject Settings", href: `/mentor/profile/subjects` },
        { label: "Notification Settings", href: `/mentor/profile/notifications` },
      ],
    },
  ]

  const getStudentSidebarItems = () => [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: `/student`,
      children: [],
    },
    {
      id: "external-navigator",
      label: "Campus Navigator (External)",
      icon: ExternalLink,
      href: "https://v0.app/chat/campus-navigation-system-kDZODM8CMTD?b=v0-preview-b_OaTvNPirBHm&path=%2F&f=1",
      children: [],
      external: true,
    },
    {
      id: "crowd-management",
      label: "Crowd Management",
      icon: Wifi,
      href: "#crowd-management",
      children: [],
      tooltip:
        "This system uses wifi Pings and takes data from the Number of devices connected to the routers in that region",
    },
    {
      id: "academics",
      label: "Academics",
      icon: GraduationCap,
      children: [
        { label: "Attendance", href: `/student/academics/attendance`, icon: ClipboardList },
        { label: "Study Resources", href: `/student/academics/resources`, icon: BookOpen },
        { label: "Assignments", href: `/student/academics/assignments`, icon: ClipboardList },
      ],
    },
    {
      id: "hostel",
      label: "Hostel",
      icon: Building,
      children: [
        { label: "Attendance", href: `/student/hostel/attendance` },
        { label: "Leave Manager", href: `/student/hostel/leave` },
        { label: "Entry/Exit Logs", href: `/student/hostel/logs` },
      ],
    },
    {
      id: "food",
      label: "Food Services",
      icon: UtensilsCrossed,
      children: [
        { label: "Daily Menu", href: `/student/food/menu` },
        { label: "Pre-book Meals", href: `/student/food/booking` },
        { label: "Cancel Meals", href: `/student/food/cancel` },
        { label: "Rate Food", href: `/student/food/rating` },
      ],
    },
    {
      id: "laundry",
      label: "Laundry",
      icon: Shirt,
      children: [
        { label: "Book Slot", href: `/student/laundry/book` },
        { label: "Track Order", href: `/student/laundry/track` },
        { label: "Price List", href: `/student/laundry/prices` },
      ],
    },
    {
      id: "grievances",
      label: "Grievances",
      icon: MessageSquare,
      children: [
        { label: "Submit Complaint", href: `/student/grievances/submit` },
        { label: "Track Status", href: `/student/grievances/track` },
      ],
    },
    {
      id: "events",
      label: "Events",
      icon: Calendar,
      href: `/student/events`,
      children: [],
    },
    {
      id: "navigator",
      label: "Campus Navigator",
      icon: MapPin,
      href: `/student/navigator`,
      children: [],
    },
    {
      id: "profile",
      label: "Profile & Settings",
      icon: User,
      children: [
        { label: "Personal Info", href: `/student/profile/info` },
        { label: "Security Settings", href: `/student/profile/security` },
      ],
    },
  ]

  const getWardenSidebarItems = () => [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: `/warden`,
      children: [],
    },
    {
      id: "hostel-management",
      label: "Hostel Management",
      icon: Building,
      children: [
        { label: "Hostel Attendance", href: `/warden/attendance`, icon: ClipboardList },
        { label: "Entry/Exit Logs", href: `/warden/logs`, icon: ClipboardList },
        { label: "Room Management", href: `/warden/rooms`, icon: Building },
      ],
    },
    {
      id: "leave-management",
      label: "Leave Management",
      icon: Calendar,
      children: [
        { label: "Pending Requests", href: `/warden/leave/pending` },
        { label: "Leave History", href: `/warden/leave/history` },
        { label: "Approve/Reject", href: `/warden/leave/manage` },
      ],
    },
    {
      id: "monitoring",
      label: "Student Monitoring",
      icon: Users,
      children: [
        { label: "Late Entries", href: `/warden/monitoring/late` },
        { label: "Absentees", href: `/warden/monitoring/absent` },
        { label: "Disciplinary Actions", href: `/warden/monitoring/discipline` },
      ],
    },
    {
      id: "grievances",
      label: "Hostel Grievances",
      icon: MessageSquare,
      children: [
        { label: "View Complaints", href: `/warden/grievances/view` },
        { label: "Resolve Issues", href: `/warden/grievances/resolve` },
      ],
    },
    {
      id: "events",
      label: "Events",
      icon: Calendar,
      href: `/warden/events`,
      children: [],
    },
    {
      id: "profile",
      label: "Profile & Settings",
      icon: User,
      children: [
        { label: "Personal Info", href: `/warden/profile/info` },
        { label: "Hostel Settings", href: `/warden/profile/hostel` },
        { label: "Notification Settings", href: `/warden/profile/notifications` },
      ],
    },
  ]

  const getFoodManagerSidebarItems = () => [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: `/food-manager`,
      children: [],
    },
    {
      id: "menu-management",
      label: "Menu Management",
      icon: UtensilsCrossed,
      children: [
        { label: "Create/Update Menu", href: `/food-manager/menu`, icon: BookOpen },
        { label: "Special Meals", href: `/food-manager/special`, icon: ClipboardList },
        { label: "Nutrition Info", href: `/food-manager/nutrition`, icon: ClipboardList },
      ],
    },
    {
      id: "bookings",
      label: "Bookings & Orders",
      icon: Users,
      children: [
        { label: "Pre-booked Meals", href: `/food-manager/bookings` },
        { label: "Cancellations", href: `/food-manager/cancellations` },
        { label: "Order Analytics", href: `/food-manager/analytics` },
      ],
    },
    {
      id: "feedback",
      label: "Feedback & Reviews",
      icon: MessageSquare,
      children: [
        { label: "Student Ratings", href: `/food-manager/feedback/ratings` },
        { label: "Suggestions", href: `/food-manager/feedback/suggestions` },
        { label: "Resolved Issues", href: `/food-manager/feedback/resolved` },
      ],
    },
    {
      id: "ai-insights",
      label: "AI Demand Prediction",
      icon: Building,
      children: [
        { label: "Demand Forecasts", href: `/food-manager/ai/forecasts` },
        { label: "Waste Reduction", href: `/food-manager/ai/waste` },
        { label: "Festival Predictions", href: `/food-manager/ai/festivals` },
      ],
    },
    {
      id: "events",
      label: "Events",
      icon: Calendar,
      href: `/food-manager/events`,
      children: [],
    },
    {
      id: "profile",
      label: "Profile & Settings",
      icon: User,
      children: [
        { label: "Personal Info", href: `/food-manager/profile/info` },
        { label: "Staff Management", href: `/food-manager/profile/staff` },
        { label: "Service Timings", href: `/food-manager/profile/timings` },
      ],
    },
  ]

  const getSidebarItems = () => {
    switch (userType) {
      case "mentor":
        return getMentorSidebarItems()
      case "student":
        return getStudentSidebarItems()
      case "warden":
        return getWardenSidebarItems()
      case "food-manager":
        return getFoodManagerSidebarItems()
      default:
        return getStudentSidebarItems()
    }
  }

  const sidebarItems = getSidebarItems()

  return (
    <div className="w-64 bg-white border-r border-campus-beige h-screen sticky top-16">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-campus-green-dark mb-4 capitalize">{userType} Portal</h2>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <div key={item.id}>
                {item.children.length > 0 ? (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left rounded-apple hover:bg-campus-cream"
                      onClick={() => toggleSection(item.id)}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
                      {expandedSections.includes(item.id) ? (
                        <ChevronDown className="w-4 h-4 ml-auto" />
                      ) : (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </Button>
                    {expandedSections.includes(item.id) && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.children.map((child, index) => (
                          <Link key={index} href={child.href}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-left rounded-apple hover:bg-campus-cream text-gray-600"
                            >
                              {child.icon && <child.icon className="w-3 h-3 mr-2" />}
                              {child.label}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.external ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left rounded-apple hover:bg-campus-cream"
                    onClick={() => window.open(item.href, "_blank")}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                ) : item.href?.startsWith("#") ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left rounded-apple hover:bg-campus-cream"
                    onClick={() =>
                      document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: "smooth" })
                    }
                    title={item.tooltip}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                ) : (
                  <Link href={item.href || "#"}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left rounded-apple hover:bg-campus-cream"
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  )
}
