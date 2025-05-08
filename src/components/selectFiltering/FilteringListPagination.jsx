import React from 'react'
import '../../styles/selectFiltering/FilteringListPagination.css'

const FilteringListPagination = ({ page, setPage, totalPage }) => {
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
    <div className='condition-pagination-container'>
        <div className="condition-pagination-content">

        {/* 이전 블록 */}
        {startPage > 1 && (
            <button onClick={handlePrevBlock} className="condition-pagination-button">
                &lt;
            </button>
        )}

        {/* 숫자 페이지 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNum = startPage + i;
            return (
                <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`condition-pagination-button ${page === pageNum ? 'active' : ''}`}
                >
                    {pageNum}
                </button>
            );
        })}

        {/* 다음 블록 */}
        {endPage < totalPage && (
            <button onClick={handleNextBlock} className="condition-pagination-button">
                &gt;
            </button>
        )}
        </div>
    </div>
  )
}

export default FilteringListPagination;
