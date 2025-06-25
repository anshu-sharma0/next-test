import React from 'react';
import { Filter } from 'lucide-react';

const FilterLog = ({ roleFilter, handleRoleFilterChange, filterOptions = [], paginatedData }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full md:w-1/2">
                    <label htmlFor="role-filter" className="sr-only">Filter by role</label>
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                        id="role-filter"
                        value={roleFilter}
                        onChange={handleRoleFilterChange}
                        className="appearance-none cursor-pointer w-full pl-10 pr-6 py-2 border border-gray-300 rounded-lg bg-white"
                    >
                        <option value="All">All Roles</option>
                        {['admin', 'editor', 'viewer'].map((role) => (
                            <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {paginatedData && (
                <div className="mt-4 text-sm text-gray-600">
                    Total: {paginatedData.total} results
                </div>
            )}
        </div>
    );
};

export default FilterLog;
