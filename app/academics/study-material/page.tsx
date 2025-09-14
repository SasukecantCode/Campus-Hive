"use client"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Search, Filter, Calendar } from "lucide-react"

export default function StudyMaterialPage() {
  const [userType] = useState<"student" | "mentor" | "warden" | "food-manager">("student")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSubject, setFilterSubject] = useState("all")

  const studyMaterials = [
    {
      id: 1,
      title: "Java Programming - Complete Notes",
      subject: "Java Programming",
      type: "Notes",
      faculty: "Dr. Priya Sharma",
      uploadDate: "2024-03-01",
      fileSize: "2.5 MB",
      downloads: 145,
      description: "Comprehensive Java programming notes covering OOP concepts, inheritance, and polymorphism",
    },
    {
      id: 2,
      title: "Python Basics to Advanced",
      subject: "Python",
      type: "Tutorial",
      faculty: "Prof. Rajesh Kumar",
      uploadDate: "2024-02-28",
      fileSize: "4.2 MB",
      downloads: 198,
      description: "Complete Python tutorial from basics to advanced topics including data structures and algorithms",
    },
    {
      id: 3,
      title: "Computer Organization & Architecture",
      subject: "COA",
      type: "Notes",
      faculty: "Dr. Meera Patel",
      uploadDate: "2024-03-05",
      fileSize: "3.8 MB",
      downloads: 87,
      description: "Detailed notes on computer architecture, memory organization, and instruction sets",
    },
    {
      id: 4,
      title: "Life Skills - Communication",
      subject: "Life Skills",
      type: "Presentation",
      faculty: "Ms. Sneha Gupta",
      uploadDate: "2024-03-03",
      fileSize: "1.9 MB",
      downloads: 76,
      description: "Presentation slides on effective communication skills and personality development",
    },
    {
      id: 5,
      title: "Database Systems - SQL Queries",
      subject: "Database Systems",
      type: "Practice",
      faculty: "Prof. Kiran Nair",
      uploadDate: "2024-03-07",
      fileSize: "1.2 MB",
      downloads: 123,
      description: "Collection of SQL practice queries with solutions for database management",
    },
    {
      id: 6,
      title: "Data Structures - Algorithms",
      subject: "Data Structures",
      type: "Notes",
      faculty: "Dr. Arjun Reddy",
      uploadDate: "2024-03-04",
      fileSize: "5.1 MB",
      downloads: 167,
      description: "Comprehensive guide to data structures and algorithms with implementation examples",
    },
    {
      id: 7,
      title: "Software Engineering - SDLC",
      subject: "Software Engineering",
      type: "Notes",
      faculty: "Dr. Rahul Joshi",
      uploadDate: "2024-03-06",
      fileSize: "2.8 MB",
      downloads: 92,
      description: "Software Development Life Cycle methodologies and project management techniques",
    },
    {
      id: 8,
      title: "Java Lab Manual",
      subject: "Java Programming",
      type: "Lab Manual",
      faculty: "Dr. Priya Sharma",
      uploadDate: "2024-03-02",
      fileSize: "3.4 MB",
      downloads: 134,
      description: "Complete lab manual with Java programming exercises and solutions",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Notes":
        return "bg-blue-500 text-white"
      case "Tutorial":
        return "bg-green-500 text-white"
      case "Presentation":
        return "bg-purple-500 text-white"
      case "Practice":
        return "bg-orange-500 text-white"
      case "Lab Manual":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const filteredMaterials = studyMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.faculty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterSubject === "all" || material.subject === filterSubject
    return matchesSearch && matchesFilter
  })

  const handleDownload = (material: any) => {
    // Create a dummy PDF blob for demonstration
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(${material.title}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`

    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${material.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <Navigation userType={userType} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Study Materials</h1>
          <p className="text-gray-600">Access course materials, notes, and resources</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-apple"
              />
            </div>
          </div>
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-full sm:w-48 rounded-apple">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="Java Programming">Java Programming</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="COA">COA</SelectItem>
              <SelectItem value="Life Skills">Life Skills</SelectItem>
              <SelectItem value="Database Systems">Database Systems</SelectItem>
              <SelectItem value="Data Structures">Data Structures</SelectItem>
              <SelectItem value="Software Engineering">Software Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Materials Grid */}
        <div className="grid gap-6">
          {filteredMaterials.map((material) => (
            <Card
              key={material.id}
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-apple shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-apple ${isDarkMode ? "bg-gray-700" : "bg-campus-cream"}`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold mb-1">{material.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{material.subject}</Badge>
                        <Badge className={getTypeColor(material.type)}>{material.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload(material)}
                    className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>{material.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Faculty:</span>
                    <br />
                    {material.faculty}
                  </div>
                  <div>
                    <span className="font-medium">File Size:</span>
                    <br />
                    {material.fileSize}
                  </div>
                  <div>
                    <span className="font-medium">Downloads:</span>
                    <br />
                    {material.downloads}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No materials found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
