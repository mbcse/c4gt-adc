import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter
} from 'recharts';
import { QuizScoreData } from '@/api/adminAnalyticsAPI';

interface QuizScoresChartProps {
  data: QuizScoreData[];
  dimension: 'grade' | 'school' | 'block' | 'course' | 'video';
  chartType?: 'bar' | 'line' | 'scatter';
  loading?: boolean;
}

const QuizScoresChart: React.FC<QuizScoresChartProps> = ({
  data,
  dimension,
  chartType = 'bar',
  loading = false
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-blue-600">
              <span className="font-medium">Avg Score:</span> {data.avgScore}%
            </p>
            <p className="text-green-600">
              <span className="font-medium">Total Attempts:</span> {data.attemptCount}
            </p>
            <p className="text-purple-600">
              <span className="font-medium">Perfect Scores:</span> {data.perfectScores}
            </p>
            {data.perfectScores > 0 && (
              <p className="text-orange-600">
                <span className="font-medium">Perfect Rate:</span> {Math.round((data.perfectScores / data.attemptCount) * 100)}%
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading quiz scores...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-lg mb-2">No quiz score data available</div>
          <div className="text-sm">Try adjusting your filters</div>
        </div>
      </div>
    );
  }

  const getLabel = (item: QuizScoreData) => {
    if (dimension === 'grade') return `Grade ${item.grade}`;
    if (dimension === 'school') return item.school;
    if (dimension === 'block') return item.block;
    if (dimension === 'course') return item.courseTitle;
    if (dimension === 'video') return item.videoTitle;
    return 'Unknown';
  };

  const chartData = data.map((item, index) => ({
    ...item,
    name: getLabel(item),
    score: item.avgScore,
    attempts: item.attemptCount,
    perfectRate: item.attemptCount > 0 ? Math.round((item.perfectScores / item.attemptCount) * 100) : 0
  }));

  const sortedData = [...chartData].sort((a, b) => b.score - a.score);

  const renderChart = () => {
    const commonProps = {
      data: sortedData,
      margin: { top: 20, right: 30, left: 20, bottom: 60 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              domain={[0, 100]}
              label={{ value: 'Average Score (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8 }}
              name="Average Score"
            />
          </LineChart>
        );

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="attempts"
              name="Attempts"
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              label={{ value: 'Total Attempts', position: 'insideBottom', offset: -10 }}
            />
            <YAxis
              dataKey="score"
              name="Score"
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              domain={[0, 100]}
              label={{ value: 'Average Score (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter dataKey="score" fill="#3B82F6" />
          </ScatterChart>
        );

      default: // bar chart
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              domain={[0, 100]}
              label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="score"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              stroke="#2563EB"
              strokeWidth={1}
              name="Average Score"
            />
            <Bar
              dataKey="perfectRate"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              stroke="#059669"
              strokeWidth={1}
              name="Perfect Score Rate"
            />
          </BarChart>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(data.reduce((sum, item) => sum + item.avgScore, 0) / data.length)}%
          </div>
          <div className="text-sm text-blue-700">Overall Avg Score</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {data.reduce((sum, item) => sum + item.attemptCount, 0)}
          </div>
          <div className="text-sm text-green-700">Total Attempts</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {data.reduce((sum, item) => sum + item.perfectScores, 0)}
          </div>
          <div className="text-sm text-purple-700">Perfect Scores</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round((data.reduce((sum, item) => sum + item.perfectScores, 0) / data.reduce((sum, item) => sum + item.attemptCount, 0)) * 100) || 0}%
          </div>
          <div className="text-sm text-orange-700">Perfect Rate</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Performance insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Performers */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3">Top Performers</h4>
          <div className="space-y-2">
            {sortedData.slice(0, 3).map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-green-700 font-medium truncate">{item.name}</span>
                <span className="text-green-800 font-bold">{item.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-3">Needs Attention</h4>
          <div className="space-y-2">
            {sortedData.slice(-3).reverse().map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-red-700 font-medium truncate">{item.name}</span>
                <span className="text-red-800 font-bold">{item.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed data table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-t border-gray-200">
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                {dimension === 'grade' ? 'Grade' :
                  dimension === 'school' ? 'School' :
                    dimension === 'block' ? 'Block' :
                      dimension === 'course' ? 'Course' : 'Video'}
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">Avg Score</th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">Attempts</th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">Perfect Scores</th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">Perfect Rate</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900 truncate max-w-48">
                  {item.name}
                </td>
                <td className="px-4 py-2 text-center">
                  <span className={`font-medium ${item.score >= 85 ? 'text-green-600' :
                      item.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                    {item.score}%
                  </span>
                </td>
                <td className="px-4 py-2 text-center text-gray-700">{item.attempts}</td>
                <td className="px-4 py-2 text-center text-purple-600 font-medium">{item.perfectScores}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`font-medium ${item.perfectRate >= 20 ? 'text-green-600' :
                      item.perfectRate >= 10 ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                    {item.perfectRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizScoresChart;