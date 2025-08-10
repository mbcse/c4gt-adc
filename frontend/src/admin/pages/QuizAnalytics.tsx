import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { QuizResult } from '../types'

// Quiz Analytics page data
const quizResults: QuizResult[] = [
  {studentId: 3, courseId: 1, quizId: 1, score: 88, completedAt: "2024-08-05T14:30:00"},
  {studentId: 4, courseId: 1, quizId: 1, score: 95, completedAt: "2024-08-04T16:45:00"},
  {studentId: 5, courseId: 2, quizId: 2, score: 72, completedAt: "2024-08-06T10:15:00"},
  {studentId: 6, courseId: 1, quizId: 1, score: 82, completedAt: "2024-08-06T09:20:00"},
  {studentId: 7, courseId: 3, quizId: 3, score: 91, completedAt: "2024-08-05T11:45:00"},
  {studentId: 8, courseId: 4, quizId: 4, score: 76, completedAt: "2024-08-07T13:15:00"}
]

const quizDistributionData = [
  { range: '0-50%', students: 2 },
  { range: '51-60%', students: 5 },
  { range: '61-70%', students: 8 },
  { range: '71-80%', students: 12 },
  { range: '81-90%', students: 15 },
  { range: '91-100%', students: 8 },
]

export default function QuizAnalytics() {
  // Calculate metrics from quiz results
  const totalAttempts = quizResults.length
  const averageScore = Math.round(quizResults.reduce((sum, result) => sum + result.score, 0) / totalAttempts)
  const passRate = Math.round((quizResults.filter(result => result.score >= 70).length / totalAttempts) * 100)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Quiz Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Analyze quiz performance and completion rates
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="card p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Attempts</h3>
          <p className="text-3xl font-bold text-primary-600">{totalAttempts}</p>
        </div>
        <div className="card p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-primary-600">{averageScore}%</p>
        </div>
        <div className="card p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Pass Rate</h3>
          <p className="text-3xl font-bold text-primary-600">{passRate}%</p>
        </div>
      </div>

      {/* Quiz Performance Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Performance Distribution</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quizDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
