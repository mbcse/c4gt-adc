import React, { useState, useEffect } from "react";
import { useApi } from "@/api/index";
import { useAuth } from "@/shared/context/AuthContext";
import { School, GraduationCap, Users, Search, X } from "lucide-react";

interface Student {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  grade?: {
    value: string;
  };
  organizationUnit?: {
    name: string;
    type: string;
  };
}

interface FilterOptions {
  blocks: Array<{ id: number; name: string }>;
  schools: Array<{ id: number; name: string; blockId: number }>;
  grades: Array<{ id: number; value: string }>;
}

interface StudentsFilters {
  blockId?: number;
  schoolId?: number;
  gradeId?: number;
}

export default function Students() {
  const api = useApi();
  const { user } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [filters, setFilters] = useState<StudentsFilters>({});
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const isSuperAdmin = user?.role === 'SUPERADMIN';
  const userOrgUnit = user?.organizationUnit;

  // Initialize filters based on user's org unit
  useEffect(() => {
    if (userOrgUnit && !isSuperAdmin) {
      const initialFilters: StudentsFilters = {};
      if (userOrgUnit.type === 'BLOCK') {
        initialFilters.blockId = userOrgUnit.id;
      } else if (userOrgUnit.type === 'SCHOOL') {
        initialFilters.blockId = userOrgUnit.parentId;
        initialFilters.schoolId = userOrgUnit.id;
      }
      setFilters(initialFilters);
    }
  }, [userOrgUnit, isSuperAdmin]);

  // Fetch filter options
  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const response = await api.get("/analytics/filter-options");
        setFilterOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    }
    fetchFilterOptions();
  }, [api]);

  // Fetch students
  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      try {
        const skip = (page - 1) * pageSize;
        const params = new URLSearchParams({
          skip: skip.toString(),
          take: pageSize.toString(),
          ...(searchTerm && { search: searchTerm }),
          ...(filters.blockId && { blockId: filters.blockId.toString() }),
          ...(filters.schoolId && { schoolId: filters.schoolId.toString() }),
          ...(filters.gradeId && { gradeId: filters.gradeId.toString() }),
        });

        const response = await api.get(`/students?${params.toString()}`);
        setStudents(response.data.students ?? []);
        setTotalCount(response.data.totalCount ?? 0);
      } catch (error) {
        setStudents([]);
        setTotalCount(0);
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, [api, page, searchTerm, filters, pageSize]);

  const handleFilterChange = (key: keyof StudentsFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };

    // Clear dependent filters
    if (key === 'blockId') {
      newFilters.schoolId = undefined;
    }

    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const clearFilter = (key: keyof StudentsFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    setPage(1);
  };

  const getFilteredSchools = () => {
    if (!filterOptions?.schools) return [];
    if (!filters.blockId) return filterOptions.schools;
    return filterOptions.schools.filter(school => school.blockId === filters.blockId);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value !== undefined && value !== null).length;
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            {totalCount} student{totalCount !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <School className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {getActiveFilterCount()} active
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Block Filter */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Block</label>
            <select
              value={filters.blockId || ''}
              onChange={(e) => handleFilterChange('blockId', e.target.value ? Number(e.target.value) : undefined)}
              disabled={!isSuperAdmin}
              className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${!isSuperAdmin ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
            >
              <option value="">All Blocks</option>
              {filterOptions?.blocks.map(block => (
                <option key={block.id} value={block.id}>
                  {block.name}
                </option>
              ))}
            </select>
          </div>

          {/* School Filter */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">School</label>
            <select
              value={filters.schoolId || ''}
              onChange={(e) => handleFilterChange('schoolId', e.target.value ? Number(e.target.value) : undefined)}
              disabled={!isSuperAdmin && userOrgUnit?.type === 'SCHOOL'}
              className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${(!isSuperAdmin && userOrgUnit?.type === 'SCHOOL') ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
            >
              <option value="">All Schools</option>
              {getFilteredSchools().map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Filter */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <select
              value={filters.gradeId || ''}
              onChange={(e) => handleFilterChange('gradeId', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">All Grades</option>
              {filterOptions?.grades.map(grade => (
                <option key={grade.id} value={grade.id}>
                  Grade {grade.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {filters.blockId && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                  Block: {filterOptions?.blocks.find(b => b.id === filters.blockId)?.name}
                  {isSuperAdmin && (
                    <button onClick={() => clearFilter('blockId')} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              )}
              {filters.schoolId && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                  School: {filterOptions?.schools.find(s => s.id === filters.schoolId)?.name}
                  {!(userOrgUnit?.type === 'SCHOOL' && !isSuperAdmin) && (
                    <button onClick={() => clearFilter('schoolId')} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              )}
              {filters.gradeId && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                  Grade: {filterOptions?.grades.find(g => g.id === filters.gradeId)?.value}
                  <button onClick={() => clearFilter('gradeId')} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search students by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium">No students found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Information
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      School
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.grade?.value ? `Grade ${student.grade.value}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.organizationUnit?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.createdAt
                          ? new Date(student.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(page * pageSize, totalCount)}
                    </span>{' '}
                    of <span className="font-medium">{totalCount}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage(page + 1)}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
