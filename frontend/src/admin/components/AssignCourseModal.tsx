import React, { useEffect, useState } from 'react';
import { assignmentAPI } from '@/api/assignmentAPI';
import { userAPI } from '@/api/userAPI';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AssignCourseModalProps {
  courseId: number;
  onClose: () => void;
  client?: any; // Axios instance to use for API calls
}

export default function AssignCourseModal({ courseId, onClose, client }: AssignCourseModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        // Pass the axios client to ensure baseURL and headers are correct
        const res = await userAPI.getUsers({ role: 'STUDENT' }, client);
        setUsers(res.users);
      } catch {
        alert('Failed to load users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [client]);

  const toggleUserSelection = (userId: number) => {
    setSelectedUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const assignUsers = async () => {
    if (selectedUserIds.length === 0) {
      alert('Please select at least one user');
      return;
    }
    setAssigning(true);
    try {
      for (const userId of selectedUserIds) {
        await assignmentAPI.assignCourseToUser(courseId, userId, client);
      }
      alert('Users assigned successfully');
      onClose();
    } catch {
      alert('Failed to assign users');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6 max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Assign Users to Course</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="max-h-[50vh] overflow-auto mb-4">
            {users.length === 0 && <p>No users found.</p>}
            {users.map(user => (
              <label key={user.id} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                  className="mr-2"
                />
                <span>
                  {user.name} ({user.email})
                </span>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button className="btn btn-outline" onClick={onClose} disabled={assigning}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={assignUsers}
            disabled={assigning || selectedUserIds.length === 0}
          >
            {assigning ? 'Assigning...' : 'Assign Selected'}
          </button>
        </div>
      </div>
    </div>
  );
}
