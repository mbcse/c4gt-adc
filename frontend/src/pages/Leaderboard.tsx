import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Medal,
  Crown,
  Star,
  Users,
  TrendingUp,
  Award,
  Target,
  Zap,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function Leaderboard() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Coming Soon Header */}
        <div className="text-center py-16">
          <div className="relative inline-block mb-8">
            {/* Large Trophy */}
            <div className="relative">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <Trophy className="h-16 w-16 text-white drop-shadow-lg" />
              </div>
              
              {/* Floating Elements around Trophy */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-bounce opacity-75"></div>
              <div className="absolute -bottom-2 -left-6 w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse opacity-80"></div>
              
              {/* Stars around trophy */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-2xl animate-pulse">⭐</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-orange-400 text-xl animate-bounce">🌟</div>
              <div className="absolute top-1/2 -left-10 transform -translate-y-1/2 text-red-400 text-lg animate-ping">✨</div>
              <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 text-purple-400 text-xl animate-pulse">💫</div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            🏆 Leaderboard 🏆
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Where champions are crowned and legends are born! 
            <br />
            <span className="text-lg text-gray-500">Coming soon to showcase the top learners...</span>
          </p>
          
          {/* Placeholder Medal Icons */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Medal className="h-8 w-8 text-white" />
              </div>
              <p className="text-sm font-medium text-yellow-600">1st Place</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Medal className="h-8 w-8 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-600">2nd Place</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Medal className="h-8 w-8 text-white" />
              </div>
              <p className="text-sm font-medium text-amber-700">3rd Place</p>
            </div>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Top Learners</h3>
            <p className="text-sm text-gray-600">See who's leading in course completions and quiz scores</p>
          </Card>
          
          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Weekly Rankings</h3>
            <p className="text-sm text-gray-600">Track weekly progress and compete with fellow learners</p>
          </Card>
          
          <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Achievement Boards</h3>
            <p className="text-sm text-gray-600">Celebrate milestones and showcase earned badges</p>
          </Card>
        </div>

        {/* Stats Placeholder */}
        <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-yellow-200">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-2xl font-bold text-orange-900">
              <Crown className="h-6 w-6 mr-2 text-yellow-600" />
              Competition Stats
            </CardTitle>
            <CardDescription className="text-orange-700">
              Real-time leaderboard metrics coming soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/60 rounded-lg border border-white/40">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">--</div>
                <p className="text-sm text-gray-600">Active Competitors</p>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-lg border border-white/40">
                <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">--</div>
                <p className="text-sm text-gray-600">Highest Streak</p>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-lg border border-white/40">
                <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">--</div>
                <p className="text-sm text-gray-600">Perfect Scores</p>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-lg border border-white/40">
                <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">--</div>
                <p className="text-sm text-gray-600">Monthly Champion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Compete?</h3>
          <p className="text-gray-600 mb-6">Keep learning, taking quizzes, and earning achievements to secure your spot!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3">
              Take a Quiz
            </Button>
            <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3">
              View Achievements
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
