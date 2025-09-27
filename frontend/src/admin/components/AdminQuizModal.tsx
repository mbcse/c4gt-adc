import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useApi } from "@/api/index";
import { quizAPI } from "@/api/quizAPI";
import type { Quiz, QuizQuestion, Video } from "@/types";

interface AdminQuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onQuizSaved: (quiz: Quiz) => void;
    courseId: number;
    editingQuiz?: Quiz | null;
    selectedVideo?: Video | null;
}

export const AdminQuizModal = ({
    isOpen,
    onClose,
    onQuizSaved,
    courseId,
    editingQuiz,
    selectedVideo
}: AdminQuizModalProps) => {
    const api = useApi();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        videoId: null as number | null,
        questions: [] as QuizQuestion[]
    });

    useEffect(() => {
        if (editingQuiz) {
            // Editing existing quiz
            setFormData({
                videoId: editingQuiz.videoId,
                questions: editingQuiz.questions || []
            });
        } else if (selectedVideo) {
            // Creating new quiz
            setFormData({
                videoId: selectedVideo.id,
                questions: []
            });
        } else {
            // Reset form
            setFormData({
                videoId: null,
                questions: []
            });
        }
        // Clear any previous errors when modal opens/changes
        setError(null);
    }, [editingQuiz, selectedVideo, isOpen]);

    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, {
                question: "",
                options: ["", "", "", ""],
                correctAnswer: 0,
                explanation: ""
            }]
        }));
    };

    const removeQuestion = (index: number) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }));
    };

    const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => i === index ? { ...q, [field]: value } : q)
        }));
    };

    const updateQuestionOption = (questionIndex: number, optionIndex: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) =>
                i === questionIndex
                    ? { ...q, options: q.options.map((opt, j) => j === optionIndex ? value : opt) }
                    : q
            )
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.videoId) {
            setError("Video selection is required");
            return;
        }
        if (formData.questions.length === 0) {
            setError("Please add at least one question");
            return;
        }

        // Validate questions
        for (let i = 0; i < formData.questions.length; i++) {
            const q = formData.questions[i];
            if (!q.question.trim()) {
                setError(`Question ${i + 1}: Question text is required`);
                return;
            }
            if (q.options.some(opt => !opt.trim())) {
                setError(`Question ${i + 1}: All options must be filled`);
                return;
            }
        }

        setIsLoading(true);
        setError(null);

        try {
            let savedQuiz;
            if (editingQuiz) {
                savedQuiz = await quizAPI.updateQuiz(editingQuiz.id, {
                    questions: formData.questions,
                    generatedBy: "ADMIN"
                }, api);
            } else {
                savedQuiz = await quizAPI.createQuiz({
                    videoId: formData.videoId,
                    questions: formData.questions,
                    generatedBy: "ADMIN"
                }, api);
            }
            onQuizSaved(savedQuiz);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Failed to save quiz");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    // Get the video title for display
    const currentVideo = editingQuiz?.video || selectedVideo;
    const videoTitle = currentVideo?.title || "Unknown Video";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {editingQuiz ? "Edit Quiz" : "Create Quiz"}
                        </h2>
                        {currentVideo && (
                            <p className="text-sm text-gray-600 mt-1">
                                For video: <span className="font-medium">{videoTitle}</span>
                            </p>
                        )}
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        {/* Video Info */}
                        {currentVideo && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                    {currentVideo.thumbnailUrl && (
                                        <img
                                            src={currentVideo.thumbnailUrl}
                                            alt={currentVideo.title}
                                            className="w-20 h-14 object-cover rounded"
                                        />
                                    )}
                                    <div>
                                        <h4 className="font-medium text-blue-900">{currentVideo.title}</h4>
                                        <p className="text-sm text-blue-700">
                                            Platform: {currentVideo.platform} • Duration: {Math.floor(currentVideo.duration / 60)}m {currentVideo.duration % 60}s
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Questions Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Questions ({formData.questions.length})
                                </label>
                                <button type="button" onClick={addQuestion} className="btn btn-outline btn-sm">
                                    <Plus className="w-4 h-4 mr-1" /> Add Question
                                </button>
                            </div>

                            {formData.questions.map((question, qIndex) => (
                                <div key={qIndex} className="border border-gray-200 rounded-lg p-4 mb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-900">Question {qIndex + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => removeQuestion(qIndex)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                                        <textarea
                                            value={question.question}
                                            onChange={e => updateQuestion(qIndex, 'question', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            rows={3}
                                            placeholder="Enter your question..."
                                        />
                                    </div>

                                    {/* Options */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
                                        {question.options.map((option, oIndex) => (
                                            <div key={oIndex} className="flex items-center mb-2">
                                                <input
                                                    type="radio"
                                                    name={`correct-${qIndex}`}
                                                    checked={question.correctAnswer === oIndex}
                                                    onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                                                    className="mr-2"
                                                />
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={e => updateQuestionOption(qIndex, oIndex, e.target.value)}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                    placeholder={`Option ${oIndex + 1}...`}
                                                />
                                            </div>
                                        ))}
                                        <p className="text-xs text-gray-500 mt-1">
                                            Select the radio button next to the correct answer
                                        </p>
                                    </div>

                                    {/* Explanation */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Explanation (Optional)</label>
                                        <textarea
                                            value={question.explanation || ""}
                                            onChange={e => updateQuestion(qIndex, 'explanation', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            rows={2}
                                            placeholder="Explain why this answer is correct..."
                                        />
                                    </div>
                                </div>
                            ))}

                            {formData.questions.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No questions added yet.</p>
                                    <p className="text-sm">Click "Add Question" to get started.</p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-outline"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !formData.videoId || formData.questions.length === 0}
                        className="btn btn-primary"
                    >
                        {isLoading ? "Saving..." : editingQuiz ? "Update Quiz" : "Create Quiz"}
                    </button>
                </div>
            </div>
        </div>
    );
};
