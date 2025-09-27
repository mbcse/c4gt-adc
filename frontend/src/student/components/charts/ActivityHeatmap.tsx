import React from 'react';
import { ActivityCalendarDay } from '@/api/analyticsAPI';

interface ActivityHeatmapProps {
  data: ActivityCalendarDay[];
  year?: number;
}

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const CELL_SIZE = 'clamp(12px, 1.8vw, 20px)';
const CELL_GAP = 'clamp(2px, 1vw, 6px)';
const WEEKDAY_LABEL_WIDTH = 32;

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  data,
  year = new Date().getFullYear(),
}) => {
  const activityMap = new Map(data.map(d => [d.date, d]));
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  // Generate days of year
  const allDays: Date[] = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    allDays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const firstDayOfWeek = (startDate.getDay() + 6) % 7;
  const totalWeeks = Math.ceil((allDays.length + firstDayOfWeek) / 7);

  const monthLabelPositions = MONTH_LABELS.map((month, monthIndex) => {
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const dayOfYear = Math.floor(
      (firstDayOfMonth.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24)
    );
    const weekIndex = Math.floor((dayOfYear + firstDayOfWeek) / 7);
    return { month, weekIndex };
  });

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-gray-100 border-gray-200/50';
      case 1: return 'bg-green-200 border-green-300/50';
      case 2: return 'bg-green-400 border-green-500/50';
      case 3: return 'bg-green-500 border-green-600/50';
      case 4: return 'bg-green-600 border-green-700/50';
      default: return 'bg-gray-100 border-gray-200/50';
    }
  };

  return (
    <div className="inline-block p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Month Labels */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${totalWeeks}, ${CELL_SIZE})`,
        gap: CELL_GAP,
        overflowX: 'auto',
        minWidth: 'max-content',
        marginLeft: WEEKDAY_LABEL_WIDTH
      }}>
        {monthLabelPositions.map(({ month, weekIndex }, index) => {
          const prevWeekIndex =
            index > 0 ? monthLabelPositions[index - 1].weekIndex : -5;
          if (weekIndex - prevWeekIndex < 4) return null;
          return (
            <div
              key={month}
              className="text-xs text-gray-500"
              style={{ gridColumnStart: weekIndex + 1, whiteSpace: 'nowrap', textAlign: 'center' }}
            >
              {month}
            </div>
          );
        })}
      </div>

      {/* Heatmap grid and weekday labels */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', minWidth: 'max-content' }}>
        {/* Weekday labels */}
        <div
          className="flex flex-col justify-between text-xs text-gray-500 py-0.5"
          style={{
            height: `calc(7 * ${CELL_SIZE} + 6 * ${CELL_GAP})`,
            width: WEEKDAY_LABEL_WIDTH,
            flexShrink: 0,
          }}
        >
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Heatmap grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${totalWeeks}, ${CELL_SIZE})`,
            gridTemplateRows: `repeat(7, ${CELL_SIZE})`,
            gap: CELL_GAP,
            gridAutoFlow: 'column',
            minWidth: 'max-content',
            flexShrink: 0
          }}
        >
          {/* Empty divs for first day offset */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {allDays.map(day => {
            const dateStr = day.toISOString().split('T')[0];
            const activity = activityMap.get(dateStr);
            const intensity = activity ? activity.intensity : 0;
            const tooltip = activity
              ? `${dateStr}: ${activity.studyTime.toFixed(1)}h, ${activity.lessons} lessons`
              : `${dateStr}: No activity`;
            return (
              <div
                key={dateStr}
                className={`rounded-sm border ${getIntensityColor(intensity)}`}
                title={tooltip}
                style={{
                  minWidth: CELL_SIZE,
                  minHeight: CELL_SIZE,
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end space-x-2 text-xs text-gray-500 mt-4">
        <span>Less</span>
        <div className="flex gap-x-1">
          {[0, 1, 2, 3, 4].map(intensity => (
            <div
              key={intensity}
              className={`rounded-sm border ${getIntensityColor(intensity)}`}
              style={{
                width: '18px',
                height: '18px',
                minWidth: '14px',
                minHeight: '14px'
              }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
