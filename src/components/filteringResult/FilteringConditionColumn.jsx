import React from 'react'
import '../../styles/filteringResult/AnalysisColumn.css'

const FilteringConditionColumn = ({conditionList}) => {

    return (
        <div className='filtering-analysis-column-container'>
            <div className='filtering-analysis-column-list'>
                <div className='filtering-analysis-column-title'>
                    <p className='filtering-analysis-column-title-text'>필터링 조건</p>
                </div>
                <div className='filtering-analysis-column-wrapper'>
                    <div className='analysis-column-container'>
                        {conditionList && conditionList.map((column, index) => (
                            <div className='analysis-column-list' key={index}>
                                <p className='analysis-column-name'>{column.condition}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilteringConditionColumn;
