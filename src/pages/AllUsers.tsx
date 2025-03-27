import React, { useEffect, useState } from "react";
import { getUsers } from "../services/AdminService"; // Adjust the import path based on your project structure
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from sessionStorage
    sessionStorage.removeItem("token");
    // Optional: Clear any other user-related data
    // sessionStorage.removeItem("user");
    // Redirect to the login page
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response.status === "success") {
          setUsers(response.data); // Assuming the API returns the data in the `data` field
        } else {
          throw new Error(response.message || "Failed to fetch users");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}

      <div className="flex flex-row justify-between items-center bg-white shadow-md sticky top-0 z-10 py-4 px-6">
        {/* Title */}
        <h1 className="text-2xl font-bold">
          User Information - For Admins Only
        </h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 flex items-center transition"
        >
          Logout <RxAvatar size={20} className="ml-2" />
        </button>
      </div>

      {/* Table Container */}
      <div className="flex-grow overflow-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.first_name}</td>
                <td className="py-2 px-4 border-b">{user.last_name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
