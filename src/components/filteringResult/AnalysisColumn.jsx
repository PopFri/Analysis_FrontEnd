import React from 'react'
import '../../styles/filteringResult/AnalysisColumn.css'

const AnalysisColumn = ({columnList}) => {

    return (
        <div className='filtering-result-column-container'>
            <div className='filtering-result-column-list'>
                <div className='filtering-result-column-title'>
                    <p className='filtering-result-column-title-text'>분석 컬럼</p>
                </div>
                {columnList && (
                    <div className='filtering-result-column-wrapper'>
                        <div className='result-column-container'>
                            {columnList && columnList.map((column, index) => (
                                <div className='result-column-list' key={index}>
                                    <p className='result-column-name'>{column.columnName}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AnalysisColumn;
