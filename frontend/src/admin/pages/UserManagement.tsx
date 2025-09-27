import React, { useState, useEffect } from "react";
import { UserPlus, Shield, User as UserIcon, Users, Search } from "lucide-react";
import { useApi } from "@/api/index";
import { useAuth } from "@/shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddUserModal from "@/admin/components/AddUserModal";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  organizationUnit?: {
    id: number;
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

const userRoles = [
  {
    title: "Super Admin",
    description: "Full system access",
    value: "SUPERADMIN",
    icon: Shield,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Admin",
    description: "Course, user and progress management",
    value: "ADMIN",
    icon: UserIcon,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Instructor",
    description: "Progress tracking",
    value: "INSTRUCTOR",
    icon: UserIcon,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Student",
    description: "Course access and progress",
    value: "STUDENT",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function UserManagement() {
  const api = useApi();
  const navigate = useNavigate();
  const { user } = useAuth();

  const getInitialRole = () => {
    if (!user) return "ADMIN";
    if (user.role === "SUPERADMIN") return "ADMIN";
    if (user.role === "ADMIN") return "INSTRUCTOR";
    return "ADMIN";
  };

  const [activeRole, setActiveRole] = useState<string>(getInitialRole);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalRole, setAddModalRole] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

  const isSuperAdmin = user?.role === 'SUPERADMIN';
  const isAdmin = user?.role === 'ADMIN';

  // Get available roles based on current user's role
  const getAvailableRoles = () => {
    if (isSuperAdmin) {
      return userRoles.filter(role => ['ADMIN', 'INSTRUCTOR'].includes(role.value));
    }
    if (isAdmin) {
      return userRoles.filter(role => role.value === 'INSTRUCTOR');
    }
    return [];
  };

  // Get viewable roles for the cards
  const getViewableRoles = () => {
    if (isSuperAdmin) {
      return userRoles;
    }
    if (isAdmin) {
      return userRoles.filter(role => ['INSTRUCTOR', 'STUDENT'].includes(role.value));
    }
    return [];
  };

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

  // Fetch users
  useEffect(() => {
    if (activeRole === "STUDENT") return;
    async function fetchUsers() {
      setLoading(true);
      try {
        const skip = (page - 1) * pageSize;
        const response = await api.get("/users", {
          params: { role: activeRole, skip, take: pageSize, search: searchTerm },
        });
        setUsers(response.data.users || []);
        setTotalCount(response.data.totalCount || 0);
      } catch (error) {
        setUsers([]);
        setTotalCount(0);
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [api, activeRole, page, pageSize, searchTerm]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleCardClick = (role: string) => {
    setActiveRole(role);
    setSearchTerm("");
    setPage(1);
    if (role === "STUDENT") {
      navigate("/admin/students");
    }
  };

  const openAddModal = (role: string) => {
    setAddModalRole(role);
    setShowAddModal(true);
  };

  const handleUserAdded = (newUser: User) => {
    setUsers([newUser, ...users]);
    setTotalCount(totalCount + 1);
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Delete this user? This action cannot be undone.")) return;

    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      setTotalCount(totalCount - 1);
    } catch (error: any) {
      console.error("Error deleting user:", error);
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
          User Management
        </h1>
        <div className="text-sm text-gray-500">
          Manage system users and their permissions
        </div>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {getViewableRoles().map((role) => (
          <div
            key={role.value}
            onClick={() => handleCardClick(role.value)}
            className={`card p-6 text-center cursor-pointer transition-all duration-200 hover:shadow-lg ${activeRole === role.value ? "ring-2 ring-blue-500 shadow-lg" : "shadow-sm hover:shadow-md"
              }`}
          >
            <div
              className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${role.color}`}
            >
              <role.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {role.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 h-10">{role.description}</p>
            {activeRole === role.value && activeRole !== "STUDENT" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {totalCount} user{totalCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* User List */}
      {activeRole !== "STUDENT" && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeRole.toLowerCase()}s...`}
                value={searchTerm}
                onChange={(e) => {
                  setPage(1);
                  setSearchTerm(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {getAvailableRoles().some(role => role.value === activeRole) && (
              <button
                onClick={() => openAddModal(activeRole)}
                className="btn btn-primary flex items-center justify-center whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add {activeRole.charAt(0) + activeRole.slice(1).toLowerCase()}
              </button>
            )}
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium">No {activeRole.toLowerCase()}s found</p>
                <p className="text-sm">
                  {searchTerm
                    ? "Try adjusting your search criteria"
                    : `No ${activeRole.toLowerCase()}s have been added yet`
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User Information
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Organization
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.organizationUnit?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Delete user"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
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
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        role={addModalRole}
        filterOptions={filterOptions}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
}
