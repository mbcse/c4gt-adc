import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { EngagementMetrics } from '@/api/adminAnalyticsAPI';
import { Users, Clock, Play, TrendingUp, Inbox, BookOpen } from 'lucide-react';

interface EngagementMetricsChartProps {
  data: EngagementMetrics | null;
  loading?: boolean;
}

const EngagementMetricsChart: React.FC<EngagementMetricsChartProps> = ({
  data,
  loading = false
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.stroke || entry.fill }}>
                <span className="font-medium">{entry.name}:</span> {entry.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Loading state placeholder
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">Loading engagement data...</p>
        </div>
      </div>
    );
  }

  // Empty state when no data is returned from the API
  if (!data) {
    return (
      <div className="text-center py-12 px-6 bg-gray-50 rounded-lg">
        <Inbox className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No Engagement Data</h3>
        <p className="mt-1 text-sm text-gray-500">No student engagement data was found for the selected filters.</p>
      </div>
    );
  }

  // Prepare data for the popular courses chart
  const topCourses = data.courseEnrollmentStats
    .sort((a, b) => b.totalEnrollments - a.totalEnrollments)
    .slice(0, 5); // Get top 5

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <h5 className="font-semibold text-blue-800 mb-2 flex items-center"><Users className="h-4 w-4 mr-2" /> Student Activity</h5>
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {data.activeStudentsPercentage}%
          </div>
          <div className="text-sm text-blue-700">
            {data.activeStudentsCount} of {data.totalStudentsCount} students are actively learning.
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
          <h5 className="font-semibold text-green-800 mb-2 flex items-center"><Clock className="h-4 w-4 mr-2" /> Session Quality</h5>
          <div className="text-3xl font-bold text-green-600 mb-1">
            {data.avgSessionDuration}
            <span className="text-lg ml-1">min</span>
          </div>
          <div className="text-sm text-green-700">
            Is the average session duration.
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
          <h5 className="font-semibold text-purple-800 mb-2 flex items-center"><Play className="h-4 w-4 mr-2" /> Content Consumption</h5>
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {data.totalWatchHours}
            <span className="text-lg ml-1">hrs</span>
          </div>
          <div className="text-sm text-purple-700">
            Total watch time across all students.
          </div>
        </div>
      </div>
      
      {/* --- Active Students Trend Chart --- */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-gray-600" />
          Active Students Trend
        </h4>
        {data.activeStudentsTrend && data.activeStudentsTrend.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.activeStudentsTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" height={50} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" name="Active Students" stroke="#3B82F6" fill="#BFDBFE" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
            No trend data available for the selected period.
          </div>
        )}
      </div>

      {/* --- Most Popular Courses Chart --- */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-gray-600" />
          Most Popular Courses
        </h4>
        {topCourses.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCourses} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis 
                  dataKey="courseTitle" 
                  type="category" 
                  width={150}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.length > 20 ? `${value.substring(0, 20)}...` : value}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="totalEnrollments" name="Total Enrollments" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
            <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
              No course enrollment data found.
            </div>
        )}
      </div>
    </div>
  );
};

export default EngagementMetricsChart;

