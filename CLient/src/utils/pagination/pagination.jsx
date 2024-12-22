import React from 'react';
import './pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <button 
                className="page-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <i className="fas fa-chevron-left"></i>
            </button>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    className={`page-btn ${currentPage === number ? 'active' : ''}`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}

            <button 
                className="page-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination;