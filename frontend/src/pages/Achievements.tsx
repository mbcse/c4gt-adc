import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  Flame,
  Zap,
  Crown,
  Medal,
  Target,
  Clock,
  BookOpen,
  Brain,
  Award,
  Lock,
  CheckCircle,
  Calendar,
  TrendingUp,
  Users,
  Sparkles,
  Info,
  Gift,
  Shield,
  Rocket,
  Heart,
  Coffee,
  Lightbulb,
  Timer,
  BarChart2,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/DashboardLayout";

export default function Achievements() {
  const [activeTab, setActiveTab] = useState<"earned" | "locked">("earned");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

const earnedBadges = [
  {
    id: 1,
    title: "Fast Tracker",
    description: "Finish 15 lessons in one week",
    icon: Zap,
    bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
    category: "Momentum",
    earnedDate: "2024-02-15",
    level: "Bronze",
    points: 50,
  },
  {
    id: 2,
    title: "Quiz Whiz",
    description: "Score 100% on 8 quizzes",
    icon: Star,
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
    category: "Excellence",
    earnedDate: "2024-02-10",
    level: "Silver",
    points: 100,
  },
  {
    id: 3,
    title: "Streak Champ",
    description: "Score 90%+ on 5 quizzes in a row",
    icon: Trophy,
    bgColor: "bg-gradient-to-r from-orange-500 to-amber-500",
    category: "Consistency",
    earnedDate: "2024-02-08",
    level: "Bronze",
    points: 75,
  },
  {
    id: 4,
    title: "First Finisher",
    description: "Complete your first course",
    icon: Trophy,
    bgColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
    category: "Milestone",
    earnedDate: "2024-01-20",
    level: "Gold",
    points: 200,
  },
  {
    id: 5,
    title: "Curious Explorer",
    description: "Join 5 different courses",
    icon: BookOpen,
    bgColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
    category: "Exploration",
    earnedDate: "2024-01-15",
    level: "Silver",
    points: 150,
  },
  {
    id: 6,
    title: "Quick Sprint",
    description: "Finish a lesson in under 10 minutes",
    icon: Rocket,
    bgColor: "bg-gradient-to-r from-pink-500 to-rose-500",
    category: "Speed",
    earnedDate: "2024-01-12",
    level: "Bronze",
    points: 25,
  },
];

 const lockedBadges = [
  {
    id: 7,
    title: "Pro Learner",
    description: "Finish 3 courses with 95%+ average",
    icon: Crown,
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    category: "Mastery",
    level: "Platinum",
    points: 500,
    progress: 1,
    target: 3,
    tips: [
      "Revisit tough topics before quizzes",
      "Use flashcards or mind maps",
      "Keep a consistent study schedule",
    ],
  },
  {
    id: 8,
    title: "Quick Solver",
    description: "Complete challenges in record time",
    icon: Timer,
    bgColor: "bg-gradient-to-r from-yellow-500 to-amber-600",
    category: "Efficiency",
    level: "Silver",
    points: 100,
    progress: 3,
    target: 10,
    tips: [
      "Practice time-bound exercises",
      "Use keyboard shortcuts",
      "Stay calm and focused under pressure",
    ],
  },
  {
    id: 9,
    title: "Consistent Climber",
    description: "Maintain a 10-day learning streak",
    icon: BarChart2,
    bgColor: "bg-gradient-to-r from-sky-500 to-blue-600",
    category: "Consistency",
    level: "Bronze",
    points: 75,
    progress: 5,
    target: 10,
    tips: [
      "Set daily reminders to study",
      "Keep lessons short but regular",
      "Don’t break the chain!",
    ],
  },
  {
    id: 10,
    title: "Future Techie",
    description: "Finish an advanced AI or ML course",
    icon: Lightbulb,
    bgColor: "bg-gradient-to-r from-cyan-500 to-blue-600",
    category: "Innovation",
    level: "Gold",
    points: 300,
    progress: 0,
    target: 1,
    tips: [
      "Start with beginner ML content first",
      "Experiment with small projects",
      "Ask peers for help with concepts",
    ],
  },
  {
    id: 11,
    title: "Code Explorer",
    description: "Try 3 new coding languages or modules",
    icon: Compass,
    bgColor: "bg-gradient-to-r from-fuchsia-500 to-purple-600",
    category: "Exploration",
    level: "Gold",
    points: 250,
    progress: 0,
    target: 3,
    tips: [
      "Explore different programming paradigms",
      "Experiment with small scripts",
      "Compare syntax and use cases",
    ],
  },
  {
    id: 12,
    title: "Cyber Ninja",
    description: "Master the basics of cybersecurity",
    icon: Shield,
    bgColor: "bg-gradient-to-r from-red-600 to-orange-600",
    category: "Security",
    level: "Platinum",
    points: 400,
    progress: 0,
    target: 1,
    tips: [
      "Focus on hands-on practice",
      "Try ethical hacking exercises",
      "Learn how to protect your own data",
    ],
  },
];


  const getLevelColor = (level: string) => {
    switch (level) {
      case "Bronze":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Silver":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Gold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Platinum":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Learning":
        return "bg-blue-100 text-blue-800";
      case "Excellence":
        return "bg-green-100 text-green-800";
      case "Consistency":
        return "bg-orange-100 text-orange-800";
      case "Milestone":
        return "bg-yellow-100 text-yellow-800";
      case "Exploration":
        return "bg-purple-100 text-purple-800";
      case "Efficiency":
        return "bg-pink-100 text-pink-800";
      case "Mastery":
        return "bg-indigo-100 text-indigo-800";
      case "Dedication":
        return "bg-gray-100 text-gray-800";
      case "Community":
        return "bg-emerald-100 text-emerald-800";
      case "Innovation":
        return "bg-cyan-100 text-cyan-800";
      case "Leadership":
        return "bg-rose-100 text-rose-800";
      case "Security":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalEarnedPoints = earnedBadges.reduce((sum, badge) => sum + badge.points, 0);

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        {/* Clean Celebratory Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 via-pink-50 to-purple-50"></div>

        <div className="relative z-10 space-y-6 p-6">
        {/* Achievements Header */}
        <div className="text-center py-8 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            🏆 Your Achievements 🏆
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Celebrate your victories • Unlock new badges • Reach for the stars! ✨
          </p>


        </div>

        {/* Vibrant Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 shadow-xl border-4 border-yellow-200">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulse"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-bounce"></div>
            <CardContent className="relative p-4 text-center">
              <div className="relative">
                <Award className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
              <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                {earnedBadges.length + lockedBadges.length}
              </div>
              <p className="text-white/90 font-medium text-sm drop-shadow-sm">Total Badges</p>
              <p className="text-xs text-white/80 mt-1">Collected & Available</p>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500 shadow-xl border-4 border-emerald-200">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulse"></div>
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-emerald-200 rounded-full animate-bounce"></div>
            <CardContent className="relative p-4 text-center">
              <div className="relative">
                <CheckCircle className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{earnedBadges.length}</div>
              <p className="text-white/90 font-medium text-sm drop-shadow-sm">Earned</p>
              <p className="text-xs text-white/80 mt-1">Achievements unlocked!</p>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-400 via-gray-400 to-zinc-500 shadow-xl border-4 border-slate-200">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
            <div className="absolute bottom-3 right-2 w-1 h-1 bg-slate-200 rounded-full animate-pulse"></div>
            <CardContent className="relative p-4 text-center">
              <div className="relative">
                <Lock className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce"></div>
              </div>
              <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{lockedBadges.length}</div>
              <p className="text-white/90 font-medium text-sm drop-shadow-sm">Locked</p>
              <p className="text-xs text-white/80 mt-1">Ready to unlock!</p>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-400 via-violet-400 to-pink-500 shadow-xl border-4 border-purple-200">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="absolute top-3 right-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-purple-200 rounded-full animate-bounce"></div>
            <CardContent className="relative p-4 text-center">
              <div className="relative">
                <Sparkles className="h-6 w-6 text-white mx-auto mb-2 drop-shadow-lg" />
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-purple-200 rounded-full animate-ping"></div>
              </div>
              <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{totalEarnedPoints}</div>
              <p className="text-white/90 font-medium text-sm drop-shadow-sm">Total Points</p>
              <p className="text-xs text-white/80 mt-1">Keep earning!</p>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("earned")}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
              activeTab === "earned"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Earned Badges ({earnedBadges.length})
          </button>
          <button
            onClick={() => setActiveTab("locked")}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
              activeTab === "locked"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Locked Badges ({lockedBadges.length})
          </button>
        </div>

        {/* Earned Badges */}
        {activeTab === "earned" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedBadges.map((badge) => (
              <Card
                key={badge.id}
                className="relative overflow-hidden bg-white border-4 border-transparent bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 p-[2px] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:scale-105"
              >
                <div className="bg-gradient-to-br from-white/95 via-white/98 to-white/95 rounded-lg h-full relative overflow-hidden">
                  {/* Clean Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/20 to-transparent"></div>

                  <CardContent className="p-6 relative">
                    {/* Badge Header */}
                    <div className="text-center mb-4">
                      <div className="relative">
                        <div className={`w-20 h-20 ${badge.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:scale-125 transition-transform duration-300 relative overflow-hidden`}>
                          <badge.icon className="h-10 w-10 text-white drop-shadow-lg z-10" />
                          {/* Subtle overlay on badge icon */}
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40"></div>
                        </div>

                      </div>
                      <h3 className="font-bold bg-gradient-to-r from-yellow-700 via-orange-600 to-yellow-700 bg-clip-text text-transparent text-lg mb-1 drop-shadow-sm">{badge.title}</h3>
                      <p className="text-sm text-gray-700 mb-3 font-medium">{badge.description}</p>
                    </div>

                    {/* Badge Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge className={`${getLevelColor(badge.level)} border-2 font-semibold shadow-sm`}>
                          {badge.level}
                        </Badge>
                        <Badge className={`${getCategoryColor(badge.category)} border-2 font-semibold shadow-sm`}>
                          {badge.category}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 flex items-center font-medium">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(badge.earnedDate).toLocaleDateString()}
                        </span>
                        <span className="text-purple-700 font-bold flex items-center">
                          <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
                          {badge.points} pts
                        </span>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-2 border-green-300 rounded-xl p-3 text-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1 drop-shadow-sm" />
                        <p className="text-sm text-green-800 font-bold">Earned!</p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Locked Badges */}
        {activeTab === "locked" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedBadges.map((badge) => (
              <Card
                key={badge.id}
                className="relative overflow-hidden bg-white border-4 border-transparent bg-gradient-to-r from-gray-300 via-slate-200 to-gray-300 p-[2px] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-105 opacity-80 hover:opacity-100"
              >
                <div className="bg-gradient-to-br from-white/95 via-white/98 to-white/95 rounded-lg h-full relative overflow-hidden">
                  {/* Clean Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/20 to-transparent"></div>

                  <CardContent className="p-6 relative">
                    {/* Badge Header */}
                    <div className="text-center mb-4">
                      <div className="relative">
                        <div className={`w-20 h-20 ${badge.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                          <badge.icon className="h-10 w-10 text-white drop-shadow-lg z-10" />
                          {/* Subtle overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20"></div>
                        </div>
                        {/* Lock overlay */}
                        <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                          <Lock className="h-3.5 w-3.5 text-white" />
                        </div>

                      </div>
                      <h3 className="font-bold bg-gradient-to-r from-gray-700 via-slate-600 to-gray-700 bg-clip-text text-transparent text-lg mb-1">{badge.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 font-medium">{badge.description}</p>
                    </div>

                    {/* Badge Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge className={`${getLevelColor(badge.level)} border-2 font-semibold shadow-sm opacity-75 group-hover:opacity-100`}>
                          {badge.level}
                        </Badge>
                        <Badge className={`${getCategoryColor(badge.category)} border-2 font-semibold shadow-sm opacity-75 group-hover:opacity-100`}>
                          {badge.category}
                        </Badge>
                      </div>

                      {/* Progress */}
                      {badge.progress !== undefined && badge.target !== undefined && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 font-medium">Progress</span>
                            <span className="text-gray-900 font-bold">
                              {badge.progress}/{badge.target}
                            </span>
                          </div>
                          <div className="relative">
                            <Progress value={(badge.progress / badge.target) * 100} className="h-3 bg-gray-200" />
                            {badge.progress > 0 && (
                              <div className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                                   style={{width: `${(badge.progress / badge.target) * 100}%`}}></div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="text-center bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-2 border border-purple-200">
                        <span className="text-purple-700 font-bold flex items-center justify-center">
                          <Gift className="h-4 w-4 mr-1 text-purple-600" />
                          {badge.points} pts when unlocked
                        </span>
                      </div>

                      {/* Tips to Unlock */}
                      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-300 rounded-xl p-3">
                        <div className="flex items-center mb-2">
                          <Info className="h-4 w-4 text-blue-600 mr-1" />
                          <span className="text-sm font-bold text-blue-800">Tips to unlock:</span>
                        </div>
                        <ul className="text-xs text-blue-700 space-y-1">
                          {badge.tips.map((tip, index) => (
                            <li key={index} className="flex items-start font-medium">
                              <span className="mr-1 text-blue-500">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === "earned" && earnedBadges.length === 0) || 
          (activeTab === "locked" && lockedBadges.length === 0)) && (
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} badges yet
            </h3>
            <p className="text-gray-600">
              {activeTab === "earned" 
                ? "Complete courses and activities to earn your first badge!"
                : "All badges have been unlocked! Check back for new challenges."
              }
            </p>
          </div>
        )}
        </div>
      </div>
    </DashboardLayout>
  );
}
