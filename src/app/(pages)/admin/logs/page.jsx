'use client';
import Loader from '../../../../components/Loader';
import { FilterLog, LogTable, Pagination } from '../../../../components/component';
import { usePaginatedLogs } from '../../../../hooks/usePaginatedLogs';

export default function AuditLogsPage() {
  const {
    paginatedData,
    filterOptions,
    roleFilter,
    handleRoleFilterChange,
    goToNextPage,
    goToPrevPage,
    page,
    totalPages,
    loading
  } = usePaginatedLogs();

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <FilterLog roleFilter={roleFilter} handleRoleFilterChange={handleRoleFilterChange} filterOptions={filterOptions} paginatedData={paginatedData} />
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <LogTable paginatedData={paginatedData} />
          </div>
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <p className='text-md'>Showing page {page} of {totalPages}</p>
              <Pagination goToPrevPage={goToPrevPage} page={page} paginatedData={paginatedData} goToNextPage={goToNextPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
