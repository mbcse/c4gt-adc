import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { useStudentAnalytics } from '@/student/hooks/useStudentAnalytics';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const CourseProgressChart: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const {
    availableCourses,
    courseVideoProgress,
    fetchCourseVideoProgress,
    loading
  } = useStudentAnalytics();

  useEffect(() => {
    if (availableCourses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(availableCourses[0].id);
    }
  }, [availableCourses, selectedCourseId]);

  useEffect(() => {
    if (selectedCourseId) {
      fetchCourseVideoProgress(selectedCourseId);
    }
  }, [selectedCourseId, fetchCourseVideoProgress]);

  if (loading || !courseVideoProgress) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
          <p className="text-sm">Loading course progress...</p>
        </div>
      </div>
    );
  }

  const chartData = [
    {
      name: 'Completed',
      value: courseVideoProgress.completedVideos,
      color: COLORS[0],
      percentage: Math.round((courseVideoProgress.completedVideos / courseVideoProgress.totalVideos) * 100) || 0
    },
    {
      name: 'In Progress',
      value: courseVideoProgress.inProgressVideos,
      color: COLORS[1],
      percentage: Math.round((courseVideoProgress.inProgressVideos / courseVideoProgress.totalVideos) * 100) || 0
    },
    {
      name: 'Not Started',
      value: courseVideoProgress.notStartedVideos,
      color: COLORS[2],
      percentage: Math.round((courseVideoProgress.notStartedVideos / courseVideoProgress.totalVideos) * 100) || 0
    }
  ].filter(item => item.value > 0); 

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg border-green-200">
          <p className="font-medium text-gray-900">{entry.name}</p>
          <p style={{ color: entry.color }} className="font-semibold">
            Videos: {entry.value} ({entry.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; 

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-4">
      {/* Course Selection */}
      <div>
        <label className="block text-sm font-medium text-green-700 mb-2">
          Select Course
        </label>
        <select
          value={selectedCourseId || ''}
          onChange={(e) => setSelectedCourseId(Number(e.target.value))}
          className="w-full p-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
        >
          <option value="">Select a course...</option>
          {availableCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {courseVideoProgress && (
        <>
          {/* Course Summary Stats */}
          <div className="bg-green-50 rounded-lg p-3">
            <h4 className="font-semibold text-green-800 mb-2">{courseVideoProgress.course.title}</h4>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div className="bg-white rounded p-2">
                <div className="font-bold text-gray-800">{courseVideoProgress.totalVideos}</div>
                <div className="text-gray-600 text-xs">Total lessons</div>
              </div>
              <div className="bg-green-100 rounded p-2">
                <div className="font-bold text-green-700">{courseVideoProgress.completedVideos}</div>
                <div className="text-gray-600 text-xs">Completed lessons</div>
              </div>
              <div className="bg-yellow-100 rounded p-2">
                <div className="font-bold text-yellow-700">{courseVideoProgress.inProgressVideos}</div>
                <div className="text-gray-600 text-xs">In Progress</div>
              </div>
              <div className="bg-red-100 rounded p-2">
                <div className="font-bold text-red-700">{courseVideoProgress.notStartedVideos}</div>
                <div className="text-gray-600 text-xs">Not Started</div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                formatter={(value, entry: any) => `${value} (${entry.payload.value})`}
              />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default CourseProgressChart;
