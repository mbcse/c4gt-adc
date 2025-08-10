import { useState, useMemo, useEffect } from 'react'
import { Search, UserPlus, Eye, Edit, Trash2 } from 'lucide-react'
import { useApi } from '@/api/index' // Role-aware axios instance
import { userAPI, User } from '@/api/userAPI'

export default function Students() {
  const api = useApi()

  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('STUDENT') // default students only
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch students once and on role filter change
  useEffect(() => {
    async function fetchStudents() {
      setLoading(true)
      try {
        // Calls backend GET /api/admin/users?role=STUDENT
        const result = await userAPI.getUsers({ role: roleFilter }, api)
        setUsers(result.users || [])
      } catch (err) {
        console.error('Error fetching students:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [api, roleFilter])

  // Local filtering (search + role + active/inactive)
  const filteredStudents = useMemo(() => {
    return users.filter(student => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = roleFilter === '' || student.role === roleFilter

      const matchesStatus =
        statusFilter === '' ||
        (statusFilter === 'active' &&
          student.createdAt &&
          new Date(student.createdAt) >
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (statusFilter === 'inactive' &&
          student.createdAt &&
          new Date(student.createdAt) <=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()

  const formatDate = (dateString?: string) =>
    dateString ? new Date(dateString).toLocaleDateString() : 'N/A'

  const getStatusBadge = (lastActive?: string) => {
    const isActive =
      lastActive &&
      new Date(lastActive) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return isActive ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Inactive
      </span>
    )
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      STUDENT: 'bg-blue-100 text-blue-800',
      INSTRUCTOR: 'bg-purple-100 text-purple-800',
    }
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {role}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-3xl">
            Student Management
          </h1>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button className="btn btn-primary">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Optional role filter if you want to allow instructors too */}
        <select
          className="form-input"
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
        >
          <option value="STUDENT">Students</option>
          <option value="INSTRUCTOR">Instructors</option>
        </select>

        <select
          className="form-input"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="text-sm text-gray-500 flex items-center">
          {filteredStudents.length} of {users.length} students
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500">Loading students...</p>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Enrolled Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
                          {getInitials(student.name)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(student.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.enrolledCourses ?? 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${student.progress ?? 0}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {student.progress ?? 0}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.lastActive || student.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(student.lastActive || student.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredStudents.length && (
              <p className="p-4 text-gray-500 text-center">
                No students found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
