import React from 'react';
import { useRecoilState } from 'recoil';
import { leadCenterCurrentPageState } from '../../../state/leadsCenterState';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ totalItems, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useRecoilState(leadCenterCurrentPageState);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // Don't render if only one page or less

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  // Generate page numbers to display (e.g., 1 ... 4 5 6 ... 10)
  const getPageNumbers = () => {
     const pages = [];
     const maxPagesToShow = 5; // Includes first, last, current, and ellipsis
     const halfMaxPages = Math.floor(maxPagesToShow / 2);

     if (totalPages <= maxPagesToShow + 2) { // Show all pages if total is small
          for (let i = 1; i <= totalPages; i++) {
             pages.push(i);
         }
     } else {
         pages.push(1); // Always show first page
          let startPage = Math.max(2, currentPage - halfMaxPages + (currentPage > totalPages - halfMaxPages ? maxPagesToShow - (totalPages - currentPage) -1 : 0 ) );
          let endPage = Math.min(totalPages - 1, currentPage + halfMaxPages - (currentPage < halfMaxPages+1 ? maxPagesToShow - currentPage : 0));


          if(currentPage > halfMaxPages + 2) pages.push('...'); // Ellipsis before

         for (let i = startPage; i <= endPage; i++) {
              pages.push(i);
          }

          if (currentPage < totalPages - halfMaxPages -1) pages.push('...'); // Ellipsis after

         pages.push(totalPages); // Always show last page
     }


     return pages;
  }

  const pageNumbers = getPageNumbers();


  return (
    <div className="flex items-center justify-end mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 border rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft size="0.8em" />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={page === '...'}
          className={`px-3 py-1 mx-1 border rounded text-sm
            ${currentPage === page ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 hover:bg-gray-100'}
            ${page === '...' ? 'cursor-default opacity-50' : ''}
          `}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 border rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronRight size="0.8em" />
      </button>
    </div>
  );
};

export default Pagination;