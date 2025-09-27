import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { QuizAnalytics } from '@/api/analyticsAPI';

interface QuizPerformanceChartProps {
  data: QuizAnalytics['performanceTrend'];
}

const QuizPerformanceChart: React.FC<QuizPerformanceChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg max-w-xs">
          <p className="font-medium">{label}</p>
          <p style={{ color: payload.color }}>
            Score: {payload.value}%
          </p>
          <p className="text-sm text-gray-600 truncate">
            Quiz: {data.quizTitle}
          </p>
          <p className="text-sm text-gray-600 truncate">
            Course: {data.courseTitle}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="date"
          stroke="#64748b"
          fontSize={12}
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default QuizPerformanceChart;