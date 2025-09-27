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
  Brain,
  Play,
  Star,
  Clock,
  Target,
  CheckCircle,
  Lock,
  Trophy,
  RotateCcw,
  Calendar,
  Award,
  BookOpen,
  Zap,
  Filter,
  Search,
  SortAsc,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/DashboardLayout";

export default function Quizzes() {
  const [activeTab, setActiveTab] = useState<"available" | "attempted">("available");
  const [filterBy, setFilterBy] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const unlockedQuizzes = [
    {
      id: 1,
      title: "React Hooks Fundamentals",
      course: "Advanced React Development",
      difficulty: "medium",
      questions: 15,
      timeLimit: 20,
      description: "Test your understanding of React hooks including useState, useEffect, and custom hooks",
      topics: ["useState", "useEffect", "Custom Hooks"],
      unlocked: true,
    },
    {
      id: 2,
      title: "CSS Grid Layout",
      course: "UI/UX Design Fundamentals",
      difficulty: "easy",
      questions: 12,
      timeLimit: 15,
      description: "Master CSS Grid properties and layout techniques",
      topics: ["Grid Container", "Grid Items", "Responsive Design"],
      unlocked: true,
    },
    {
      id: 3,
      title: "JavaScript ES6+ Features",
      course: "Advanced React Development",
      difficulty: "medium",
      questions: 20,
      timeLimit: 25,
      description: "Explore modern JavaScript features including arrow functions, destructuring, and async/await",
      topics: ["Arrow Functions", "Destructuring", "Async/Await"],
      unlocked: true,
    },
    {
      id: 4,
      title: "Python Data Structures",
      course: "Data Science with Python",
      difficulty: "hard",
      questions: 25,
      timeLimit: 35,
      description: "Deep dive into Python lists, dictionaries, sets, and advanced data manipulation",
      topics: ["Lists", "Dictionaries", "Sets", "Algorithms"],
      unlocked: true,
    },
    {
      id: 5,
      title: "Node.js Express Basics",
      course: "Full-Stack Web Development",
      difficulty: "medium",
      questions: 18,
      timeLimit: 22,
      description: "Learn Express.js fundamentals including routing, middleware, and API development",
      topics: ["Routing", "Middleware", "APIs"],
      unlocked: true,
    },
    {
      id: 6,
      title: "Database Design Principles",
      course: "Full-Stack Web Development",
      difficulty: "hard",
      questions: 22,
      timeLimit: 30,
      description: "Master database normalization, relationships, and query optimization",
      topics: ["Normalization", "Relationships", "Optimization"],
      unlocked: false,
    },
  ];

  const attemptedQuizzes = [
    {
      id: 1,
      title: "HTML5 Semantics",
      course: "Web Development Basics",
      difficulty: "easy",
      score: 92,
      maxScore: 100,
      questions: 10,
      timeLimit: 15,
      attemptDate: "2024-02-15",
      timeTaken: 12,
      attempts: 1,
      bestScore: 92,
      canRetake: true,
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      course: "Web Development Basics",
      difficulty: "medium",
      score: 85,
      maxScore: 100,
      questions: 15,
      timeLimit: 20,
      attemptDate: "2024-02-14",
      timeTaken: 18,
      attempts: 2,
      bestScore: 89,
      canRetake: true,
    },
    {
      id: 3,
      title: "CSS Flexbox",
      course: "UI/UX Design Fundamentals",
      difficulty: "easy",
      score: 100,
      maxScore: 100,
      questions: 12,
      timeLimit: 15,
      attemptDate: "2024-02-13",
      timeTaken: 11,
      attempts: 1,
      bestScore: 100,
      canRetake: false,
    },
    {
      id: 4,
      title: "React Components",
      course: "Advanced React Development",
      difficulty: "medium",
      score: 78,
      maxScore: 100,
      questions: 18,
      timeLimit: 25,
      attemptDate: "2024-02-12",
      timeTaken: 23,
      attempts: 1,
      bestScore: 78,
      canRetake: true,
    },
    {
      id: 5,
      title: "Python Basics",
      course: "Data Science with Python",
      difficulty: "easy",
      score: 94,
      maxScore: 100,
      questions: 14,
      timeLimit: 18,
      attemptDate: "2024-02-11",
      timeTaken: 15,
      attempts: 1,
      bestScore: 94,
      canRetake: true,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "hard":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage === 100) return "text-yellow-600";
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBadgeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage === 100) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (percentage >= 90) return "bg-green-100 text-green-800 border-green-300";
    if (percentage >= 80) return "bg-blue-100 text-blue-800 border-blue-300";
    if (percentage >= 70) return "bg-orange-100 text-orange-800 border-orange-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const filterQuizzes = (quizzes: typeof unlockedQuizzes) => {
    let filtered = quizzes;
    
    // Filter by difficulty
    if (filterBy !== "all") {
      filtered = filtered.filter(quiz => quiz.difficulty === filterBy);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(quiz => 
        quiz.title.toLowerCase().includes(query) ||
        quiz.course.toLowerCase().includes(query) ||
        quiz.topics?.some(topic => topic.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const availableQuizzes = filterQuizzes(unlockedQuizzes.filter(quiz => quiz.unlocked));
  const filteredAttemptedQuizzes = filterQuizzes(attemptedQuizzes as any);

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        {/* Vibrant Electric Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-100 via-purple-100 to-pink-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-yellow-100/40 via-transparent to-cyan-100/40 animate-pulse"></div>

        <div className="relative z-10 space-y-6 p-6">
        {/* Electric Quiz Header */}
        <div className="text-center py-8 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            ⚡ QUIZ ZONE ⚡
          </h1>
          <div className="text-lg text-gray-600 mb-4 font-bold">
            ⚡ Test your knowledge • 🎯 Challenge yourself • 🚀 Power up your brain!
          </div>
          <div className="flex justify-center items-center space-x-4 text-sm flex-wrap gap-2">
            <span className="flex items-center text-cyan-700 font-bold bg-cyan-100 px-3 py-1 rounded-full hover:bg-cyan-200 transition-all duration-200 border border-cyan-300">
              <Brain className="h-4 w-4 mr-1" />
              {availableQuizzes.length} Ready to Rock! 🎸
            </span>
            <span className="flex items-center text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded-full hover:bg-emerald-200 transition-all duration-200 border border-emerald-300">
              <CheckCircle className="h-4 w-4 mr-1" />
              {attemptedQuizzes.length} Conquered 🏆
            </span>
            <span className="flex items-center text-yellow-700 font-bold bg-yellow-100 px-3 py-1 rounded-full hover:bg-yellow-200 transition-all duration-200 border border-yellow-300">
              <Star className="h-4 w-4 mr-1" />
              {attemptedQuizzes.filter(q => (q.score / q.maxScore) === 1).length} Perfect Scores! 🎆
            </span>
            <span className="flex items-center text-purple-700 font-bold bg-purple-100 px-3 py-1 rounded-full hover:bg-purple-200 transition-all duration-200 border border-purple-300">
              <Trophy className="h-4 w-4 mr-1" />
              {Math.round(attemptedQuizzes.reduce((sum, q) => sum + (q.score / q.maxScore * 100), 0) / attemptedQuizzes.length)}% Avg Score 🎯
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search quizzes by title, course, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-sm"
          />
        </div>

        {/* Filters and Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("available")}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === "available"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Available ({availableQuizzes.length})
            </button>
            <button
              onClick={() => setActiveTab("attempted")}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === "attempted"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Attempted ({filteredAttemptedQuizzes.length})
            </button>
          </div>
        </div>

        {/* Available Quizzes */}
        {activeTab === "available" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableQuizzes.map((quiz, index) => {
              const cardColors = [
                "from-blue-400 to-purple-500",
                "from-green-400 to-teal-500",
                "from-orange-400 to-red-500",
                "from-purple-400 to-pink-500",
                "from-cyan-400 to-blue-500",
                "from-emerald-400 to-green-500"
              ];
              const bgColors = [
                "from-blue-50 to-purple-50",
                "from-green-50 to-teal-50",
                "from-orange-50 to-red-50",
                "from-purple-50 to-pink-50",
                "from-cyan-50 to-blue-50",
                "from-emerald-50 to-green-50"
              ];
              const cardGradient = cardColors[index % cardColors.length];
              const bgGradient = bgColors[index % bgColors.length];

              return (
                <Card
                  key={quiz.id}
                  className={`relative overflow-hidden bg-gradient-to-br ${bgGradient} border-2 border-cyan-200 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:scale-105 hover:border-cyan-400`}
                >
                  {/* Electric Header with Lightning */}
                  <div className="relative overflow-hidden">
                    <div className={`h-3 bg-gradient-to-r ${cardGradient} group-hover:h-4 transition-all duration-300 rounded-t-lg relative`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                    <div className="absolute top-0 right-2 text-white text-xs font-bold opacity-80 pt-0.5">
                      {quiz.difficulty === 'easy' ? '⚡' : quiz.difficulty === 'medium' ? '🌩️' : '⛈️'}
                    </div>
                  </div>

                  {/* Electric Quiz Elements */}
                  <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-80 transition-all duration-300">
                    <div className={`w-8 h-8 bg-gradient-to-r ${cardGradient} rounded-full flex items-center justify-center text-white text-sm shadow-lg border border-cyan-300`}>
                      ⚡
                    </div>
                  </div>
                  <div className="absolute top-2 right-10 opacity-20 group-hover:opacity-60 transition-all duration-300">
                    <div className="text-lg text-cyan-500">⚡</div>
                  </div>
                  <div className="absolute top-6 right-12 opacity-10 group-hover:opacity-40 transition-all duration-300">
                    <div className="text-sm text-purple-500">✨</div>
                  </div>

                  <CardContent className="p-6 relative">
                    {/* Quiz Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors leading-tight">
                            {quiz.title}
                          </h3>
                          <p className="text-sm text-purple-600 font-medium mb-2 flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {quiz.course}
                          </p>
                        </div>
                        <Badge className={`${getDifficultyColor(quiz.difficulty)} border-2 font-bold capitalize shadow-sm`}>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{quiz.description}</p>
                    </div>

                    {/* Fun Quiz Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/60 rounded-lg p-3 text-center border border-white/40">
                        <Brain className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                        <div className="font-bold text-gray-800">{quiz.questions}</div>
                        <div className="text-xs text-gray-600">Questions</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 text-center border border-white/40">
                        <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <div className="font-bold text-gray-800">{quiz.timeLimit}m</div>
                        <div className="text-xs text-gray-600">Time Limit</div>
                      </div>
                    </div>

                    {/* Colorful Topics */}
                    <div className="mb-5">
                      <p className="text-xs font-medium text-gray-600 mb-2">Topics you'll master:</p>
                      <div className="flex flex-wrap gap-1">
                        {quiz.topics.map((topic, topicIndex) => {
                          const topicColors = [
                            "bg-blue-200 text-blue-800",
                            "bg-green-200 text-green-800",
                            "bg-purple-200 text-purple-800",
                            "bg-orange-200 text-orange-800",
                            "bg-pink-200 text-pink-800"
                          ];
                          return (
                            <span
                              key={topicIndex}
                              className={`text-xs px-2 py-1 rounded-full font-medium ${topicColors[topicIndex % topicColors.length]}`}
                            >
                              {topic}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Fun Action Button */}
                    <Button className={`w-full bg-gradient-to-r ${cardGradient} hover:shadow-xl text-white shadow-lg transition-all duration-300 group-hover:scale-105 py-3 font-bold hover:animate-pulse`}>
                      <Play className="h-4 w-4 mr-2" />
                      Let's Quiz! 🚀
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Attempted Quizzes */}
        {activeTab === "attempted" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttemptedQuizzes.map((quiz, index) => {
              const scorePercentage = (quiz.score / quiz.maxScore) * 100;
              const cardColors = [
                "from-emerald-400 to-teal-500",
                "from-blue-400 to-indigo-500",
                "from-purple-400 to-pink-500",
                "from-orange-400 to-red-500",
                "from-cyan-400 to-blue-500",
                "from-green-400 to-emerald-500"
              ];
              const bgColors = [
                "from-emerald-50 to-teal-50",
                "from-blue-50 to-indigo-50",
                "from-purple-50 to-pink-50",
                "from-orange-50 to-red-50",
                "from-cyan-50 to-blue-50",
                "from-green-50 to-emerald-50"
              ];
              const cardGradient = cardColors[index % cardColors.length];
              const bgGradient = bgColors[index % bgColors.length];

              return (
                <Card
                  key={quiz.id}
                  className={`relative overflow-hidden bg-gradient-to-br ${bgGradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:scale-105`}
                >
                  {/* Score-based Header */}
                  <div className={`h-2 bg-gradient-to-r ${scorePercentage === 100 ? 'from-yellow-400 to-orange-400' : scorePercentage >= 90 ? 'from-green-400 to-emerald-400' : cardGradient} group-hover:h-3 transition-all duration-300`}></div>

                  {/* Achievement Badge for Perfect Scores */}
                  {scorePercentage === 100 && (
                    <div className="absolute top-3 right-3 animate-pulse">
                      <Star className="h-6 w-6 text-yellow-500 drop-shadow-lg" />
                    </div>
                  )}

                  {/* Fun Results Elements */}
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-all duration-300">
                    <div className={`w-6 h-6 bg-gradient-to-r ${cardGradient} rounded-full flex items-center justify-center text-white text-xs`}>
                      {scorePercentage === 100 ? '🏆' : scorePercentage >= 90 ? '🌟' : '💪'}
                    </div>
                  </div>

                  <CardContent className="p-6 relative">
                    {/* Quiz Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors leading-tight">
                            {quiz.title}
                          </h3>
                          <p className="text-sm text-purple-600 font-medium flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {quiz.course}
                          </p>
                        </div>
                        <Badge className={`${getDifficultyColor(quiz.difficulty)} border-2 font-bold capitalize shadow-sm`}>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {/* Fun Score Display */}
                    <div className="mb-5 p-4 bg-white/70 rounded-xl border border-white/50 relative overflow-hidden">
                      <div className="absolute top-1 left-1 text-xs opacity-40">
                        {scorePercentage === 100 ? '🔥' : scorePercentage >= 90 ? '⭐' : scorePercentage >= 80 ? '💪' : '🚀'}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-gray-700 flex items-center">
                            {scorePercentage === 100 ? '🏆 PERFECT!' : scorePercentage >= 90 ? '🌟 AMAZING!' : scorePercentage >= 80 ? '🎯 GREAT!' : '💪 GOOD JOB!'} Latest Score
                          </span>
                          <Badge className={`${getScoreBadgeColor(quiz.score, quiz.maxScore)} border-2 font-bold text-lg px-3 py-1`}>
                            {quiz.score}/{quiz.maxScore}
                          </Badge>
                        </div>
                        <Progress value={scorePercentage} className="h-3 mb-3" />
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="text-center p-2 bg-white/60 rounded-lg">
                            <div className="font-bold text-gray-800">Best: {quiz.bestScore}</div>
                            <div className="text-gray-600">High Score</div>
                          </div>
                          <div className="text-center p-2 bg-white/60 rounded-lg">
                            <div className="font-bold text-gray-800">{quiz.attempts}x</div>
                            <div className="text-gray-600">Attempts</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
                      <div className="bg-white/60 rounded-lg p-2 text-center border border-white/40">
                        <Calendar className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                        <div className="font-medium text-gray-700">{quiz.attemptDate}</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2 text-center border border-white/40">
                        <Timer className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                        <div className="font-medium text-gray-700">{quiz.timeTaken}/{quiz.timeLimit}m</div>
                      </div>
                    </div>

                    {/* Fun Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-medium transition-all duration-300 hover:scale-105"
                      >
                        <Trophy className="h-4 w-4 mr-2" />
                        View Results 📊
                      </Button>
                      {quiz.canRetake && (
                        <Button className={`w-full bg-gradient-to-r ${cardGradient} hover:shadow-xl text-white shadow-lg transition-all duration-300 group-hover:scale-105 py-3 font-bold hover:animate-pulse`}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Try Again! 🔄
                      </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === "available" && availableQuizzes.length === 0) || 
          (activeTab === "attempted" && filteredAttemptedQuizzes.length === 0)) && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No quizzes found
            </h3>
            <p className="text-gray-600">
              {activeTab === "available" 
                ? "Try adjusting your filters to see more available quizzes."
                : "You haven't attempted any quizzes yet. Start with the available quizzes!"
              }
            </p>
          </div>
        )}
        </div>
      </div>
    </DashboardLayout>
  );
}
