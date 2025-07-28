import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Edit,
  Settings,
  Award,
  Camera,
  Trophy,
  BookOpen,
  Clock,
  Star,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function Profile() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Profile Management Header */}
        <div className="text-center py-6 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            🤵 Your Profile
          </h1>
        </div>
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-white text-teal-600 text-2xl font-bold">
                  RS
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold mb-2">Rohan Sharma</h1>
                <p className="text-teal-100 mb-4">High School Student & Aspiring Coder</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className="bg-white/20 text-white border-white/30">
                    Advanced Learner
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    Quiz Master
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    Course Completer
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="bg-white text-teal-600 hover:bg-teal-50">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Simple Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <CardContent className="p-4">
              <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">6</div>
              <p className="text-sm text-blue-700">Badges Earned</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardContent className="p-4">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">8</div>
              <p className="text-sm text-green-700">Courses Enrolled</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
            <CardContent className="p-4">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">87%</div>
              <p className="text-sm text-purple-700">Average Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-teal-600" />
                  Personal Information
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">rohan.sharma@school.edu</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Started January 2024</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Grade 10, Section A</span>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Profile Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-teal-600" />
                Learning Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Preferred Study Time</label>
                <p className="text-gray-600">Evenings (6 PM - 9 PM)</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Difficulty Level</label>
                <p className="text-gray-600">Beginner to Intermediate</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Current Subjects</span>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Mathematics</Badge>
                  <Badge className="bg-green-100 text-green-800">Science</Badge>
                  <Badge className="bg-purple-100 text-purple-800">English</Badge>
                  <Badge className="bg-orange-100 text-orange-800">History</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Study Reminders</label>
                <p className="text-gray-600">Daily at 6:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-teal-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Completed Math Assignment",
                  description: "Algebra Chapter 5 - Score: 95%",
                  date: "Today",
                  icon: Trophy,
                  color: "text-green-600",
                },
                {
                  title: "Earned Study Badge",
                  description: "Homework Hero - All assignments this week",
                  date: "Yesterday",
                  icon: Star,
                  color: "text-yellow-600",
                },
                {
                  title: "Started New Course",
                  description: "Introduction to Computer Science",
                  date: "3 days ago",
                  icon: BookOpen,
                  color: "text-blue-600",
                },
                {
                  title: "Study Session",
                  description: "2.5 hours focused study time",
                  date: "1 week ago",
                  icon: Clock,
                  color: "text-purple-600",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`mt-1 ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
