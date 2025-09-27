import { useState, useCallback, useEffect } from 'react';
import {
  adminAnalyticsAPI,
  FilterOptions,
  AnalyticsFilters,
  CourseCompletionRates,
  QuizScores,
  EngagementMetrics,
  ConsistencyRates,
  IndividualStudentAnalytics,
  DashboardData
} from '@/api/adminAnalyticsAPI';
import { useApi } from '@/api/index';

interface UseAdminAnalyticsReturn {
  // Data
  dashboardData: DashboardData | null;
  courseCompletionRates: CourseCompletionRates | null;
  quizScores: QuizScores | null;
  engagementMetrics: EngagementMetrics | null;
  consistencyRates: ConsistencyRates | null;
  individualStudentData: IndividualStudentAnalytics | null;
  filterOptions: FilterOptions | null;
  
  // Loading states
  loading: boolean;
  dashboardLoading: boolean;
  completionRatesLoading: boolean;
  quizScoresLoading: boolean;
  engagementLoading: boolean;
  consistencyLoading: boolean;
  individualStudentLoading: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  fetchDashboardData: (filters?: AnalyticsFilters) => Promise<void>;
  fetchCourseCompletionRates: (filters?: AnalyticsFilters) => Promise<void>;
  fetchQuizScores: (filters?: AnalyticsFilters) => Promise<void>;
  fetchEngagementMetrics: (filters?: AnalyticsFilters) => Promise<void>;
  fetchConsistencyRates: (filters?: AnalyticsFilters) => Promise<void>;
  fetchIndividualStudentAnalytics: (studentId: number, filters?: Omit<AnalyticsFilters, 'studentId'>) => Promise<void>;
  fetchFilterOptions: () => Promise<void>;
  clearError: () => void;
}

export function useAdminAnalytics(): UseAdminAnalyticsReturn {
  const api = useApi();
  // Data state
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [courseCompletionRates, setCourseCompletionRates] = useState<CourseCompletionRates | null>(null);
  const [quizScores, setQuizScores] = useState<QuizScores | null>(null);
  const [engagementMetrics, setEngagementMetrics] = useState<EngagementMetrics | null>(null);
  const [consistencyRates, setConsistencyRates] = useState<ConsistencyRates | null>(null);
  const [individualStudentData, setIndividualStudentData] = useState<IndividualStudentAnalytics | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [completionRatesLoading, setCompletionRatesLoading] = useState(false);
  const [quizScoresLoading, setQuizScoresLoading] = useState(false);
  const [engagementLoading, setEngagementLoading] = useState(false);
  const [consistencyLoading, setConsistencyLoading] = useState(false);
  const [individualStudentLoading, setIndividualStudentLoading] = useState(false);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Generic error handler
  const handleError = useCallback((error: any, context: string) => {
    console.error(`Error in ${context}:`, error);
    setError(`Failed to ${context}. Please try again.`);
  }, []);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async (filters: AnalyticsFilters = {}) => {
    setDashboardLoading(true);
    setError(null);
    
    try {
      const data = await adminAnalyticsAPI.getDashboardData(api,filters);
      setDashboardData(data);
      
      // Also set individual data pieces
      setCourseCompletionRates(data.courseCompletionRates);
      setQuizScores(data.quizScores);
      setEngagementMetrics(data.engagementMetrics);
      setConsistencyRates(data.consistencyRates);
      setFilterOptions(data.filterOptions);
    } catch (err) {
      handleError(err, 'load dashboard data');
    } finally {
      setDashboardLoading(false);
    }
  }, [api, handleError]);

  // Fetch course completion rates
  const fetchCourseCompletionRates = useCallback(async (filters: AnalyticsFilters = {}) => {
    setCompletionRatesLoading(true);
    setError(null);
    
    try {
      const data = await adminAnalyticsAPI.getCourseCompletionRates(api,filters);
      setCourseCompletionRates(data);
    } catch (err) {
      handleError(err, 'load course completion rates');
    } finally {
      setCompletionRatesLoading(false);
    }
  }, [api,handleError]);

  // Fetch quiz scores
  const fetchQuizScores = useCallback(async (filters: AnalyticsFilters = {}) => {
    setQuizScoresLoading(true);
    setError(null);
    
    try {
      const data = await adminAnalyticsAPI.getQuizScores(api,filters);
      setQuizScores(data);
    } catch (err) {
      handleError(err, 'load quiz scores');
    } finally {
      setQuizScoresLoading(false);
    }
  }, [api,handleError]);

  // Fetch engagement metrics
  const fetchEngagementMetrics = useCallback(async (filters: AnalyticsFilters = {}) => {
    setEngagementLoading(true);
    setError(null);
    
    try {
      const data = await adminAnalyticsAPI.getEngagementMetrics(api,filters);
      setEngagementMetrics(data);
    } catch (err) {
      handleError(err, 'load engagement metrics');
    } finally {
      setEngagementLoading(false);
    }
  }, [api,handleError]);

  // Fetch consistency rates
  const fetchConsistencyRates = useCallback(async (filters: AnalyticsFilters = {}) => {
    setConsistencyLoading(true);
    setError(null);
    
    try {
      const data = await adminAnalyticsAPI.getConsistencyRates(api,filters);
      setConsistencyRates(data);
    } catch (err) {
      handleError(err, 'load consistency rates');
    } finally {
      setConsistencyLoading(false);
    }
  }, [api,handleError]);

  // Fetch individual student analytics
  const fetchIndividualStudentAnalytics = useCallback(async (studentId: number, filters: Omit<AnalyticsFilters, 'studentId'> = {}) => {
    setIndividualStudentLoading(true);
    setError(null);
    
    try {
      const data = await adminAnalyticsAPI.getIndividualStudentAnalytics(api, studentId, filters);
      setIndividualStudentData(data);
    } catch (err) {
      handleError(err, 'load individual student analytics');
    } finally {
      setIndividualStudentLoading(false);
    }
  }, [api,handleError]);

  // Fetch filter options
  const fetchFilterOptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminAnalyticsAPI.getFilterOptions(api);
      setFilterOptions(data);
    } catch (err) {
      handleError(err, 'load filter options');
    } finally {
      setLoading(false);
    }
  }, [handleError,api]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load filter options on mount
  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  return {
    // Data
    dashboardData,
    courseCompletionRates,
    quizScores,
    engagementMetrics,
    consistencyRates,
    individualStudentData,
    filterOptions,
    
    // Loading states
    loading: loading || dashboardLoading,
    dashboardLoading,
    completionRatesLoading,
    quizScoresLoading,
    engagementLoading,
    consistencyLoading,
    individualStudentLoading,
    
    // Error states
    error,
    
    // Actions
    fetchDashboardData,
    fetchCourseCompletionRates,
    fetchQuizScores,
    fetchEngagementMetrics,
    fetchConsistencyRates,
    fetchIndividualStudentAnalytics,
    fetchFilterOptions,
    clearError,
  };
}