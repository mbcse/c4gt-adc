import React, { useState, useEffect } from 'react';
import { Filter, X, Calendar, Users, School, GraduationCap, BookOpen, User } from 'lucide-react';
import { FilterOptions, AnalyticsFilters } from '@/api/adminAnalyticsAPI';

interface AdminFiltersProps {
  filterOptions: FilterOptions | null;
  currentFilters: AnalyticsFilters;
  onFiltersChange: (filters: AnalyticsFilters) => void;
  loading?: boolean;
}

const AdminFilters: React.FC<AdminFiltersProps> = ({
  filterOptions,
  currentFilters,
  onFiltersChange,
  loading = false
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localFilters, setLocalFilters] = useState<AnalyticsFilters>(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = (key: keyof AnalyticsFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    
    if (key === 'districtId') {
      newFilters.schoolId = undefined;
    }
    
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: AnalyticsFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const clearFilter = (key: keyof AnalyticsFilters) => {
    const newFilters = { ...localFilters };
    delete newFilters[key];
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters).filter(value => value !== undefined && value !== null && value !== '').length;
  };

  const getFilteredSchools = () => {
    if (!filterOptions?.schools) return [];
    if (!localFilters.districtId) return filterOptions.schools;
    return filterOptions.schools.filter(school => school.districtId === localFilters.districtId);
  };

  if (loading || !filterOptions) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">Loading filters...</span>
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Analytics Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {showAdvanced ? 'Basic' : 'Advanced'} Filters
          </button>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* District Filter */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center space-x-1">
            <School className="h-4 w-4" />
            <span>District</span>
          </label>
          <div className="relative">
            <select
              value={localFilters.districtId || ''}
              onChange={(e) => handleFilterChange('districtId', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">All Districts</option>
              {filterOptions.districts.map(district => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {localFilters.districtId && (
              <button
                onClick={() => clearFilter('districtId')}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* School Filter */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center space-x-1">
            <School className="h-4 w-4" />
            <span>School</span>
          </label>
          <div className="relative">
            <select
              value={localFilters.schoolId || ''}
              onChange={(e) => handleFilterChange('schoolId', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={localFilters.districtId && getFilteredSchools().length === 0}
            >
              <option value="">All Schools</option>
              {getFilteredSchools().map(school => (
                <option key={school.id} value={school.id}>
                  {school.name} {!localFilters.districtId && `(${school.districtName})`}
                </option>
              ))}
            </select>
            {localFilters.schoolId && (
              <button
                onClick={() => clearFilter('schoolId')}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Grade Filter */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center space-x-1">
            <GraduationCap className="h-4 w-4" />
            <span>Grade</span>
          </label>
          <div className="relative">
            <select
              value={localFilters.gradeId || ''}
              onChange={(e) => handleFilterChange('gradeId', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">All Grades</option>
              {filterOptions.grades.map(grade => (
                <option key={grade.id} value={grade.id}>
                  Grade {grade.value}
                </option>
              ))}
            </select>
            {localFilters.gradeId && (
              <button
                onClick={() => clearFilter('gradeId')}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Timeframe Filter */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Time Period</span>
          </label>
          <select
            value={localFilters.timeframe || 'weekly'}
            onChange={(e) => handleFilterChange('timeframe', e.target.value as 'weekly' | 'monthly' | 'yearly')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          {/* Individual Student Filter */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>Individual Student</span>
            </label>
            <div className="relative">
              <select
                value={localFilters.studentId || ''}
                onChange={(e) => handleFilterChange('studentId', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All Students</option>
                {filterOptions.students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.email})
                  </option>
                ))}
              </select>
              {localFilters.studentId && (
                <button
                  onClick={() => clearFilter('studentId')}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Course Filter */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>Course</span>
            </label>
            <div className="relative">
              <select
                value={localFilters.courseId || ''}
                onChange={(e) => handleFilterChange('courseId', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All Courses</option>
                {filterOptions.courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
              {localFilters.courseId && (
                <button
                  onClick={() => clearFilter('courseId')}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Start Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={localFilters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value || undefined)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {localFilters.startDate && (
                <button
                  onClick={() => clearFilter('startDate')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>End Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={localFilters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value || undefined)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                min={localFilters.startDate}
              />
              {localFilters.endDate && (
                <button
                  onClick={() => clearFilter('endDate')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {localFilters.districtId && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                District: {filterOptions.districts.find(d => d.id === localFilters.districtId)?.name}
                <button onClick={() => clearFilter('districtId')} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {localFilters.schoolId && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                School: {filterOptions.schools.find(s => s.id === localFilters.schoolId)?.name}
                <button onClick={() => clearFilter('schoolId')} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {localFilters.gradeId && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                Grade: {filterOptions.grades.find(g => g.id === localFilters.gradeId)?.value}
                <button onClick={() => clearFilter('gradeId')} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {localFilters.studentId && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
                Student: {filterOptions.students.find(s => s.id === localFilters.studentId)?.name}
                <button onClick={() => clearFilter('studentId')} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {localFilters.courseId && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-800">
                Course: {filterOptions.courses.find(c => c.id === localFilters.courseId)?.title}
                <button onClick={() => clearFilter('courseId')} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {(localFilters.startDate || localFilters.endDate) && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                Date Range: {localFilters.startDate || 'Start'} - {localFilters.endDate || 'End'}
                <button onClick={() => {
                  clearFilter('startDate');
                  clearFilter('endDate');
                }} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFilters;