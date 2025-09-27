import React, { useState, useEffect } from "react";
import { Button } from "@/student/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/student/components/ui/card";
import { Progress } from "@/student/components/ui/progress";
import { Badge } from "@/student/components/ui/badge";
import { Modal } from "@/student/components/Modal";
import { Brain, Clock, CheckCircle, X, Star, Trophy, RotateCcw, BookOpen, Eye } from "lucide-react";
import { Quiz, QuizQuestion } from "@/types/index"

interface QuizModalProps {
    quiz: Quiz;
    isOpen: boolean;
    onClose: () => void;
    onComplete: (score: number, answers: any[]) => void;
}

export function QuizModal({ quiz, isOpen, onClose, onComplete }: QuizModalProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showDetailedReview, setShowDetailedReview] = useState(false);

    const questions: QuizQuestion[] = quiz?.questions || [];

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentQuestion(0);
            setAnswers({});
            setIsSubmitted(false);
            setScore(0);
            setShowResults(false);
            setShowDetailedReview(false);
        }
    }, [isOpen]);

    const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }));
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correct++;
            }
        });
        return (correct / questions.length) * 100;
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setIsSubmitted(true);
        setShowResults(true);

        // Prepare answers for backend
        const formattedAnswers = questions.map((question, index) => ({
            questionId: question.id,
            selectedAnswer: answers[index],
            correct: answers[index] === question.correctAnswer
        }));

        onComplete(finalScore, formattedAnswers);
    };

    const handleRetake = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setIsSubmitted(false);
        setShowResults(false);
        setShowDetailedReview(false);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-600";
        if (score >= 80) return "text-blue-600";
        if (score >= 70) return "text-orange-600";
        return "text-red-600";
    };

    const getScoreBadge = (score: number) => {
        if (score === 100) return { text: "PERFECT!", icon: "🏆", color: "bg-yellow-100 text-yellow-800" };
        if (score >= 90) return { text: "EXCELLENT!", icon: "🌟", color: "bg-green-100 text-green-800" };
        if (score >= 80) return { text: "GREAT!", icon: "🎯", color: "bg-blue-100 text-blue-800" };
        if (score >= 70) return { text: "GOOD!", icon: "💪", color: "bg-orange-100 text-orange-800" };
        return { text: "KEEP TRYING!", icon: "🚀", color: "bg-red-100 text-red-800" };
    };

    if (!isOpen) return null;

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <div className="max-w-5xl mx-auto max-h-[90vh] overflow-hidden">
                {!showResults ? (
                    // Quiz Taking UI
                    <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                        <Brain className="h-6 w-6" />
                                        {quiz.video?.title} Quiz
                                    </CardTitle>
                                    <p className="text-blue-100 mt-1">
                                        Question {currentQuestion + 1} of {questions.length}
                                    </p>
                                </div>
                            </div>
                            <Progress
                                value={(currentQuestion + 1) / questions.length * 100}
                                className="mt-4 bg-blue-300"
                            />
                        </CardHeader>

                        <CardContent className="p-8">
                            {questions.length > 0 && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                                            {questions[currentQuestion]?.question}
                                        </h3>

                                        <div className="space-y-3">
                                            {questions[currentQuestion]?.options?.map((option, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                                                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md ${answers[currentQuestion] === index
                                                            ? "border-blue-500 bg-blue-50 shadow-md"
                                                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${answers[currentQuestion] === index
                                                                ? "border-blue-500 bg-blue-500 text-white"
                                                                : "border-gray-300"
                                                            }`}>
                                                            {String.fromCharCode(65 + index)}
                                                        </div>
                                                        <span className="text-gray-700">{option}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-6">
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                            disabled={currentQuestion === 0}
                                            className="px-6"
                                        >
                                            ← Previous
                                        </Button>

                                        {currentQuestion === questions.length - 1 ? (
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={Object.keys(answers).length !== questions.length}
                                                className="px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                            >
                                                Submit Quiz 🎯
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                                                disabled={answers[currentQuestion] === undefined}
                                                className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                            >
                                                Next →
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    // Results UI
                    <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-blue-50">
                        <CardHeader className="text-center py-6">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                <Trophy className="h-10 w-10 text-white" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                                Quiz Completed! 🎉
                            </CardTitle>

                            <div className="space-y-4">
                                <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                                    {Math.round(score)}%
                                </div>

                                <Badge className={`text-lg px-4 py-2 ${getScoreBadge(score).color} border-2`}>
                                    {getScoreBadge(score).icon} {getScoreBadge(score).text}
                                </Badge>

                                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-6">
                                    <div className="bg-white/70 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-gray-800">
                                            {Object.values(answers).filter((answer, index) => answer === questions[index]?.correctAnswer).length}
                                        </div>
                                        <div className="text-sm text-gray-600">Correct</div>
                                    </div>
                                    <div className="bg-white/70 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-gray-800">
                                            {questions.length}
                                        </div>
                                        <div className="text-sm text-gray-600">Total</div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="px-8 pb-8">
                            {/* Toggle between summary and detailed review */}
                            <div className="mb-6 flex justify-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDetailedReview(!showDetailedReview)}
                                    className="px-6 py-2 border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    {showDetailedReview ? 'Show Summary' : 'Review Answers'}
                                </Button>
                            </div>

                            {/* Detailed Review Section */}
                            {showDetailedReview && (
                                <div className="mb-6 max-h-96 overflow-y-auto bg-white rounded-lg p-4 border">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                        <BookOpen className="h-5 w-5 mr-2" />
                                        Answer Review
                                    </h3>
                                    <div className="space-y-6">
                                        {questions.map((question, idx) => {
                                            const userAnswer = answers[idx];
                                            const isCorrect = userAnswer === question.correctAnswer;

                                            // console.log('Current question data:', questions[currentQuestion]);
                                            // console.log('All answers:', answers);
                                            // console.log('Question correct value:', questions[currentQuestion]?.correctAnswer);

                                            return (
                                                <div key={question.id} className="border-b pb-4 last:border-b-0">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h4 className="text-md font-semibold text-gray-800 flex-1">
                                                            {idx + 1}. {question.question}
                                                        </h4>
                                                        <Badge className={isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                                            {isCorrect ? "Correct" : "Incorrect"}
                                                        </Badge>
                                                    </div>

                                                    <div className="space-y-2">
                                                        {question.options.map((option, optIdx) => {
                                                            const isUserChoice = userAnswer === optIdx;
                                                            const isCorrectAnswer = question.correctAnswer === optIdx;

                                                            let className = "p-3 rounded-lg border text-sm";
                                                            if (isCorrectAnswer) {
                                                                className += " bg-green-100 border-green-300 text-green-800 font-semibold";
                                                            } else if (isUserChoice && !isCorrectAnswer) {
                                                                className += " bg-red-100 border-red-300 text-red-800";
                                                            } else {
                                                                className += " bg-gray-50 border-gray-200 text-gray-700";
                                                            }

                                                            return (
                                                                <div key={optIdx} className={className}>
                                                                    <span className="font-bold mr-2">
                                                                        {String.fromCharCode(65 + optIdx)}.
                                                                    </span>
                                                                    {option}
                                                                    {isCorrectAnswer && <span className="ml-2 text-green-600">✓ Correct</span>}
                                                                    {isUserChoice && !isCorrectAnswer && <span className="ml-2 text-red-600">✗ Your answer</span>}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {question.explanation && (
                                                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                            <p className="text-sm text-blue-800">
                                                                <span className="font-semibold">Explanation:</span> {question.explanation}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                >
                                    Continue Learning 🚀
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleRetake}
                                    className="px-8 py-3 border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                                >
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Retake Quiz
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Modal>
    );
}
