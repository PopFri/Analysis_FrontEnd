import React from 'react'
import '../../styles/filteringResult/ResultPagination.css'

const ResultPagination = ({ page, setPage, totalPage }) => {
    const blockSize = 5;
    const currentBlock = Math.floor((page - 1) / blockSize);
    const startPage = currentBlock * blockSize + 1;
    const endPage = Math.min(startPage + blockSize - 1, totalPage);

    const handlePrevBlock = () => {
        if (startPage > 1) setPage(startPage - 1);
    };

    const handleNextBlock = () => {
        if (endPage < totalPage) setPage(endPage + 1);
    };

  return (
    <div className='result-pagination-container'>
        <div className="result-pagination-content">

        {startPage > 1 && (
            <button onClick={handlePrevBlock} className="result-pagination-button">
                &lt;
            </button>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNum = startPage + i;
            return (
                <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`result-pagination-button ${page === pageNum ? 'active' : ''}`}
                >
                    {pageNum}
                </button>
            );
        })}

        {endPage < totalPage && (
            <button onClick={handleNextBlock} className="result-pagination-button">
                &gt;
            </button>
        )}
        </div>
    </div>
  )
}

export default ResultPagination;
