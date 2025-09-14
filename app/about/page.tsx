import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-campus-cream">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-campus-green-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/campus-hive-logo.png"
                alt="Campus Hive Logo"
                width={50}
                height={50}
                className="rounded-apple"
              />
              <span className="text-xl font-bold text-campus-green-dark">Campus Hive</span>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="rounded-apple border-campus-green-dark text-campus-green-dark hover:bg-campus-green-dark hover:text-white bg-transparent"
              >
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-campus-green-dark to-campus-green-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Campus Hive</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            An AI-powered centralized digital solution designed to simplify and modernize every aspect of campus life
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white rounded-apple-lg shadow-lg border-0 mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-campus-green-dark mb-6 text-center">Welcome to Campus Hive</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Welcome to <strong className="text-campus-green-dark">Campus Hive</strong>, an AI-powered centralized
                  digital solution designed to simplify and modernize every aspect of campus life. Our mission is to
                  bring together all the essential services of a university into one integrated platform—making life
                  easier for students, mentors, wardens, and food service managers.
                </p>

                <p className="text-gray-700 leading-relaxed mb-8">
                  University campuses are vibrant, dynamic spaces—but they also come with challenges. From managing
                  hostel entries and attendance to organizing food services and keeping academic resources accessible,
                  there are countless moving parts that often function separately. We believe these services should not
                  be fragmented. Instead, they should work together seamlessly under one digital umbrella. That's
                  exactly what our platform offers.
                </p>

                <div className="border-t border-campus-beige pt-8 mb-8">
                  <h3 className="text-2xl font-bold text-campus-green-dark mb-6">What We Do</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our solution is built to be a single-stop hub for all campus needs. It combines the power of AI and
                    smart design to streamline operations, reduce paperwork, and enhance the overall student and staff
                    experience.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-8">Here's how it works for different users:</p>
                </div>

                {/* User Roles */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-campus-cream rounded-apple border-campus-green-light">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-campus-green-dark mb-4 flex items-center">
                        <span className="mr-2">👩‍🎓</span> Students
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          <strong>Access to Learning Resources:</strong> Download lecture notes, assignments, and study
                          materials anytime, anywhere.
                        </li>
                        <li>
                          <strong>Upload Resources:</strong> Share academic work, projects, and resources with peers.
                        </li>
                        <li>
                          <strong>Hostel Management:</strong> Seamlessly apply for leave, check attendance, and manage
                          hostel entry/exit digitally.
                        </li>
                        <li>
                          <strong>Food Services:</strong> Pre-book meals at the campus food court or cancel hostel meals
                          in advance to reduce food wastage.
                        </li>
                        <li>
                          <strong>Grievance System:</strong> Raise issues, track complaints, and get timely responses.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-campus-cream rounded-apple border-campus-green-light">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-campus-green-dark mb-4 flex items-center">
                        <span className="mr-2">👨‍🏫</span> Mentors
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          <strong>Attendance Management:</strong> Take attendance digitally with a simple and reliable
                          system.
                        </li>
                        <li>
                          <strong>Resource Uploads:</strong> Share lecture slides, assignments, and important updates
                          directly with students.
                        </li>
                        <li>
                          <strong>Student Interaction:</strong> Provide guidance, feedback, and communication through a
                          unified portal.
                        </li>
                        <li>
                          <strong>Academic Oversight:</strong> Monitor student participation and performance with ease.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-campus-cream rounded-apple border-campus-green-light">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-campus-green-dark mb-4 flex items-center">
                        <span className="mr-2">🏫</span> Wardens
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          <strong>Hostel Attendance:</strong> Record and track hostel attendance in real time.
                        </li>
                        <li>
                          <strong>Entry & Exit Tracking:</strong> Monitor hostel in/out logs for safety and discipline.
                        </li>
                        <li>
                          <strong>Leave Manager:</strong> Approve or reject hostel leave requests instantly.
                        </li>
                        <li>
                          <strong>Communication:</strong> Address hostel-related grievances raised by students.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-campus-cream rounded-apple border-campus-green-light">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-campus-green-dark mb-4 flex items-center">
                        <span className="mr-2">🍴</span> Food Managers
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          <strong>Menu Manager:</strong> Create and update food menus for the hostel and food court.
                        </li>
                        <li>
                          <strong>Pre-booking System:</strong> Allow day scholars to pre-book meals and manage demand
                          better.
                        </li>
                        <li>
                          <strong>Pre-cancellation System:</strong> Enable hostelers to cancel meals in advance,
                          reducing food waste.
                        </li>
                        <li>
                          <strong>Feedback System:</strong> Collect and respond to student feedback to improve services.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="border-t border-campus-beige pt-8 mb-8">
                  <h3 className="text-2xl font-bold text-campus-green-dark mb-6">Why Choose Us?</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-campus-green-dark mr-2">•</span>
                      <strong>Centralized Platform:</strong> All university services in one place.
                    </li>
                    <li className="flex items-start">
                      <span className="text-campus-green-dark mr-2">•</span>
                      <strong>AI-Powered Efficiency:</strong> Smarter decision-making and automation for faster results.
                    </li>
                    <li className="flex items-start">
                      <span className="text-campus-green-dark mr-2">•</span>
                      <strong>User-Friendly:</strong> Designed for everyone—students, mentors, wardens, and food
                      managers.
                    </li>
                    <li className="flex items-start">
                      <span className="text-campus-green-dark mr-2">•</span>
                      <strong>Transparency & Accountability:</strong> Every action is tracked, recorded, and easy to
                      verify.
                    </li>
                    <li className="flex items-start">
                      <span className="text-campus-green-dark mr-2">•</span>
                      <strong>Sustainability:</strong> Pre-booking and pre-cancellation features help reduce food waste
                      and resource mismanagement.
                    </li>
                  </ul>
                </div>

                <div className="border-t border-campus-beige pt-8 mb-8">
                  <h3 className="text-2xl font-bold text-campus-green-dark mb-6">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We aim to transform university campuses into digitally empowered ecosystems where academic,
                    residential, and administrative services are interconnected. By bringing students, mentors, wardens,
                    and food managers onto a single platform, we are creating a smarter, safer, and more collaborative
                    campus environment.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-8">
                    At <strong className="text-campus-green-dark">Campus Hive</strong>, we are not just building a
                    tool—we are building the future of campus life.
                  </p>
                </div>

                <div className="text-center bg-campus-green-dark text-white p-8 rounded-apple-lg">
                  <h3 className="text-2xl font-bold mb-4">
                    Together, let's make campus life simpler, smarter, and more connected.
                  </h3>
                  <Link href="/">
                    <Button className="bg-white text-campus-green-dark hover:bg-campus-cream rounded-apple font-medium">
                      Get Started with Campus Hive
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
