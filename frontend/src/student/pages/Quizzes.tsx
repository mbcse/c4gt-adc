import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/student/components/ui/card";
import { Button } from "@/student/components/ui/button";
import { Badge } from "@/student/components/ui/badge";
import { Progress } from "@/student/components/ui/progress";
import {
  Brain,
  Play,
  Clock,
  CheckCircle,
  Trophy,
  RotateCcw,
  BookOpen,
  Search,
  Loader2,
  Calendar,
  Star,
} from "lucide-react";
import { cn } from "@/student/lib/utils";
import DashboardLayout from "@/student/components/DashboardLayout";
import { QuizModal } from "@/student/components/QuizModal";
import { Modal } from "@/student/components/Modal";
import { quizAPI, QuizWithStatus } from "@/api/quizAPI";
import { useApi } from "@/api/index";

export default function Quizzes() {
  const api = useApi();
  const [activeTab, setActiveTab] = useState<"all" | "unattempted" | "attempted">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [allQuizzes, setAllQuizzes] = useState<QuizWithStatus[]>([]);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizWithStatus | null>(null);
  
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedQuizHistory, setSelectedQuizHistory] = useState<QuizWithStatus | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setIsLoading(true);
      
      const allQuizzesResponse = await quizAPI.getAllQuizzes(api, 1, 100);
      const quizzes: QuizWithStatus[] = allQuizzesResponse.data.map(q => ({
        ...q,
        isUnlocked: q.isUnlocked ?? false,
        attemptCount: q.attemptCount ?? 0,
        bestScore: q.bestScore ?? 0,
      }));

      setAllQuizzes(quizzes);
    } catch (error) {
      console.error("Failed to load quizzes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizStart = async (quiz: QuizWithStatus) => {
    try {
      const fullQuiz = await quizAPI.getQuiz(quiz.id, api);
      setSelectedQuiz(fullQuiz as QuizWithStatus);
      setShowQuizModal(true);
    } catch (error) {
      console.error("Failed to load quiz:", error);
    }
  };

  const handleQuizComplete = async (score: number, answers: any[]) => {
    try {
      if (selectedQuiz) {
        await quizAPI.createQuizAttempt({
          quizId: selectedQuiz.id,
          answers,
          score
        }, api);
      }
    } catch (error) {
      console.error("Failed to save quiz attempt:", error);
    }
  };

  const handleViewHistory = async (quiz: QuizWithStatus) => {
    try {
      setIsLoadingHistory(true);
      setSelectedQuizHistory(quiz);
      
      const attemptsResponse = await quizAPI.getQuizAttempts(api, { quizId: quiz.id }, 1, 50)

      setQuizAttempts(attemptsResponse.data || []);
      setShowHistoryModal(true);
    } catch (error) {
      console.error("Failed to load quiz history:", error);
      setQuizAttempts([]);
      setShowHistoryModal(true);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 80) return "bg-blue-100 text-blue-800 border-blue-300";
    if (score >= 70) return "bg-orange-100 text-orange-800 border-orange-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const filterQuizzes = (quizzes: QuizWithStatus[]) => {
    if (!searchQuery.trim()) {
      return quizzes;
    }
    const query = searchQuery.toLowerCase();
    return quizzes.filter(quiz => 
      quiz.video?.title?.toLowerCase().includes(query) ||
      quiz.video?.description?.toLowerCase().includes(query)
    );
  };

  const unattemptedQuizzes = allQuizzes.filter(quiz => quiz.isUnlocked && quiz.attemptCount === 0);
  const attemptedQuizzes = allQuizzes.filter(quiz => quiz.attemptCount > 0);
  const allUnlockedQuizzes = allQuizzes.filter(quiz => quiz.isUnlocked);

  const quizzesToDisplay =
    activeTab === "all"
      ? allUnlockedQuizzes
      : activeTab === "unattempted"
      ? unattemptedQuizzes
      : attemptedQuizzes;

  const filteredDisplayedQuizzes = filterQuizzes(quizzesToDisplay);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="text-center">
            <Loader2 className="h-16 w-16 animate-spin text-violet-600 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Loading your quizzes...</h3>
            <p className="text-slate-600">Get ready to test your knowledge! ⚡</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-100 via-purple-100 to-pink-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-yellow-100/40 via-transparent to-cyan-100/40 animate-pulse"></div>

        <div className="relative z-10 space-y-6 p-6">
          {/* Header */}
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
                {unattemptedQuizzes.length} Ready to Rock! 🎸
              </span>
              <span className="flex items-center text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded-full hover:bg-emerald-200 transition-all duration-200 border border-emerald-300">
                <CheckCircle className="h-4 w-4 mr-1" />
                {attemptedQuizzes.length} Conquered 🏆
              </span>
              {attemptedQuizzes.length > 0 && (
                <span className="flex items-center text-purple-700 font-bold bg-purple-100 px-3 py-1 rounded-full hover:bg-purple-200 transition-all duration-200 border border-purple-300">
                  <Trophy className="h-4 w-4 mr-1" />
                  {Math.round(attemptedQuizzes.reduce((sum, q) => sum + q.bestScore, 0) / attemptedQuizzes.length)}% Avg Score 🎯
                </span>
              )}
            </div>
          </div>

          {/* Search Bar and Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes by video title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("all")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                  activeTab === "all"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                All ({allUnlockedQuizzes.length})
              </button>
              <button
                onClick={() => setActiveTab("unattempted")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                  activeTab === "unattempted"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Unattempted ({unattemptedQuizzes.length})
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
                Attempted ({attemptedQuizzes.length})
              </button>
            </div>
          </div>

          {/* Quizzes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDisplayedQuizzes.map((quiz, index) => {
              const isAttempted = quiz.attemptCount > 0;

              if (isAttempted) {
                // Attempted Quiz Card
                return (
                  <Card
                    key={quiz.id}
                    className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:scale-105"
                  >
                    <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:h-3 transition-all duration-300"></div>
                    <CardContent className="p-6 relative">
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors leading-tight">
                              {quiz.video?.title || "Quiz"}
                            </h3>
                            <p className="text-sm text-purple-600 font-medium flex items-center">
                              <BookOpen className="h-3 w-3 mr-1" />
                              Video Quiz
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-5 p-4 bg-white/70 rounded-xl border border-white/50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-gray-700">
                            Best Score
                          </span>
                          <Badge className={`${getScoreBadgeColor(quiz.bestScore)} border-2 font-bold text-lg px-3 py-1`}>
                            {Math.round(quiz.bestScore)}%
                          </Badge>
                        </div>
                        <Progress value={quiz.bestScore} className="h-3 mb-3" />
                        <div className="text-center">
                          <div className="font-bold text-gray-800">{quiz.attemptCount} attempt(s)</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          onClick={() => handleViewHistory(quiz)}
                          disabled={isLoadingHistory}
                          className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-medium transition-all duration-300 hover:scale-105"
                        >
                          {isLoadingHistory ? (
                            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading...</>
                          ) : (
                            <><Trophy className="h-4 w-4 mr-2" /> View Results 📊</>
                          )}
                        </Button>
                        <Button 
                          onClick={() => handleQuizStart(quiz)}
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-xl text-white shadow-lg transition-all duration-300 group-hover:scale-105 py-3 font-bold hover:animate-pulse"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" /> Try Again! 🔄
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              } else {
                // Unattempted (Available) Quiz Card
                const cardColors = [
                  "from-blue-400 to-purple-500", "from-green-400 to-teal-500", "from-orange-400 to-red-500",
                  "from-purple-400 to-pink-500", "from-cyan-400 to-blue-500", "from-emerald-400 to-green-500"
                ];
                const bgColors = [
                  "from-blue-50 to-purple-50", "from-green-50 to-teal-50", "from-orange-50 to-red-50",
                  "from-purple-50 to-pink-50", "from-cyan-50 to-blue-50", "from-emerald-50 to-green-50"
                ];
                const cardGradient = cardColors[index % cardColors.length];
                const bgGradient = bgColors[index % bgColors.length];

                return (
                  <Card
                    key={quiz.id}
                    className={`relative overflow-hidden bg-gradient-to-br ${bgGradient} border-2 border-cyan-200 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer group hover:-translate-y-3 hover:scale-105 hover:border-cyan-400`}
                  >
                    <div className="relative overflow-hidden">
                      <div className={`h-3 bg-gradient-to-r ${cardGradient} group-hover:h-4 transition-all duration-300 rounded-t-lg relative`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    <CardContent className="p-6 relative">
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors leading-tight">
                              {quiz.video?.title || "Quiz"}
                            </h3>
                            <p className="text-sm text-purple-600 font-medium mb-2 flex items-center">
                              <BookOpen className="h-3 w-3 mr-1" /> Video Quiz
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/60 rounded-lg p-3 text-center border border-white/40">
                          <Brain className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                          <div className="font-bold text-gray-800">{quiz.questions?.length || 0}</div>
                          <div className="text-xs text-gray-600">Questions</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 text-center border border-white/40">
                          <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                          <div className="font-bold text-gray-800">
                            {Math.ceil((quiz.questions?.length || 0) * 1.5)}m
                          </div>
                          <div className="text-xs text-gray-600">Est. Time</div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleQuizStart(quiz)}
                        className={`w-full bg-gradient-to-r ${cardGradient} hover:shadow-xl text-white shadow-lg transition-all duration-300 group-hover:scale-105 py-3 font-bold hover:animate-pulse`}
                      >
                        <Play className="h-4 w-4 mr-2" /> Start Quiz! 🚀
                      </Button>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>

          {/* Empty State */}
          {filteredDisplayedQuizzes.length === 0 && !isLoading && (
            <div className="text-center py-12 col-span-full">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Quizzes Found
              </h3>
              <p className="text-gray-600">
                It looks like there are no quizzes matching your current selection.
              </p>
            </div>
          )}
        </div>

        {/* Quiz Modal */}
        {showQuizModal && selectedQuiz && (
          <QuizModal
            quiz={selectedQuiz}
            isOpen={showQuizModal}
            onClose={() => {
              setShowQuizModal(false);
              setSelectedQuiz(null);
              loadQuizzes();
            }}
            onComplete={handleQuizComplete}
          />
        )}

        {/* Quiz History Modal */}
        {showHistoryModal && selectedQuizHistory && (
          <Modal open={showHistoryModal} onOpenChange={() => setShowHistoryModal(false)}>
            <div className="max-w-2xl mx-auto max-h-[80vh] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <Trophy className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedQuizHistory.video?.title} - Quiz History
                  </h2>
                </div>
                
                {quizAttempts.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No attempts recorded yet.</p>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto space-y-4">
                    {quizAttempts.map((attempt, index) => (
                      <div key={attempt.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 mr-2" />
                            <span className="font-bold text-lg">Attempt #{quizAttempts.length - index}</span>
                          </div>
                          <Badge className={`${getScoreBadgeColor(attempt.score)} border-2 font-bold text-lg px-3 py-1`}>
                            {Math.round(attempt.score)}%
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(attempt.completedAt).toLocaleString()}
                        </div>
                        <Progress value={attempt.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
}