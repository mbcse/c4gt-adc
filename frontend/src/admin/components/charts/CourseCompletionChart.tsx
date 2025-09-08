import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { CompletionRateData, CourseCompletionRates } from '@/api/adminAnalyticsAPI';
import { Inbox } from 'lucide-react';

interface CourseCompletionChartProps {
  data: CompletionRateData[];
  overall: CourseCompletionRates['overall'];
  dimension: 'grade' | 'school' | 'district';
  loading?: boolean;
}

const CourseCompletionChart: React.FC<CourseCompletionChartProps> = ({
  data,
  overall,
  dimension,
  loading = false
}) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-blue-600">
              <span className="font-medium">Avg Completion Rate:</span> {dataPoint.avgCompletionRate}%
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Students:</span> {dataPoint.studentCount}
            </p>
            <p className="text-green-600">
              <span className="font-medium">Courses Completed:</span> {dataPoint.completedCourses}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">Loading completion rates...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center text-gray-500">
          <Inbox className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Completion Data</h3>
          <p className="mt-1 text-sm text-gray-500">No completion data found for the selected filters.</p>
        </div>
      </div>
    );
  }

  const getLabel = (item: CompletionRateData): string => {
    switch (dimension) {
      case 'grade': return `Grade ${item.grade || 'N/A'}`;
      case 'school': return item.school || 'Unknown School';
      case 'district': return item.district || 'Unknown District';
      default: return 'Unknown';
    }
  };

  const chartData = data.map((item, index) => ({
    ...item,
    name: getLabel(item),
    completionRate: item.avgCompletionRate,
    color: COLORS[index % COLORS.length]
  }));

  const useBarChart = data.length > 5;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{overall.avgCompletionRate}%</div>
          <div className="text-sm text-blue-700 mt-1">Overall Completion</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-green-600">{overall.totalStudents}</div>
          <div className="text-sm text-green-700 mt-1">Total Students</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">{overall.completedCourses}</div>
          <div className="text-sm text-purple-700 mt-1">Courses Completed</div>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {useBarChart ? (
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completionRate" name="Avg. Completion" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="completionRate"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

          <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-t border-gray-200">
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                {dimension.charAt(0).toUpperCase() + dimension.slice(1)}
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">Students</th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">Avg Completion</th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">Courses Completed</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">{getLabel(item)}</td>
                <td className="px-4 py-2 text-center text-gray-700">{item.studentCount}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`font-medium px-2 py-1 rounded-md ${
                    item.avgCompletionRate >= 80 ? 'bg-green-100 text-green-700' :
                    item.avgCompletionRate >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.avgCompletionRate}%
                  </span>
                </td>
                <td className="px-4 py-2 text-center text-gray-700">{item.completedCourses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseCompletionChart;