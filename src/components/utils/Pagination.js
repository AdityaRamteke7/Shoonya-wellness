// src/components/Pagination.js
import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import './Pagination.css';

const Pagination = () => {
    const { currentPage, totalPages, handleNextPage, handlePreviousPage } = useContext(DataContext);

    return (
        <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
