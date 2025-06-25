import React from 'react';
import formatTimestamp from '../../utils/timeStamp';
import getRoleBadgeColor from '../../utils/roleBadgeColor';
import Loader from '../Loader';

const LogTable = ({ paginatedData, loading = false }) => {
    const logs = paginatedData?.logs || [];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                    <tr>
                        {['Name', 'Email', 'Role', 'Action', 'Last Updated', 'Platform'].map((heading) => (
                            <th
                                key={heading}
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
            </table>

            <div className="h-[400px] overflow-y-auto border border-t-0 border-gray-200 rounded-b-md">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="py-10 text-center">
                                    <Loader />
                                </td>
                            </tr>
                        ) : logs.length > 0 ? (
                            logs.map((log) => (
                                <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 py-4 w-1/5">
                                        <div className="text-sm font-medium text-gray-900">{log.name}</div>
                                    </td>
                                    <td className="px-3 py-4 w-1/5">
                                        <div className="text-sm font-medium text-gray-900">{log.email}</div>
                                    </td>
                                    <td className="px-3 py-4 w-1/5">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(log.role)}`}>
                                            {log.role}
                                        </span>
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-900 w-1/5">
                                        {log.action || 'N/A'}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500 w-1/5">
                                        {formatTimestamp(log.updatedAt)}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500 w-1/5">
                                        <span className="text-xs text-gray-400">{log.meta?.platform?.split(' ')[0] || 'N/A'}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-10 text-center text-gray-500">
                                    No logs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LogTable;
