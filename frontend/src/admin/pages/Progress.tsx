import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { ProgressData } from '../types'

// Progress page data
const progressData: ProgressData[] = [
  {studentId: 3, courseId: 1, progress: 85, timeSpent: 120, lastAccessed: "2024-08-07"},
  {studentId: 4, courseId: 1, progress: 92, timeSpent: 140, lastAccessed: "2024-08-06"},
  {studentId: 5, courseId: 2, progress: 45, timeSpent: 80, lastAccessed: "2024-08-07"},
  {studentId: 6, courseId: 1, progress: 76, timeSpent: 110, lastAccessed: "2024-08-07"},
  {studentId: 6, courseId: 2, progress: 68, timeSpent: 95, lastAccessed: "2024-08-06"},
  {studentId: 7, courseId: 3, progress: 88, timeSpent: 155, lastAccessed: "2024-08-06"},
  {studentId: 8, courseId: 4, progress: 62, timeSpent: 85, lastAccessed: "2024-08-07"}
]

const heatmapData = progressData.map(item => ({
  courseId: item.courseId,
  studentId: item.studentId,
  progress: item.progress
}))

const timelineData = [
  { week: 'Week 1', progress: 15 },
  { week: 'Week 2', progress: 32 },
  { week: 'Week 3', progress: 48 },
  { week: 'Week 4', progress: 62 },
  { week: 'Week 5', progress: 71 },
  { week: 'Week 6', progress: 78 },
]

export default function Progress() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Progress Tracker
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor student progress across all courses
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Progress Heatmap */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Heatmap</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={heatmapData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="courseId" name="Course ID" />
                <YAxis dataKey="studentId" name="Student ID" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter dataKey="progress" fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Timeline</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
