'use client';
import { useEffect, useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { ChevronDown, Check } from 'lucide-react';

export default function PermissionsPage() {
    const [users, setUsers] = useState([]);
    const [adminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [role, setRole] = useState('all');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/users/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: userName, role: userRole }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data?.error);
            } else {
                toast.success(data?.message);   
            }
            setUsers([...users, { name: userName, role: userRole }]);
            setUserName('');
            setUserRole('');
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error();
        }
    };
    const updateRole = async (id, newRole) => {
        try {
            const res = await fetch(`/api/users/${id}/role`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });
            if (!res.ok) throw new Error('Failed to update role');
            setUsers(users.map((user) => (user.id === id ? { ...user, role: newRole } : user)));
            toast.success('Role updated successfully');

        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error('Failed to update user role');
        }
    };

    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching all users:', error);
            toast.error('Failed to fetch all users');
        } finally {
            setLoading(false);
        }
    };

    const fetchAdminUsers = async (role) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/users/getRole?role=${role}`);
            const data = await res.json();
            setAdminUsers(data);
        } catch (error) {
            console.error('Error fetching admin users:', error);
            toast.error('Failed to fetch admin users');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/users/check-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            const data = await res.json();
            if (data?.status === 200) {
                toast.success("User is Admin");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useMemo(() => {
        fetchAllUsers();
    }, []);

    useMemo(() => {
        if (role === 'all') {
            setAdminUsers(users);
        } else {
            fetchAdminUsers(role);
        }
    }, [users, role]);

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'editor':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'viewer':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">User Permissions</h1>
                    </div>
                    <p className="text-gray-600">Manage user roles and access levels for your application</p>
                </div>

                <div className="relative">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                        {loading ? (
                            <div className="p-8">
                                <div className="animate-pulse space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        ) : (
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
                                        {users.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div>
                                                            <div className="font-medium text-gray-900">{user.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setDropdownOpen(dropdownOpen === user.id ? null : user.id)}
                                                            className={`inline-flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${getRoleBadgeColor(user.role)}`}
                                                        >
                                                            <span className="capitalize">{user.role}</span>
                                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen === user.id ? 'rotate-180' : ''}`} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {dropdownOpen && (
                        <div className="absolute top-0 left-0 w-full pointer-events-none z-50">
                            {users.map((user) => {
                                if (dropdownOpen !== user.id) return null;

                                return (
                                    <div
                                        key={user.id}
                                        className="pointer-events-auto absolute"
                                        style={{
                                            top: `${120 + (users.findIndex(u => u.id === user.id) * 73)}px`,
                                            left: '400px',
                                        }}
                                    >
                                        <div className="w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                                            {['admin', 'editor', 'viewer'].map((roleOption) => (
                                                <button
                                                    key={roleOption}
                                                    onClick={() => {
                                                        updateRole(user.id, roleOption);
                                                        setDropdownOpen(null);
                                                    }}
                                                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 ${user.role === roleOption ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}
                                                >
                                                    <span className="capitalize font-medium">{roleOption}</span>
                                                    {user.role === roleOption && (
                                                        <Check className="w-4 h-4 ml-auto text-indigo-600" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-gray-50 border cursor-pointer border-gray-300 w-1/3 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block  p-2.5"
                    >
                        <option value="all">All</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                    </select>
                    <div className="flex items-center gap-3 my-4">
                        <h2 className="text-xl font-semibold text-gray-900">Users</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {adminUsers.map((user) => (
                            <div key={user.id} className={`flex items-center gap-3 p-4 ${getRoleBadgeColor(user.role)} rounded-xl border border-red-100`}>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm  flex items-center gap-1">
                                        {user.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex mt-4'>
                    <h3 className='text-2xl text-black mr-4'>Enter name</h3>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full max-w-sm px-4 py-2 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-3 inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg transition-all"
                >
                    Submit
                </button>


                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Add User</h1>

                    <form onSubmit={handleForm} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                id="role"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 cursor-pointer"
                                required
                            >
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        >
                            Add User
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
