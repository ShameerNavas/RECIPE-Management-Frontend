import React from "react";
import "./Pagination.css";

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages === 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination-container">
      <button className="page-btn" onClick={handlePrev} disabled={currentPage === 1}>
        &lt;&lt;
      </button>

      <button className="page-btn">
        {currentPage}
      </button>

      <button className="page-btn" onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;&gt;
      </button>
    </div>
  );
}
