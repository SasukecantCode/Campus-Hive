"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Campus Hive Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const predefinedResponses: { [key: string]: string } = {
    hello: "Hello! Welcome to Campus Hive. How can I assist you today?",
    hi: "Hi there! I'm here to help you with any campus-related queries.",
    "hostel timings": "Hostel entry timings are from 6:00 AM to 10:00 PM. Late entry requires warden permission.",
    "food court timings": "Food court is open from 7:00 AM to 10:00 PM daily.",
    "library timings": "Library is open from 8:00 AM to 10:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends.",
    "attendance requirement": "Minimum 75% attendance is required in each subject to be eligible for examinations.",
    "leave application":
      "You can apply for leave through the hostel section in your dashboard. Approval is required from the warden.",
    "assignment submission": "Assignments can be submitted through the academics section. Check due dates regularly.",
    "meal booking": "Day scholars can pre-book meals through the cafeteria section in their dashboard.",
    grievance: "You can submit grievances through the grievances section. All complaints are reviewed within 48 hours.",
    "campus map": "You can find the interactive campus map in the Campus Navigator section.",
    "emergency contact": "For emergencies, contact the security office at +91 9876543210 or the warden on duty.",
    "wifi password": "WiFi credentials are available at the IT help desk in the central building.",
    "exam schedule": "Examination schedules are posted in the academics section and on notice boards.",
    "sports facilities": "Campus has football field, cricket ground, basketball court, and indoor games facilities.",
    default:
      "I'm sorry, I didn't understand that. You can ask me about hostel timings, food court, library, attendance, leave applications, assignments, meal booking, grievances, campus map, or emergency contacts.",
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Generate bot response
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase()
      let response = predefinedResponses.default

      // Check for keywords in the input
      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key)) {
          response = value
          break
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-campus-green-dark hover:bg-campus-green-light shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-2xl z-50 rounded-apple border-0">
      <CardHeader className="bg-campus-green-dark text-white rounded-t-apple p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>Campus Hive Assistant</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-campus-green-light rounded-apple"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-80">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs p-3 rounded-apple ${
                  message.sender === "user" ? "bg-campus-green-dark text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  {message.sender === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 rounded-apple"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
              disabled={!inputMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
