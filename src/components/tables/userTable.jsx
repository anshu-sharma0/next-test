import React from 'react';
import Loader from '../Loader';

const UserTable = ({ users, getRoleBadgeColor, updateRole, loading }) => {
  const handleRoleChange = (userId, newRole) => {
    try {
      updateRole(userId, newRole);
    } catch (error) {
      console.error('Role update failed:', error);
    }
  };

  const hasUsers = Array.isArray(users) && users.length > 0;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/2">User</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/2">Role</th>
          </tr>
        </thead>
      </table>

      <div className="h-[400px] overflow-y-auto border border-t-0 border-gray-200 rounded-b-md">
        <table className="w-full table-fixed">
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="2" className="text-center py-10">
                  <Loader />
                </td>
              </tr>
            ) : hasUsers ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 w-1/2">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 w-1/2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className={`px-2.5 py-1 rounded-md border text-sm font-medium transition-all duration-200 hover:shadow-md focus:outline-none ${getRoleBadgeColor(user.role)}`}
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
