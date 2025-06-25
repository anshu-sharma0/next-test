'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { FilterLog, LogTable, Pagination } from '../../../components/layout';
import { fetcher } from '../../../utils/fetcher';

export default function AuditLogsPage() {
  const [role, setRole] = useState('All');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const roleParam = role !== 'All' ? `&role=${role}` : '';
  const query = `/api/admin/logs?limit=${limit}&offset=${(page - 1) * limit}${roleParam}`;

  const { data, isLoading } = useSWR(query, fetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: true,
    keepPreviousData: true,
  });

  const logs = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const filterOptions = ['admin', 'editor', 'viewer'];

  const handleRoleFilterChange = (e) => {
    setRole(e.target.value);
    setPage(1);
  };

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <FilterLog
          roleFilter={role}
          handleRoleFilterChange={handleRoleFilterChange}
          filterOptions={filterOptions}
          paginatedData={{ total }}
        />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <LogTable paginatedData={{ logs }} loading={isLoading} />
          </div>
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <Pagination
                goToPrevPage={goToPrevPage}
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                goToNextPage={goToNextPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
