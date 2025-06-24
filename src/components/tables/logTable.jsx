import React from 'react'
import formatTimestamp from '../../utils/timeStamp'
import getRoleBadgeColor from '../../utils/roleBadgeColor'

const LogTable = ({ paginatedData }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                            Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                            Last Updated
                        </th>
                    </tr>
                </thead>
            </table>

            <div className="h-[400px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.logs.map((log) => (
                            <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap w-1/4">
                                    <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900">{log.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap w-1/6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(log.role)}`}>
                                        {log.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/3">
                                    {log.action || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/4">
                                    <div className="flex items-center">
                                        {formatTimestamp(log.updatedAt)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LogTable