import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/student/components/ui/card";
import { Badge } from "@/student/components/ui/badge";
import { Avatar, AvatarFallback } from "@/student/components/ui/avatar";
import { User, Mail, Calendar, Award, Edit } from "lucide-react";
import DashboardLayout from "@/student/components/DashboardLayout";
import { useApi } from "@/api/index";
import { useToast } from "@/student/hooks/use-toast";
import dayjs from "dayjs";
import { Button } from "../components/ui/button";

const iconMap = {
  Award,
  User,
};

export default function Profile() {
  const api = useApi();
  const { toasts } = useToast();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/profile");
        setProfile(res.data.user);
        setRecentActivity(res.data.recentActivity || []);
        toast.success({ title: "Profile loaded" });
      } catch (e) {
        console.error("Failed to fetch profile:", e);
        toast.error({
          title: "Error",
          description: "Failed to load profile",
        });
      }
    })();
  }, [api, toast]);

  const initials = profile?.name
    ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "ST";

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center py-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            🤵 Your Profile
          </h1>
        </div>

        {/* Header */}
        <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
          <CardContent className="p-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-white text-teal-600 text-4xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold">{profile?.name || "Student"}</h2>
              <p className="text-teal-100 mb-4">
                {profile?.role === "STUDENT" ? "Student" : profile?.role || ""}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-white/20 text-white">Course Completer</Badge>
                {profile?.avgQuizScore > 80 && (
                  <Badge className="bg-white/20 text-white">Quiz Master</Badge>
                )}
              </div>
            </div>
            <Button variant="outline" className="text-teal-600 border-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center bg-blue-50">
            <CardContent>
              <Award className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <div className="text-2xl font-bold">{0}</div>
              <div className="text-sm">Badges Earned</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-green-50">
            <CardContent>
              <Calendar className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <div className="text-2xl font-bold">{profile?.enrolledCourses || 0}</div>
              <div className="text-sm">Courses Enrolled</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-purple-50">
            <CardContent>
              <User className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <div className="text-2xl font-bold">
                {profile?.avgQuizScore ? `${Math.round(profile.avgQuizScore)}%` : "N/A"}
              </div>
              <div className="text-sm">Average Quiz Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="text-teal-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" />
              <span>{profile?.email || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-500" />
              <span>
                Joined {profile?.createdAt ? dayjs(profile.createdAt).format("MMM YYYY") : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-teal-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-center py-5 text-gray-500">No recent activity found.</p>
            ) : (
              <ul className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <li key={i} className="flex items-start gap-3 bg-gray-50 rounded p-3">
                    {(() => {
                      const Icon = iconMap[activity.icon] || Award;
                      return <Icon className={`mt-1 ${activity.color || "text-teal-500"}`} />;
                    })()}
                    <div>
                      <p className="font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-gray-700">{activity.description}</p>
                      <p className="text-xs text-gray-400">{activity.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
