import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { DetailedQuizPerformance } from '@/api/analyticsAPI';
import { Brain } from 'lucide-react';

interface QuizScoresChartProps {
  data: DetailedQuizPerformance[];
  type?: 'line' | 'bar';
}

const QuizScoresChart: React.FC<QuizScoresChartProps> = ({ data, type = 'line' }) => {
  // Prepare data for timeline view (all attempts)
  const timelineData = data
    .flatMap(quiz => 
      quiz.attempts.map(attempt => ({
        quiz: quiz.title.substring(0, 20) + (quiz.title.length > 20 ? '...' : ''),
        fullTitle: quiz.title, 
        score: attempt.score,
        date: attempt.date,
        attemptNumber: attempt.attemptNumber,
      }))
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item, index) => ({ ...item, index: index + 1 }));

  // Prepare data for quiz summary view
  const summaryData = data.map(quiz => ({
    quiz: quiz.title.substring(0, 20) + (quiz.title.length > 20 ? '...' : ''),
    fullTitle: quiz.title,
    latest: quiz.latestScore,
    best: quiz.bestScore,
    average: quiz.averageScore,
    attempts: quiz.attemptCount,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const entryData = payload[0].payload; 
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg max-w-xs">
          <p className="font-medium text-gray-900 mb-1 break-words">{entryData.fullTitle || label}</p>
          
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-medium text-sm">
              {`${entry.name}: ${entry.value}${entry.dataKey === 'attempts' ? '' : '%'}`}
            </p>
          ))}
          <p className="text-xs text-gray-500 mt-1">Attempts: {entryData.attempts}</p>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500">
        <div className="text-center">
          <Brain className="h-8 w-8 mx-auto mb-2" />
          <p className="font-medium">No quiz data to display</p>
          <p className="text-sm">No quizzes found for this filter.</p>
        </div>
      </div>
    );
  }

  if (type === 'line' && timelineData.length > 0) {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="index" 
            stroke="#64748b"
            fontSize={12}
            label={{ value: 'Attempt #', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12}
            domain={[0, 100]}
            label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // Bar chart return
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={summaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="quiz" 
          stroke="#64748b"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke="#64748b" 
          fontSize={12}
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="latest" name="Latest Score" fill="#3b82f6" radius={[2, 2, 0, 0]} />
        <Bar dataKey="best" name="Best Score" fill="#10b981" radius={[2, 2, 0, 0]} />
        <Bar dataKey="average" name="Average Score" fill="#f59e0b" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default QuizScoresChart;