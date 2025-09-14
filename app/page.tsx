"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [userType, setUserType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [destination, setDestination] = useState("")
  const [isSignupMode, setIsSignupMode] = useState(false)
  const [signupSubmitted, setSignupSubmitted] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    if (userType && email) {
      // Redirect based on user type
      switch (userType) {
        case "student":
          router.push("/student")
          break
        case "mentor":
          router.push("/mentor")
          break
        case "warden":
          router.push("/warden")
          break
        case "food-manager":
          router.push("/food-manager")
          break
        default:
          break
      }
    }
  }

  const handleSignup = () => {
    if (name && email && destination) {
      setSignupSubmitted(true)
    }
  }

  const handleLogoClick = () => {
    router.push("/about")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/chanakya-university.jpg"
          alt="Chanakya University"
          fill
          className="object-cover"
          style={{ filter: "blur(4px)" }}
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20 cursor-pointer" onClick={handleLogoClick}>
        <Image
          src="/images/campus-hive-logo.png"
          alt="Campus Hive Logo"
          width={80}
          height={80}
          className="rounded-apple"
        />
      </div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-apple-lg shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-campus-green-dark">Welcome to Campus Hive</CardTitle>
            <CardDescription className="text-gray-600">Your centralized campus management solution</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isSignupMode ? "signup" : "login"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-campus-cream rounded-apple">
                <TabsTrigger
                  value="login"
                  onClick={() => setIsSignupMode(false)}
                  className="rounded-apple data-[state=active]:bg-campus-green-dark data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  onClick={() => setIsSignupMode(true)}
                  className="rounded-apple data-[state=active]:bg-campus-green-dark data-[state=active]:text-white"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userType">I am a</Label>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger className="rounded-apple border-campus-green-light focus:ring-campus-green-dark">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="rounded-apple">
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                      <SelectItem value="warden">Warden</SelectItem>
                      <SelectItem value="food-manager">Food Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-apple border-campus-green-light focus:ring-campus-green-dark"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-apple border-campus-green-light focus:ring-campus-green-dark"
                  />
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full bg-campus-green-dark hover:bg-campus-green-light text-white rounded-apple font-medium"
                  disabled={!userType || !email || !password}
                >
                  Login to Campus Hive
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                {!signupSubmitted ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="signupUserType">I am a</Label>
                      <Select value={userType} onValueChange={setUserType}>
                        <SelectTrigger className="rounded-apple border-campus-green-light focus:ring-campus-green-dark">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent className="rounded-apple">
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="mentor">Mentor</SelectItem>
                          <SelectItem value="warden">Warden</SelectItem>
                          <SelectItem value="food-manager">Food Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupName">Full Name</Label>
                      <Input
                        id="signupName"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-apple border-campus-green-light focus:ring-campus-green-dark"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Work Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your.email@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-apple border-campus-green-light focus:ring-campus-green-dark"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination">Department/Destination</Label>
                      <Input
                        id="destination"
                        type="text"
                        placeholder="e.g., Computer Science, Administration"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="rounded-apple border-campus-green-light focus:ring-campus-green-dark"
                      />
                    </div>

                    <Button
                      onClick={handleSignup}
                      className="w-full bg-campus-green-dark hover:bg-campus-green-light text-white rounded-apple font-medium"
                      disabled={!userType || !email || !name || !destination}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-campus-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-campus-green-dark mb-2">Request Submitted!</h3>
                    <p className="text-gray-600 mb-4">
                      Your signup request is under review. You will receive an email confirmation once approved.
                    </p>
                    <Button
                      onClick={() => {
                        setSignupSubmitted(false)
                        setIsSignupMode(false)
                        setName("")
                        setEmail("")
                        setDestination("")
                        setUserType("")
                      }}
                      variant="outline"
                      className="rounded-apple border-campus-green-dark text-campus-green-dark hover:bg-campus-green-dark hover:text-white"
                    >
                      Back to Login
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
