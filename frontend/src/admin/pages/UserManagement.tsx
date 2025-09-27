import React, { useState, useEffect } from "react";
import { UserPlus, Shield, User as UserIcon, Users } from "lucide-react";
import { useApi } from "@/api/index";
import { useNavigate } from "react-router-dom";

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
    description: "Course and user management",
    value: "ADMIN",
    icon: UserIcon,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Instructor",
    description: "Course content management",
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

  const [activeRole, setActiveRole] = useState("STUDENT");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeRole === "STUDENT") return; // Students page separate
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

  const handleCardClick = (role) => {
    setActiveRole(role);
    setSearchTerm("");
    setPage(1);
    if (role === "STUDENT") {
      navigate("/admin/students");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Delete this user?")) return;
    await api.delete(`/users/${userId}`);
    setUsers((u) => u.filter((user) => user.id !== userId));
    setTotalCount((c) => c - 1);
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
          User Management
        </h1>
        {activeRole !== "STUDENT" && (
          <button className="btn btn-primary flex items-center">
            <UserPlus className="w-4 h-4 mr-2" />
            Add {activeRole.charAt(0) + activeRole.slice(1).toLowerCase()}
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {userRoles.map((role) => (
          <div
            key={role.value}
            onClick={() => handleCardClick(role.value)}
            className={`card p-6 text-center cursor-pointer ${
              activeRole === role.value ? "ring-2 ring-blue-500" : ""
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
            <p className="text-gray-600 mb-4">{role.description}</p>
            {activeRole === role.value && activeRole !== "STUDENT" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {totalCount} user{totalCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Table for roles except students */}
      {activeRole !== "STUDENT" && (
        <>
          <div className="flex items-center space-x-4 mt-6">
            <input
              type="text"
              placeholder={`Search ${activeRole.toLowerCase()}s...`}
              value={searchTerm}
              onChange={(e) => {
                setPage(1);
                setSearchTerm(e.target.value);
              }}
              className="border rounded p-2 flex-grow max-w-md"
            />
          </div>

          <div className="card overflow-hidden mt-4">
            <div className="overflow-x-auto">
              {loading ? (
                <p className="p-4 text-center text-gray-600">Loading...</p>
              ) : users.length === 0 ? (
                <p className="p-4 text-center text-gray-600">
                  No {activeRole.toLowerCase()}s found.
                </p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Joined</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 max-w-md mx-auto">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
