import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const ModernPagination = ({
  totalItems,
  itemsPerPage,
  totalPages,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  className = "",
}) => {
  const [localItemsPerPage, setLocalItemsPerPage] = useState(itemsPerPage);
  const [inputPage, setInputPage] = useState(currentPage);

  // Sync input with currentPage from parent
  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setLocalItemsPerPage(newItemsPerPage);
    if (onItemsPerPageChange) onItemsPerPageChange(newItemsPerPage);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * localItemsPerPage + 1;
  const endItem = Math.min(currentPage * localItemsPerPage, totalItems);
  const itemsPerPageOptions = [10, 25, 50, 100];

  return (
    <div
      className={`flex flex-col rounded-xl gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 sm:py-4 glass-card border-white/20 ${className}`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">
            Items per page
          </span>
          <select
            value={localItemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="px-2 py-1 text-sm rounded-md bg-black/40 border border-white/30 text-white/90 focus:outline-none focus:ring-2 focus:ring-[#EFFC76] focus:border-transparent"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <span className="text-sm text-white/70">
          {startItem}-{endItem} of {totalItems} items
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* First Page */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-8 h-8 rounded-md border border-white/30 bg-white/5 text-white hover:bg-white/15 hover:border-[#EFFC76]/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Go to first page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-md border border-white/30 bg-white/5 text-white hover:bg-white/15 hover:border-[#EFFC76]/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {/* Page Input */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onBlur={() => {
              const page = parseInt(inputPage, 10);
              if (!isNaN(page) && page >= 1 && page <= totalPages) {
                handlePageChange(page);
              } else {
                setInputPage(currentPage);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const page = parseInt(inputPage, 10);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                  handlePageChange(page);
                } else {
                  setInputPage(currentPage);
                }
              }
            }}
            className="w-14 h-8 px-2 text-center text-sm rounded-md bg-black/40 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#EFFC76] focus:border-transparent"
          />
          <span className="text-sm text-white/70">
            of {totalPages}
          </span>
        </div>

        {/* Next Page */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-md border border-white/30 bg-white/5 text-white hover:bg-white/15 hover:border-[#EFFC76]/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next page"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-8 h-8 rounded-md border border-white/30 bg-white/5 text-white hover:bg-white/15 hover:border-[#EFFC76]/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Go to last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ModernPagination;
