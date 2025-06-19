import React from 'react'
import '../../styles/filteringResult/AnalysisColumn.css'

const AnalysisColumn = ({columnList}) => {

    return (
        <div className='filtering-analysis-column-container'>
            <div className='filtering-analysis-column-list'>
                <div className='filtering-analysis-column-title'>
                    <p className='filtering-analysis-column-title-text'>분석 컬럼</p>
                </div>
                {columnList && (
                    <div className='filtering-analysis-column-wrapper'>
                        <div className='analysis-column-container'>
                            {columnList && columnList.map((column, index) => (
                                <div className='analysis-column-list' key={index}>
                                    <p className='analysis-column-name'>{column.columnName}</p>
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
