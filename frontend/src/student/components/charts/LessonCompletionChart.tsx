import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { LessonCompletionPattern } from '@/api/analyticsAPI';

interface LessonCompletionChartProps {
  data: LessonCompletionPattern[];
}

const LessonCompletionChart: React.FC<LessonCompletionChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg border-emerald-200">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          <p className="text-emerald-600 font-semibold">
            📚 Lessons: {payload[0]?.value}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {payload[0]?.value > 5 ? 'Productive period!' : payload[0]?.value > 0 ? 'Making progress!' : 'No completions'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
        <XAxis
          dataKey="period"
          stroke="#64748b"
          fontSize={12}
          tick={{ fill: '#64748b' }}
        />
        <YAxis
          stroke="#64748b"
          fontSize={12}
          label={{ value: 'Lessons', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          tick={{ fill: '#64748b' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="lessons"
          fill="url(#lessonGradient)"
          radius={[4, 4, 0, 0]}
          stroke="#047857"
          strokeWidth={0.5}
        />
        <defs>
          <linearGradient id="lessonGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#047857" stopOpacity={0.7} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LessonCompletionChart;
