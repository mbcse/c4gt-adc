import { useState, useEffect, useCallback } from 'react';
import {
  analyticsAPI,
  StudentSummary,
  ActivityTrendItem,
  CourseProgress,
  QuizAnalytics,
  CourseCompletionStat,
  DetailedQuizPerformance,
  StudyTimePattern,
  LessonCompletionPattern,
  AvailableCourse,
  CourseVideoProgress,
  ActivityCalendarResponse
} from '@/api/analyticsAPI';

export const useStudentAnalytics = () => {
  const [summary, setSummary] = useState<StudentSummary | null>(null);
  const [activityTrends, setActivityTrends] = useState<ActivityTrendItem[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [quizAnalytics, setQuizAnalytics] = useState<QuizAnalytics | null>(null);
  const [courseCompletionStats, setCourseCompletionStats] = useState<CourseCompletionStat[]>([]);
  const [activityCalendar, setActivityCalendar] = useState<ActivityCalendarResponse | null>(null);
  const [detailedQuizPerformance, setDetailedQuizPerformance] = useState<DetailedQuizPerformance[]>([]);
  const [studyTimePatterns, setStudyTimePatterns] = useState<StudyTimePattern[]>([]);
  const [lessonCompletionPatterns, setLessonCompletionPatterns] = useState<LessonCompletionPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableCourses, setAvailableCourses] = useState<AvailableCourse[]>([]);
  const [courseVideoProgress, setCourseVideoProgress] = useState<CourseVideoProgress | null>(null);
  const [peakStudyHours, setPeakStudyHours] = useState<string>('');
  const [courseSpecificQuizAnalytics, setCourseSpecificQuizAnalytics] = useState<QuizAnalytics | null>(null);

  const fetchSummary = useCallback(async () => {
    try {
      const data = await analyticsAPI.getStudentSummary();
      setSummary(data);
    } catch (err) {
      console.error('Error fetching summary:', err);
      setError('Failed to load summary data');
    }
  }, []);

  const fetchCourseProgress = useCallback(async () => {
    try {
      const data = await analyticsAPI.getCourseProgress();
      setCourseProgress(data);
    } catch (err) {
      console.error('Error fetching course progress:', err);
      setError('Failed to load course progress');
    }
  }, []);

  const fetchQuizAnalytics = useCallback(async () => {
    try {
      const data = await analyticsAPI.getQuizAnalytics();
      setQuizAnalytics(data);
    } catch (err) {
      console.error('Error fetching quiz analytics:', err);
      setError('Failed to load quiz analytics');
    }
  }, []);

  const fetchCourseCompletionStats = useCallback(async () => {
    try {
      const data = await analyticsAPI.getCourseCompletionStats();
      setCourseCompletionStats(data);
    } catch (err) {
      console.error('Error fetching course completion stats:', err);
      setError('Failed to load course completion stats');
    }
  }, []);

  const fetchDetailedQuizPerformance = useCallback(async (courseId?: number) => {
    try {
      setDetailedQuizPerformance([]); 
      const data = await analyticsAPI.getDetailedQuizPerformance(courseId);
      setDetailedQuizPerformance(data);
    } catch (err) {
      console.error('Error fetching detailed quiz performance:', err);
      setError('Failed to load detailed quiz performance');
    }
  }, []);

  const fetchPeakStudyHours = useCallback(async () => {
    try {
      const data = await analyticsAPI.getPeakStudyHours();
      setPeakStudyHours(data);
    } catch (err) {
      console.error('Error fetching peak study hours:', err);
      setError('Failed to load peak study hours');
    }
  }, []);

  const fetchCourseSpecificQuizAnalytics = useCallback(async (courseId?: number) => {
    try {
      const data = await analyticsAPI.getCourseSpecificQuizAnalytics(courseId);
      setCourseSpecificQuizAnalytics(data);
    } catch (err) {
      console.error('Error fetching course-specific quiz analytics:', err);
      setError('Failed to load course-specific quiz analytics');
    }
  }, []);

  const fetchActivityTrends = useCallback(async (timeframe: 'weekly' | 'monthly' | 'yearly' = 'weekly') => {
    try {
      const data = await analyticsAPI.getActivityTrends(timeframe);
      setActivityTrends(data);
    } catch (err) {
      console.error('Error fetching activity trends:', err);
      setError('Failed to load activity trends');
    }
  }, []);

const fetchActivityCalendar = useCallback(async (year?: number) => {
    try {
      const data = await analyticsAPI.getActivityCalendar(year);
      setActivityCalendar(data);
    } catch (err) {
      console.error('Error fetching activity calendar:', err);
      setError('Failed to load activity calendar');
    }
  }, []);

  const fetchStudyTimePatterns = useCallback(async (timeframe: 'weekly' | 'monthly' | 'yearly' = 'weekly') => {
    try {
      const data = await analyticsAPI.getStudyTimePatterns(timeframe);
      setStudyTimePatterns(data);
    } catch (err) {
      console.error('Error fetching study time patterns:', err);
      setError('Failed to load study time patterns');
    }
  }, []);

  const fetchLessonCompletionPatterns = useCallback(async (timeframe: 'weekly' | 'monthly' | 'yearly' = 'weekly') => {
    try {
      const data = await analyticsAPI.getLessonCompletionPatterns(timeframe);
      setLessonCompletionPatterns(data);
    } catch (err) {
      console.error('Error fetching lesson completion patterns:', err);
      setError('Failed to load lesson completion patterns');
    }
  }, []);

  const fetchAvailableCourses = useCallback(async () => {
    try {
      const data = await analyticsAPI.getAvailableCourses();
      setAvailableCourses(data);
    } catch (err) {
      console.error('Error fetching available courses:', err);
      setError('Failed to load available courses');
    }
  }, []);

  const fetchCourseVideoProgress = useCallback(async (courseId: number) => {
    try {
      const data = await analyticsAPI.getCourseVideoProgress(courseId);
      setCourseVideoProgress(data);
    } catch (err) {
      console.error('Error fetching course video progress:', err);
      setError('Failed to load course video progress');
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all([
        fetchSummary(),
        fetchActivityTrends(),
        fetchCourseProgress(),
        fetchQuizAnalytics(),
        fetchCourseCompletionStats(),
        fetchActivityCalendar(),
        fetchLessonCompletionPatterns(),
        fetchAvailableCourses(),
        fetchPeakStudyHours(),
        fetchCourseSpecificQuizAnalytics(),
      ]);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
    } finally {
      setLoading(false);
    }
  }, [
    fetchSummary, fetchActivityTrends, fetchCourseProgress, fetchQuizAnalytics,
    fetchCourseCompletionStats, fetchActivityCalendar, fetchLessonCompletionPatterns, fetchAvailableCourses,
    fetchPeakStudyHours, fetchCourseSpecificQuizAnalytics
  ]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]); 

  return {
    summary,
    activityTrends,
    courseProgress,
    quizAnalytics,
    courseCompletionStats,
    activityCalendar,
    detailedQuizPerformance,
    studyTimePatterns,
    lessonCompletionPatterns,
    loading,
    error,
    availableCourses,
    courseVideoProgress,
    peakStudyHours,
    courseSpecificQuizAnalytics,
    refetch: fetchAllData,
    fetchActivityTrends,
    fetchStudyTimePatterns,
    fetchLessonCompletionPatterns,
    fetchActivityCalendar,
    fetchAvailableCourses,
    fetchCourseVideoProgress,
    fetchPeakStudyHours,
    fetchCourseSpecificQuizAnalytics,
    fetchDetailedQuizPerformance,
  };
};