import React, { useState } from "react";
import { X } from "lucide-react";
import { useApi } from "@/api/index";
import { useAuth } from "@/shared/context/AuthContext";

interface FilterOptions {
  blocks: Array<{ id: number; name: string }>;
  schools: Array<{ id: number; name: string; blockId: number }>;
  grades: Array<{ id: number; value: string }>;
}

interface AddUserForm {
  name: string;
  email: string;
  password: string;
  role: string;
  organizationUnitId?: number;
  gradeId?: number;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: string;
  filterOptions: FilterOptions | null;
  onUserAdded: (user: any) => void;
}

export default function AddUserModal({
  isOpen,
  onClose,
  role,
  filterOptions,
  onUserAdded
}: AddUserModalProps) {
  const api = useApi();
  const { user } = useAuth();

  const [formData, setFormData] = useState<AddUserForm>({
    name: "",
    email: "",
    password: "",
    role,
    organizationUnitId: undefined,
    gradeId: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSuperAdmin = user?.role === 'SUPERADMIN';
  const isAdmin = user?.role === 'ADMIN';

  // Reset form when modal opens/closes or role changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        password: "",
        role,
        organizationUnitId: isAdmin ? user?.organizationUnitId : undefined,
        gradeId: undefined,
      });
      setError("");
    }
  }, [isOpen, role, isAdmin, user?.organizationUnitId]);

  const getFilteredSchools = () => {
    if (!filterOptions?.schools) return [];
    if (isAdmin && user?.organizationUnit?.type === 'SCHOOL') {
      return filterOptions.schools.filter(school => school.id === user.organizationUnitId);
    }
    return filterOptions.schools;
  };

  const getFilteredBlocks = () => {
    if (!filterOptions?.blocks) return [];
    if (isAdmin) {
      if (user?.organizationUnit?.type === 'SCHOOL') {
        const userSchool = filterOptions.schools.find(s => s.id === user.organizationUnitId);
        return filterOptions.blocks.filter(block => block.id === userSchool?.blockId);
      }
    }
    return filterOptions.blocks;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/users", formData);
      onUserAdded(response.data.user);
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof AddUserForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Add New {role.charAt(0) + role.slice(1).toLowerCase()}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter password (min. 6 characters)"
            />
          </div>

          {/* Organization Unit for ADMIN */}
          {role === 'ADMIN' && isSuperAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Unit
              </label>
              <select
                value={formData.organizationUnitId || ''}
                onChange={(e) => handleInputChange('organizationUnitId', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Organization</option>
                <optgroup label="Blocks">
                  {getFilteredBlocks().map(block => (
                    <option key={`block-${block.id}`} value={block.id}>
                      {block.name} (Block)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Schools">
                  {getFilteredSchools().map(school => (
                    <option key={`school-${school.id}`} value={school.id}>
                      {school.name} (School)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          )}

          {/* School for INSTRUCTOR */}
          {role === 'INSTRUCTOR' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School *
              </label>
              <select
                required
                value={formData.organizationUnitId || ''}
                onChange={(e) => handleInputChange('organizationUnitId', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAdmin && user?.organizationUnit?.type === 'SCHOOL'}
              >
                <option value="">Select School</option>
                {getFilteredSchools().map(school => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
              {isAdmin && user?.organizationUnit?.type === 'SCHOOL' && (
                <p className="text-xs text-gray-500 mt-1">
                  Instructors will be added to your school
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
