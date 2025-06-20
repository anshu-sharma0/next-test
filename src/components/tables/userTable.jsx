import React from 'react'

const UserTable = ({ users, getRoleBadgeColor, updateRole }) => {
    const handleRoleChange = (userId, newRole) => {
        updateRole(userId, newRole);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                            User
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {users?.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="font-medium text-gray-900">{user.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    className={`px-2.5 py-1 rounded-md border text-sm font-medium transition-all duration-200 hover:shadow-md focus:outline-none ${getRoleBadgeColor(user.role)}`}
                                >
                                    <option value="admin" className='p-2'>Admin</option>
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable
