import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/student/components/ui/card";
import { Button } from "@/student/components/ui/button";
import { Badge } from "@/student/components/ui/badge";
import { Avatar, AvatarFallback } from "@/student/components/ui/avatar";
import {
  User,
  Mail,
  Calendar,
  Edit,
  Settings,
  Award,
  Camera,
  Trophy,
  BookOpen,
  Star,
  Clock,
  Trophy as TrophyIcon,
  UserPlus,
} from "lucide-react";
import DashboardLayout from "@/student/components/DashboardLayout";
import { useAuth } from '@/shared/context/AuthContext';
import { useApi } from '@/api/index';
import dayjs from "dayjs";

// Map icon names from backend to lucide-react components
const iconMap = {
  Trophy: TrophyIcon,
  Clock: Clock,
  UserPlus: UserPlus,
  Star: Star,
  BookOpen: BookOpen,
};

export default function Profile() {
  const api = useApi();
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
    try {
      const res = await api.get("/users/profile");
      setProfile(res.data.user);
      setRecentActivity(res.data.recentActivity || []);
      // no setUser here
    } catch (e) {
      console.error("Failed to fetch profile:", e);
    }
  })();
}, [api]);

  const initials = profile?.name
    ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "ST";

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center py-6 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            🤵 Your Profile
          </h1>
        </div>

        {/* Header */}
        <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
          <CardContent className="p-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-white text-teal-600 text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{profile?.name}</h1>
              <p className="text-teal-100 mb-4">
                {profile?.role === "STUDENT" ? "Student" : profile?.role}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-white/20 text-white">Course Completer</Badge>
                {profile?.avgQuizScore > 80 && (
                  <Badge className="bg-white/20 text-white">Quiz Master</Badge>
                )}
              </div>
            </div>
            <Button variant="outline" className="bg-white text-teal-600">
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="p-4">
              <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{/* No badges in DB yet */}0</div>
              <p className="text-sm">Badges Earned</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-4">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile?.enrolledCourses || 0}</div>
              <p className="text-sm">Courses Enrolled</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-100">
            <CardContent className="p-4">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {profile?.avgQuizScore ? `${profile.avgQuizScore}%` : "N/A"}
              </div>
              <p className="text-sm">Average Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-teal-600" />
                  Personal Information
                </span>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{profile?.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>
                  Joined{" "}
                  {profile?.createdAt
                    ? dayjs(profile.createdAt).format("MMM YYYY")
                    : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences - keep static as before */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-teal-600" />
                Learning Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Preferred Study Time
                </label>
                <p className="text-gray-600">Evenings (6 PM - 9 PM)</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Difficulty Level
                </label>
                <p className="text-gray-600">Beginner to Intermediate</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">
                  Current Subjects
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Mathematics</Badge>
                  <Badge className="bg-green-100 text-green-800">Science</Badge>
                  <Badge className="bg-purple-100 text-purple-800">English</Badge>
                  <Badge className="bg-orange-100 text-orange-800">History</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Study Reminders
                </label>
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
              {recentActivity.length === 0 ? (
                <p className="text-gray-600 text-center">No recent activity found.</p>
              ) : (
                recentActivity.map((activity, index) => {
                  const ActivityIcon = iconMap[activity.icon] || TrophyIcon;
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className={`mt-1 ${activity.color}`}>
                        <ActivityIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
