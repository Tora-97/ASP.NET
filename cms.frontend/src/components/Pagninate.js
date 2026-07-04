import React from 'react';

export default function Pagination({ totalPages, currentPage, onPageChange }) {
    return (
        <div className="flex justify-center gap-2 mt-8">
            <button 
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
                Trước
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-primary text-white' : ''}`}
                >
                    {index + 1}
                </button>
            ))}

            <button 
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
                Sau
            </button>
        </div>
    );
}