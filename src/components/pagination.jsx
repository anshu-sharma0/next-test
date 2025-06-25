import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ goToPrevPage, limit, setLimit, page, setPage, totalPages, goToNextPage }) => {
  return (
    <div className="flex items-center justify-between w-full bg-white">
      <p className="text-md">Showing page {page} of {totalPages}</p>
      <div className='flex items-center space-x-4'>
        <div className="flex items-center space-x-2 mr-4">
          <label htmlFor="limit-select" className="text-sm text-gray-600">Items per page:</label>
          <select
            id="limit-select"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none  focus:border-blue-500"
          >
            {[10, 25, 50, 100].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
        <nav className="inline-flex shadow-sm rounded-md overflow-hidden" aria-label="Pagination">
          <button
            onClick={goToPrevPage}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex items-center cursor-pointer justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-r-0 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-gray-300">
            {page}
          </span>

          <button
            onClick={goToNextPage}
            disabled={page === totalPages}
            aria-label="Next page"
            className="flex items-center cursor-pointer justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-l-0 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Pagination
