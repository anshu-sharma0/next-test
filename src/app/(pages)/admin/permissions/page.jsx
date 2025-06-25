'use client';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FilterLog, UserTable } from '../../../../components/layout';
import useFetch from '../../../../hooks/useFetch';
import { fetchUsersByRole } from '../../../../services/fetchLogs';
import { updateUserRole } from '../../../../services/userService';
import getRoleBadgeColor from '../../../../utils/roleBadgeColor';

export default function PermissionsPage() {
    const { data: allUsers, loading } = useFetch('/api/users');
    const [users, setUsers] = useState([]);
    const [adminUsers, setAdminUsers] = useState([]);
    const [role, setRole] = useState('All');

    useEffect(() => {
        if (allUsers) setUsers(allUsers);
    }, [allUsers]);

    useEffect(() => {
        if (role === 'All') {
            setAdminUsers(users);
        } else {
            fetchAdminUsers(role);
        }
    }, [role, users]);

    const roles = useMemo(() => {
        const uniqueRoles = new Set(users.map((u) => u.role));
        return Array.from(uniqueRoles);
    }, [users]);

    const handleRoleFilterChange = (e) => {
        setRole(e.target.value);
    };

    const fetchAdminUsers = async (role) => {
        try {
            const res = await fetchUsersByRole(role);
            setAdminUsers(res);
        } catch (error) {
            console.error('Error fetching admin users:', error);
            toast.error('Failed to fetch admin users');
        }
    };
    const updateRole = async (id, newRole) => {
        try {
            await updateUserRole(id, newRole);

            const updatedUsers = users.map((user) =>
                user._id === id ? { ...user, role: newRole } : user
            );
            setUsers(updatedUsers);

            const updatedAdminUsers = updatedUsers.filter((user) =>
                role === 'All' ? true : user.role === role
            );
            setAdminUsers(updatedAdminUsers);

            toast.success('Role updated successfully');
        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error(error.message || 'Failed to update role');
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">User Permissions</h1>
                    <p className="text-gray-600">Manage user roles and access levels for your application</p>
                </div>

                <FilterLog
                    roleFilter={role}
                    handleRoleFilterChange={handleRoleFilterChange}
                    filterOptions={roles}
                />

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <UserTable
                        users={adminUsers}
                        getRoleBadgeColor={getRoleBadgeColor}
                        updateRole={updateRole}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
