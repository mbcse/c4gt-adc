import React, { useEffect, useState } from 'react';
import { assignmentAPI } from '@/api/assignmentAPI';
import { useApi } from "@/api/index";
import { useAuth } from "@/shared/context/AuthContext";
import { Users, User, Building, School, GraduationCap } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  organizationUnit?: {
    name: string;
    type: string;
  };
  grade?: {
    value: string;
  };
}

interface FilterOptions {
  blocks: Array<{ id: number; name: string }>;
  schools: Array<{ id: number; name: string; blockId: number }>;
  grades: Array<{ id: number; value: string }>;
}

interface AssignCourseModalProps {
  courseId: number;
  onClose: () => void;
}

type AssignmentType = 'individual' | 'bulk';
type BulkType = 'block' | 'school' | 'grade';

export function AssignCourseModal({ courseId, onClose }: AssignCourseModalProps) {
  const api = useApi();
  const { user } = useAuth();

  const [assignmentType, setAssignmentType] = useState<AssignmentType>('individual');
  const [bulkType, setBulkType] = useState<BulkType>('school');

  // Individual assignment state
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  // Bulk assignment state
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<number | undefined>();
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | undefined>();
  const [selectedGradeId, setSelectedGradeId] = useState<number | undefined>();

  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const isSuperAdmin = user?.role === 'SUPERADMIN';
  const isAdmin = user?.role === 'ADMIN';
  const isInstructor = user?.role === 'INSTRUCTOR';

  // Fetch filter options for bulk assignment
  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const response = await api.get("/analytics/filter-options");
        setFilterOptions(response.data.data);

        // Auto-select user's organization unit
        if (user?.organizationUnit && !isSuperAdmin) {
          if (user.organizationUnit.type === 'SCHOOL') {
            setSelectedSchoolId(user.organizationUnitId);
          } else if (user.organizationUnit.type === 'BLOCK') {
            setSelectedBlockId(user.organizationUnitId);
          }
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    }
    fetchFilterOptions();
  }, [api, user, isSuperAdmin]);

  // Fetch individual users
  useEffect(() => {
    if (assignmentType !== 'individual') return;

    async function fetchUsers() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          role: 'STUDENT',
          take: '100',
          ...(searchTerm && { search: searchTerm }),
        });

        const response = await api.get(`/students?${params.toString()}`);
        setUsers(response.data.students || []);
      } catch (error) {
        console.error('Failed to load users:', error);
        alert('Failed to load users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [api, assignmentType, searchTerm]);

  const toggleUserSelection = (userId: number) => {
    setSelectedUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const getFilteredSchools = () => {
    if (!filterOptions?.schools) return [];
    if (selectedBlockId) {
      return filterOptions.schools.filter(school => school.blockId === selectedBlockId);
    }
    return filterOptions.schools;
  };

  const handleIndividualAssignment = async () => {
    if (selectedUserIds.length === 0) {
      alert('Please select at least one user');
      return;
    }

    setAssigning(true);
    try {
      const response = await api.post('/courses/assign-bulk', {
        courseId,
        userIds: selectedUserIds
      });
      alert(`Successfully assigned course to ${selectedUserIds.length} student(s)`);
      onClose();
    } catch (error: any) {
      console.error('Assignment failed:', error);
      alert(error.response?.data?.message || 'Failed to assign course');
    } finally {
      setAssigning(false);
    }
  };

  const handleBulkAssignment = async () => {
    const payload: any = { courseId };

    if (bulkType === 'block' && selectedBlockId) {
      payload.blockId = selectedBlockId;
    } else if (bulkType === 'school' && selectedSchoolId) {
      payload.schoolId = selectedSchoolId;
    } else if (bulkType === 'grade' && selectedGradeId) {
      payload.gradeId = selectedGradeId;
      // Include school/block context for grade assignment
      if (selectedSchoolId) payload.schoolId = selectedSchoolId;
      if (selectedBlockId) payload.blockId = selectedBlockId;
    } else {
      alert('Please select a valid option for assignment');
      return;
    }

    setAssigning(true);
    try {
      const response = await api.post('/courses/assign-bulk', payload);
      alert(`Successfully assigned course to ${response.data.assignedCount} student(s)`);
      onClose();
    } catch (error: any) {
      console.error('Bulk assignment failed:', error);
      alert(error.response?.data?.message || 'Failed to assign course');
    } finally {
      setAssigning(false);
    }
  };

  const handleAssignment = () => {
    if (assignmentType === 'individual') {
      handleIndividualAssignment();
    } else {
      handleBulkAssignment();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Assign Course to Students</h2>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Assignment Type Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${assignmentType === 'individual'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
              onClick={() => setAssignmentType('individual')}
            >
              <User className="inline-block w-4 h-4 mr-2" />
              Individual Students
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${assignmentType === 'bulk'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
              onClick={() => setAssignmentType('bulk')}
            >
              <Users className="inline-block w-4 h-4 mr-2" />
              Bulk Assignment
            </button>
          </div>

          {assignmentType === 'individual' ? (
            <div>
              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Individual Users List */}
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading students...</p>
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
                  {users.length === 0 ? (
                    <p className="p-4 text-gray-600 text-center">No students found.</p>
                  ) : (
                    <div className="p-2">
                      {users.map(user => (
                        <label key={user.id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedUserIds.includes(user.id)}
                            onChange={() => toggleUserSelection(user.id)}
                            className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                            {user.organizationUnit && (
                              <div className="text-xs text-gray-500">
                                {user.organizationUnit.name} • Grade {user.grade?.value || 'N/A'}
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Bulk Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Scope</label>
                <div className="grid grid-cols-3 gap-2">
                  {(isSuperAdmin || (isAdmin && user?.organizationUnit?.type === 'BLOCK')) && (
                    <button
                      className={`p-3 border rounded-md text-center transition-colors ${bulkType === 'block'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                      onClick={() => setBulkType('block')}
                    >
                      <Building className="w-5 h-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Block</div>
                    </button>
                  )}
                  <button
                    className={`p-3 border rounded-md text-center transition-colors ${bulkType === 'school'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                    onClick={() => setBulkType('school')}
                  >
                    <School className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">School</div>
                  </button>
                  <button
                    className={`p-3 border rounded-md text-center transition-colors ${bulkType === 'grade'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                    onClick={() => setBulkType('grade')}
                  >
                    <GraduationCap className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Grade</div>
                  </button>
                </div>
              </div>

              {/* Block Selection */}
              {bulkType === 'block' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Block</label>
                  <select
                    value={selectedBlockId || ''}
                    onChange={(e) => setSelectedBlockId(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!isSuperAdmin && user?.organizationUnit?.type !== 'BLOCK'}
                  >
                    <option value="">Select a block</option>
                    {filterOptions?.blocks.map(block => (
                      <option key={block.id} value={block.id}>
                        {block.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* School Selection */}
              {(bulkType === 'school' || bulkType === 'grade') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select School</label>
                  <select
                    value={selectedSchoolId || ''}
                    onChange={(e) => setSelectedSchoolId(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isInstructor}
                  >
                    <option value="">Select a school</option>
                    {getFilteredSchools().map(school => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Grade Selection */}
              {bulkType === 'grade' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Grade</label>
                  <select
                    value={selectedGradeId || ''}
                    onChange={(e) => setSelectedGradeId(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a grade</option>
                    {filterOptions?.grades.map(grade => (
                      <option key={grade.id} value={grade.id}>
                        Grade {grade.value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={onClose}
            disabled={assigning}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleAssignment}
            disabled={
              assigning ||
              (assignmentType === 'individual' && selectedUserIds.length === 0) ||
              (assignmentType === 'bulk' && (
                (bulkType === 'block' && !selectedBlockId) ||
                (bulkType === 'school' && !selectedSchoolId) ||
                (bulkType === 'grade' && !selectedGradeId)
              ))
            }
          >
            {assigning ? 'Assigning...' :
              assignmentType === 'individual' ? `Assign to ${selectedUserIds.length} Student(s)` :
                'Assign to Students'}
          </button>
        </div>
      </div>
    </div>
  );
}
