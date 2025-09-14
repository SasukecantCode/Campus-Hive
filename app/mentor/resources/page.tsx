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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, FileText, Download, Plus, Calendar, Users } from "lucide-react"

export default function MentorResourcesPage() {
  const [uploadedResources] = useState([
    {
      id: 1,
      title: "Network Security Fundamentals",
      subject: "Cybersecurity",
      type: "Lecture Notes",
      uploadDate: "2024-01-10",
      downloads: 42,
      fileSize: "2.5 MB",
      format: "PDF",
    },
    {
      id: 2,
      title: "OOP Concepts in Java",
      subject: "Java Programming",
      type: "Lecture Slides",
      uploadDate: "2024-01-08",
      downloads: 38,
      fileSize: "1.8 MB",
      format: "PPTX",
    },
    {
      id: 3,
      title: "Data Structures Assignment",
      subject: "Python",
      type: "Assignment",
      uploadDate: "2024-01-05",
      downloads: 35,
      fileSize: "0.5 MB",
      format: "PDF",
    },
  ])

  const [newResource, setNewResource] = useState({
    title: "",
    subject: "",
    type: "",
    description: "",
    file: null as File | null,
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false)
  const [announcement, setAnnouncement] = useState({
    class: "",
    message: "",
  })

  const subjects = [
    { id: "cybersecurity", name: "Cybersecurity" },
    { id: "java", name: "Java Programming" },
    { id: "python", name: "Python" },
    { id: "cad", name: "CAD" },
  ]

  const resourceTypes = [
    { id: "lecture-notes", name: "Lecture Notes" },
    { id: "lecture-slides", name: "Lecture Slides" },
    { id: "assignment", name: "Assignment" },
    { id: "reference-material", name: "Reference Material" },
    { id: "lab-manual", name: "Lab Manual" },
  ]

  const classes = [
    { id: "cs2021", name: "CS 2021 Batch" },
    { id: "cs2022", name: "CS 2022 Batch" },
    { id: "cs2023", name: "CS 2023 Batch" },
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewResource({ ...newResource, file })
    }
  }

  const handleSubmitResource = () => {
    console.log("Uploading resource:", newResource)
    setIsDialogOpen(false)
    setNewResource({
      title: "",
      subject: "",
      type: "",
      description: "",
      file: null,
    })
  }

  const handleSubmitAnnouncement = () => {
    console.log("Sending announcement:", announcement)
    setIsAnnouncementDialogOpen(false)
    setAnnouncement({
      class: "",
      message: "",
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lecture Notes":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Lecture Slides":
        return "bg-green-100 text-green-800 border-green-200"
      case "Assignment":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="mentor" />

      <div className="flex">
        <Sidebar userType="mentor" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Resource Management</h1>
                <p className="text-gray-600">Upload and manage study materials for your students.</p>
              </div>

              <div className="flex gap-3">
                <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-apple border-campus-green-dark text-campus-green-dark hover:bg-campus-green-dark hover:text-white bg-transparent"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Send Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-apple max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-campus-green-dark">Send Announcement</DialogTitle>
                      <DialogDescription>Share important notices with your students.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="announcementClass">Select Class</Label>
                        <Select
                          value={announcement.class}
                          onValueChange={(value) => setAnnouncement({ ...announcement, class: value })}
                        >
                          <SelectTrigger className="rounded-apple">
                            <SelectValue placeholder="Choose a class" />
                          </SelectTrigger>
                          <SelectContent className="rounded-apple">
                            {classes.map((cls) => (
                              <SelectItem key={cls.id} value={cls.id}>
                                {cls.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Announcement Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Type your announcement here..."
                          value={announcement.message}
                          onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                          className="rounded-apple"
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSubmitAnnouncement}
                          className="flex-1 bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                          disabled={!announcement.class || !announcement.message}
                        >
                          Send Announcement
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsAnnouncementDialogOpen(false)}
                          className="flex-1 rounded-apple"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Resource
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-apple max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-campus-green-dark">Upload New Resource</DialogTitle>
                      <DialogDescription>Share study materials with your students.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Resource Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Network Security Fundamentals"
                          value={newResource.title}
                          onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                          className="rounded-apple"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Select
                          value={newResource.subject}
                          onValueChange={(value) => setNewResource({ ...newResource, subject: value })}
                        >
                          <SelectTrigger className="rounded-apple">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent className="rounded-apple">
                            {subjects.map((subject) => (
                              <SelectItem key={subject.id} value={subject.id}>
                                {subject.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="type">Resource Type</Label>
                        <Select
                          value={newResource.type}
                          onValueChange={(value) => setNewResource({ ...newResource, type: value })}
                        >
                          <SelectTrigger className="rounded-apple">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-apple">
                            {resourceTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description of the resource..."
                          value={newResource.description}
                          onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                          className="rounded-apple"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="file">Upload File</Label>
                        <div className="mt-2">
                          <Input
                            id="file"
                            type="file"
                            accept=".pdf,.ppt,.pptx,.doc,.docx"
                            onChange={handleFileUpload}
                            className="rounded-apple"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Supported formats: PDF, PPT, PPTX, DOC, DOCX (Max 10MB)
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSubmitResource}
                          className="flex-1 bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                          disabled={
                            !newResource.title || !newResource.subject || !newResource.type || !newResource.file
                          }
                        >
                          Upload Resource
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
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Resource Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Resources</p>
                      <p className="text-2xl font-bold text-campus-green-dark">{uploadedResources.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {uploadedResources.reduce((acc, resource) => acc + resource.downloads, 0)}
                      </p>
                    </div>
                    <Download className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-green-600">2</p>
                    </div>
                    <Calendar className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Downloads</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {Math.round(
                          uploadedResources.reduce((acc, resource) => acc + resource.downloads, 0) /
                            uploadedResources.length,
                        )}
                      </p>
                    </div>
                    <Upload className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Uploaded Resources */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Uploaded Resources</CardTitle>
                <CardDescription>Manage your study materials and track student engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedResources.map((resource) => (
                    <div key={resource.id} className="p-4 bg-campus-cream rounded-apple border border-campus-beige">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-campus-green-dark">{resource.title}</h3>
                            <Badge className={`rounded-apple ${getTypeColor(resource.type)}`}>{resource.type}</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p>
                                <strong>Subject:</strong> {resource.subject}
                              </p>
                              <p>
                                <strong>Upload Date:</strong> {resource.uploadDate}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Downloads:</strong> {resource.downloads}
                              </p>
                              <p>
                                <strong>File Size:</strong> {resource.fileSize} ({resource.format})
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" className="rounded-apple bg-transparent">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-apple text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                          >
                            Delete
                          </Button>
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
