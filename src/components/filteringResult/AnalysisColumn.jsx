import React from 'react'
import '../../styles/filteringResult/AnalysisColumn.css'

const AnalysisColumn = ({columnList}) => {

    return (
        <div className='filtering-analysis-container'>
            <div className='filtering-analysis-list'>
                <div className='filtering-analysis-title'>
                    <p className='filtering-analysis-title-text'>분석 컬럼</p>
                </div>
                {columnList && (
                    <div className='filtering-analysis-wrapper'>
                        <div className='analysis-container'>
                            {columnList && columnList.map((column, index) => (
                                <div className='analysis-list' key={index}>
                                    <p className='analysis-name'>{column.columnName}</p>
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
