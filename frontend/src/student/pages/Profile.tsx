import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/student/components/ui/card";
import { Button } from "@/student/components/ui/button";
import { Badge } from "@/student/components/ui/badge";
import { Avatar, AvatarFallback } from "@/student/components/ui/avatar";
import { User, Mail, Calendar, Award, Clock, Trophy, UserPlus, Building, GraduationCap, KeyRound } from "lucide-react";
import DashboardLayout from "@/student/components/DashboardLayout";
import { useApi } from "@/api/index";
import { useToast } from "@/student/hooks/use-toast";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const iconMap = {
  Award,
  User,
  Clock,
  Trophy,
  UserPlus,
};

export default function Profile() {
  const api = useApi();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/profile");
        setProfile(res.data.user);
        setRecentActivity(res.data.recentActivity || []);
        toast({
          title: "Profile loaded",
          description: "Your profile information has been loaded successfully.",
        });
      } catch (e) {
        console.error("Failed to fetch profile:", e);
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      }
    })();
  }, [api, toast]);

  const initials = profile?.name
    ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "ST";

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center py-4 sm:py-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            👤 Your Profile
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">View your personal information and learning progress</p>
        </div>

        {/* Profile Header Card */}
        <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-white text-teal-600 text-2xl sm:text-4xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold">{profile?.name || "Student"}</h2>
                <p className="text-teal-100 mb-2">
                  {profile?.role === "STUDENT" ? "Student" : profile?.role || ""}
                </p>
                {profile?.organizationUnit && (
                  <p className="text-teal-200 text-sm mb-4">
                    {profile.organizationUnit.name} • {profile?.grade?.value || 'N/A'}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {profile?.enrolledCourses > 0 && (
                    <Badge className="bg-white/20 text-white text-xs sm:text-sm">Course Completer</Badge>
                  )}
                  {profile?.avgQuizScore > 80 && (
                    <Badge className="bg-white/20 text-white text-xs sm:text-sm">Quiz Master</Badge>
                  )}
                  {profile?.avgQuizScore > 95 && (
                    <Badge className="bg-white/20 text-white text-xs sm:text-sm">Top Performer</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <User className="h-5 w-5 text-teal-600" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Your account details and academic information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-700">Email Address</p>
                  <p className="text-gray-900 text-sm sm:text-base truncate">{profile?.email || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Member Since</p>
                  <p className="text-gray-900 text-sm sm:text-base">
                    {profile?.createdAt ? dayjs(profile.createdAt).format("MMMM DD, YYYY") : "N/A"}
                  </p>
                </div>
              </div>

              {profile?.organizationUnit && (
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <Building className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">School</p>
                    <p className="text-gray-900 text-sm sm:text-base">{profile.organizationUnit.name}</p>
                  </div>
                </div>
              )}

              {profile?.grade && (
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Grade</p>
                    <p className="text-gray-900 text-sm sm:text-base">{profile.grade.value}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="border-t pt-6">
            <Button asChild variant="outline">
              <Link to="/change-password">
                <KeyRound className="h-4 w-4 mr-2" />
                Change Password
              </Link>
            </Button>
          </CardFooter>

        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Award className="h-5 w-5 text-teal-600" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Your latest learning progress and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Award className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium text-sm sm:text-base">No recent activity found</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">Start learning to see your progress here!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity, i) => {
                  const Icon = iconMap[activity.icon] || Award;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="p-2 rounded-full bg-white shadow-sm flex-shrink-0">
                        <Icon className={`h-4 w-4 ${activity.color || "text-teal-500"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{activity.title}</p>
                        <p className="text-gray-700 text-xs sm:text-sm mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{activity.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
