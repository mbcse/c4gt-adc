import React, { useState, useEffect, useCallback } from 'react';
import {
  Eye, Users, TrendingUp, Award, Clock, Loader2, AlertTriangle, RefreshCw, Download,
  Inbox,
  Printer
} from 'lucide-react';
import { useAdminAnalytics } from '@/admin/hooks/useAdminAnalytics';
import { AnalyticsFilters } from '@/api/adminAnalyticsAPI';
import AdminFilters from '@/admin/components/AdminFilters';
import CourseCompletionChart from '@/admin/components/charts/CourseCompletionChart';
import QuizScoresChart from '@/admin/components/charts/QuizScoresChart';
import EngagementMetricsChart from '@/admin/components/charts/EngagementMetricsChart';
import { debounce } from 'lodash';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/student/components/ui/button';
import { useApi } from '@/api';

const AdminAnalyticsDashboard: React.FC = () => {
  const api = useApi();
  const {
    dashboardData,
    filterOptions,
    loading,
    error,
    fetchDashboardData,
    clearError
  } = useAdminAnalytics();

  const [filters, setFilters] = useState<AnalyticsFilters>({ timeframe: 'weekly' });
  const [activeTab, setActiveTab] = useState<'overview' | 'completion' | 'quiz' | 'engagement' | 'consistency'>('overview');
  const [completionDimension, setCompletionDimension] = useState<'grade' | 'school' | 'block'>('grade');
  const [quizDimension, setQuizDimension] = useState<'grade' | 'school' | 'block' | 'course'>('grade');
  const [quizChartType, setQuizChartType] = useState<'bar' | 'line' | 'scatter'>('bar');

  const debouncedFetch = useCallback(debounce((f: AnalyticsFilters) => { fetchDashboardData(f); }, 500), [fetchDashboardData]);

  useEffect(() => {
    debouncedFetch(filters);
    return () => { debouncedFetch.cancel(); };
  }, [filters, debouncedFetch]);

  const handleFiltersChange = (newFilters: AnalyticsFilters) => { setFilters(newFilters); };
  const handleRefresh = () => { clearError(); fetchDashboardData(filters); };

  const courseCompletionRates = dashboardData?.courseCompletionRates;
  const quizScores = dashboardData?.quizScores;
  const engagementMetrics = dashboardData?.engagementMetrics;
  const consistencyRates = dashboardData?.consistencyRates;

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-12 px-6 bg-gray-50 rounded-lg">
      <Inbox className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No Data Available</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
  );

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading Analytics Dashboard...</p>
          <p className="text-sm text-gray-500">Please wait while we crunch the numbers.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center p-8 border border-red-200 rounded-lg bg-white shadow-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="mt-4 text-xl font-bold text-red-800">Oops! Something went wrong.</h2>
          <p className="mt-2 text-sm text-gray-600 max-w-sm">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen printable-area">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 no-print">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Analytics Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of student engagement and performance metrics.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Button onClick={handleRefresh} disabled={loading} variant="outline" size="icon">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <AdminFilters
          filterOptions={filterOptions}
          currentFilters={filters}
          onFiltersChange={handleFiltersChange}
          loading={loading}
        />

        {loading && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-3" />
              <span className="text-lg text-gray-700">Updating data...</span>
            </div>
          </div>
        )}

        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {dashboardData.courseCompletionRates.overall.totalStudents}
                  </div>
                  <div className="text-sm text-gray-500">Total Students</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {dashboardData.courseCompletionRates.overall.avgCompletionRate}%
                  </div>
                  <div className="text-sm text-gray-500">Avg Completion Rate</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {dashboardData.quizScores.overall.avgScore}%
                  </div>
                  <div className="text-sm text-gray-500">Avg Quiz Score</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {dashboardData.engagementMetrics.totalWatchHours}h
                  </div>
                  <div className="text-sm text-gray-500">Total Watch Hours</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 no-print">
          <div className="border-b border-gray-200 overflow-x-auto whitespace-nowrap">
            <nav className="-mb-px flex space-x-4 sm:space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: Eye },
                { id: 'completion', name: 'Course Completion', icon: TrendingUp },
                { id: 'quiz', name: 'Quiz Performance', icon: Award },
                { id: 'engagement', name: 'Engagement', icon: Users },
                { id: 'consistency', name: 'Consistency', icon: Clock }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center px-1 py-2 border-b-2 text-sm font-medium transition-colors ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'overview' && dashboardData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Course Completion</h3>
                {dashboardData.courseCompletionRates.overall && (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Completed', value: dashboardData.courseCompletionRates.overall.completedCourses },
                          { name: 'In-Progress', value: dashboardData.courseCompletionRates.overall.totalEnrollments - dashboardData.courseCompletionRates.overall.completedCourses }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#10B981" />
                        <Cell fill="#F59E0B" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Quiz Performance</h3>
                {dashboardData.quizScores.overall && (
                  <div className="flex flex-col justify-center items-center h-full text-center">
                    <div className="text-5xl font-bold text-blue-600">
                      {dashboardData.quizScores.overall.avgScore}%
                    </div>
                    <div className="text-md text-gray-600 mt-2">Average Quiz Score</div>
                    <div className="mt-6 text-sm text-gray-500">
                      Based on {dashboardData.quizScores.overall.totalAttempts} attempts
                    </div>
                  </div>
                )}
              </div>
              <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
                <EngagementMetricsChart
                  data={dashboardData.engagementMetrics}
                  loading={loading}
                />
              </div>
            </div>
          )}
          {activeTab === 'completion' && courseCompletionRates && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Course Completion Analysis</h3>
                <div className="flex items-center space-x-3 self-start sm:self-center">
                  <label className="text-sm font-medium text-gray-700">View by:</label>
                  <select
                    value={completionDimension}
                    onChange={(e) => setCompletionDimension(e.target.value as any)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="grade">Grade</option>
                    <option value="school">School</option>
                    <option value="block">Block</option>
                  </select>
                </div>
              </div>
              <CourseCompletionChart
                data={courseCompletionRates[`by${completionDimension.charAt(0).toUpperCase() + completionDimension.slice(1)}`]}
                dimension={completionDimension}
                loading={loading}
                overall={courseCompletionRates.overall}
              />
            </div>
          )}

          {activeTab === 'quiz' && quizScores && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Quiz Performance Analysis</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">View by:</label>
                    <select
                      value={quizDimension}
                      onChange={(e) => setQuizDimension(e.target.value as any)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="grade">Grade</option>
                      <option value="school">School</option>
                      <option value="block">Block</option>
                      <option value="course">Course</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Chart:</label>
                    <select
                      value={quizChartType}
                      onChange={(e) => setQuizChartType(e.target.value as any)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="bar">Bar Chart</option>
                      <option value="line">Line Chart</option>
                      <option value="scatter">Scatter Plot</option>
                    </select>
                  </div>
                </div>
              </div>
              <QuizScoresChart
                data={quizScores[`by${quizDimension.charAt(0).toUpperCase() + quizDimension.slice(1)}` as keyof typeof quizScores] as any}
                dimension={quizDimension}
                chartType={quizChartType}
                loading={loading}
              />
            </div>
          )}

          {activeTab === 'engagement' && engagementMetrics && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Engagement Analysis</h3>
              <EngagementMetricsChart
                data={engagementMetrics}
                loading={loading}
              />
            </div>
          )}

          {activeTab === 'consistency' && consistencyRates && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Consistency Analysis</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {consistencyRates.overall.avgConsistencyRate}%
                  </div>
                  <div className="text-sm text-blue-700">Average Consistency</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {consistencyRates.overall.highConsistencyStudents}
                  </div>
                  <div className="text-sm text-green-700">High Consistency Students</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {consistencyRates.overall.highConsistencyPercentage}%
                  </div>
                  <div className="text-sm text-purple-700">High Consistency Rate</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">By Grade</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-2 sm:px-3 py-2 text-left font-medium text-gray-700">Grade</th>
                          <th className="px-2 sm:px-3 py-2 text-center font-medium text-gray-700">Avg %</th>
                          <th className="px-2 sm:px-3 py-2 text-center font-medium text-gray-700">High</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consistencyRates.byGrade.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="px-2 sm:px-3 py-2 font-medium text-gray-900">Grade {item.grade}</td>
                            <td className="px-2 sm:px-3 py-2 text-center">
                              <span className={`font-medium ${item.avgConsistencyRate >= 70 ? 'text-green-600' :
                                  item.avgConsistencyRate >= 50 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                {item.avgConsistencyRate}%
                              </span>
                            </td>
                            <td className="px-2 sm:px-3 py-2 text-center text-gray-700">{item.highConsistencyStudents}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">By School</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-2 sm:px-3 py-2 text-left font-medium text-gray-700">School</th>
                          <th className="px-2 sm:px-3 py-2 text-center font-medium text-gray-700">Avg %</th>
                          <th className="px-2 sm:px-3 py-2 text-center font-medium text-gray-700">High</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consistencyRates.bySchool.slice(0, 5).map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="px-2 sm:px-3 py-2 font-medium text-gray-900 max-w-[120px] sm:max-w-xs truncate">{item.school}</td>
                            <td className="px-2 sm:px-3 py-2 text-center">
                              <span className={`font-medium ${item.avgConsistencyRate >= 70 ? 'text-green-600' :
                                  item.avgConsistencyRate >= 50 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                {item.avgConsistencyRate}%
                              </span>
                            </td>
                            <td className="px-2 sm:px-3 py-2 text-center text-gray-700">{item.highConsistencyStudents}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">By Block</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-2 sm:px-3 py-2 text-left font-medium text-gray-700">Block</th>
                          <th className="px-2 sm:px-3 py-2 text-center font-medium text-gray-700">Avg %</th>
                          <th className="px-2 sm:px-3 py-2 text-center font-medium text-gray-700">High</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consistencyRates.byBlock.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="px-2 sm:px-3 py-2 font-medium text-gray-900 max-w-[120px] sm:max-w-xs truncate">{item.block}</td>
                            <td className="px-2 sm:px-3 py-2 text-center">
                              <span className={`font-medium ${item.avgConsistencyRate >= 70 ? 'text-green-600' :
                                  item.avgConsistencyRate >= 50 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                {item.avgConsistencyRate}%
                              </span>
                            </td>
                            <td className="px-2 sm:px-3 py-2 text-center text-gray-700">{item.highConsistencyStudents}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {filters.studentId && filterOptions && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 no-print">
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">
                Currently viewing data for: {filterOptions.students.find(s => s.id === filters.studentId)?.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalyticsDashboard;