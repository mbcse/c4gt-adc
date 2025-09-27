import { Users, BookOpen, TrendingUp, Trophy, Plus, UserPlus, Download, Bell, BarChart2 } from 'lucide-react'
import MetricCard from '../components/MetricCard'
import RecentActivity from '../components/RecentActivity'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Metrics, Activity } from '../types'
import { useNavigate } from "react-router-dom";

// Dashboard-specific data
const metrics: Metrics = {
  totalStudents: 156,
  activeCourses: 12,
  completionRate: 78,
  avgQuizScore: 85,
  totalWatchHours: 2340,
  newEnrollments: 23
}

const recentActivity: Activity[] = [
  // {type: "enrollment", message: "5 new students enrolled in Web Development", timestamp: "2024-08-07T09:30:00", icon: "UserPlus", color: "bg-blue-100 text-blue-600"},
  // {type: "completion", message: "Lisa completed React.js Advanced course", timestamp: "2024-08-06T15:20:00", icon: "CheckCircle", color: "bg-green-100 text-green-600"},
  // {type: "quiz", message: "Tom scored 88% on Database Design quiz", timestamp: "2024-08-07T11:10:00", icon: "Trophy", color: "bg-yellow-100 text-yellow-600"},
  // {type: "course", message: "New course 'Python for Beginners' was added", timestamp: "2024-08-06T12:15:00", icon: "Book", color: "bg-purple-100 text-purple-600"},
  // {type: "assignment", message: "Database Design assigned to 15 students", timestamp: "2024-08-05T14:30:00", icon: "ClipboardList", color: "bg-orange-100 text-orange-600"}
]

const chartData = [
  { name: 'Web Dev', completion: 85 },
  { name: 'React.js', completion: 72 },
  { name: 'Database', completion: 88 },
  { name: 'Python', completion: 65 },
  { name: 'UI/UX', completion: 79 },
]

const progressData = [
  { name: 'Completed', value: 78, color: '#10b981' },
  { name: 'In Progress', value: 15, color: '#f59e0b' },
  { name: 'Not Started', value: 7, color: '#ef4444' },
]

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your course performance and student progress
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Students"
          value={metrics.totalStudents}
          change="+23 this month"
          changeType="positive"
          icon={Users}
          iconColor="bg-blue-500"
        />
        <MetricCard
          title="Active Courses"
          value={metrics.activeCourses}
          change="+2 this month"
          changeType="positive"
          icon={BookOpen}
          iconColor="bg-green-500"
        />
        <MetricCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          change="+5% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-yellow-500"
        />
        <MetricCard
          title="Avg Quiz Score"
          value={`${metrics.avgQuizScore}%`}
          change="+3% improvement"
          changeType="positive"
          icon={Trophy}
          iconColor="bg-purple-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Progress Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Progress Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            {progressData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Completion Rates</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completion" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivity} />
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              className="btn btn-primary w-full justify-start"
              onClick={() => navigate('/admin/courses')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Manage Courses
            </button>
            <button
              className="btn btn-secondary w-full justify-start"
              onClick={() => navigate('/admin/users')}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Manage Users
            </button>
            <button
              className="btn btn-outline w-full justify-start"
              onClick={() => navigate('/admin/reports')}
            >
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
            <button
              className="btn btn-outline w-full justify-start"
              onClick={() => navigate('/admin/progress')}
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              View Detailed Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
