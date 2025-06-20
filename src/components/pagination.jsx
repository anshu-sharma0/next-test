import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({goToPrevPage, page, paginatedData, goToNextPage}) => {
  return (
    <div>
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={goToPrevPage}
                    disabled={page === 1}
                    className="relative inline-flex items-center cursor-pointer px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    className={`relative inline-flex items-center px-4 py-2  border border-gray-300 text-sm font-medium z-10 bg-blue-50 text-blue-600`}
                  >
                    {page}
                  </button>

                  <button
                    onClick={goToNextPage}
                    disabled={page === paginatedData.totalPages}
                    className="relative inline-flex items-center cursor-pointer px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
    </div>
  )
}

export default Pagination