import React, { useState, useEffect } from "react";
import { useApi } from "@/api/index";

interface Student {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

export default function Students() {
  const api = useApi();

  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      try {
        const skip = (page - 1) * pageSize;
        const response = await api.get("/students", {
          params: { skip, take: pageSize, search: searchTerm },
        });
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
  }, [api, page, searchTerm, pageSize]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold my-4">Student Management</h1>

      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => {
          setPage(1);
          setSearchTerm(e.target.value);
        }}
        className="border p-2 rounded w-full max-w-md mb-4"
      />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-4 text-center text-gray-600">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="p-4 text-center text-gray-600">No students found.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.email}</td>
                    <td className="border px-4 py-2">
                      {student.createdAt
                        ? new Date(student.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Pagination Controls */}
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
    </div>
  );
}
