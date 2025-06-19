import React from 'react'
import '../../styles/filteringResult/AnalysisColumn.css'

const FilteringConditionColumn = ({conditionList}) => {

    return (
        <div className='filtering-analysis-container'>
            <div className='filtering-analysis-list'>
                <div className='filtering-analysis-title'>
                    <p className='filtering-analysis-title-text'>필터링 조건</p>
                </div>
                <div className='filtering-analysis-wrapper'>
                    <div className='analysis-container'>
                        {conditionList && conditionList.map((column, index) => (
                            <div className='analysis-list' key={index}>
                                <p className='analysis-name'>{column.condition}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilteringConditionColumn;
