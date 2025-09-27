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
import { StudyTimePattern } from '@/api/analyticsAPI';

interface StudyTimeChartProps {
  data: StudyTimePattern[];
}

const StudyTimeChart: React.FC<StudyTimeChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg border-blue-200">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          <p className="text-blue-600 font-semibold">
            ⏰ Study Time: {payload[0]?.value}h
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {payload[0]?.value > 2 ? 'Great session!' : payload[0]?.value > 0 ? 'Keep going!' : 'No activity'}
          </p>
        </div>
      );
    }
    return null;
  };

  const maxValue = Math.max(...data.map(d => d.studyTime), 1);

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
          label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          tick={{ fill: '#64748b' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="studyTime"
          fill="url(#studyGradient)"
          radius={[4, 4, 0, 0]}
          stroke="#1e40af"
          strokeWidth={0.5}
        />
        <defs>
          <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#1e40af" stopOpacity={0.7} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StudyTimeChart;
