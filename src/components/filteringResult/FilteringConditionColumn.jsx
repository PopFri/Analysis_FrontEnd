import React, { useEffect, useState } from 'react'
import { conditionData } from '../../../public/data/columnTable'
import '../../styles/filteringResult/AnalysisColumn.css'

const FilteringConditionColumn = () => {
    const [conditionList, setConditionList] = useState(null);
    useEffect(() => {
        setConditionList(conditionData.result);
      }, []);

    return (
        <div className='filtering-analysis-container'>
            <div className='filtering-result-column-list'>
                <div className='filtering-result-column-title'>
                    <p className='filtering-result-column-title-text'>필터링 조건</p>
                </div>
                <div className='filtering-result-column-wrapper'>
                    <div className='result-column-container'>
                        {conditionList && conditionList.map((column, index) => (
                            <div className='result-column-list' key={index}>
                                <p className='result-column-name'>{column.condition}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilteringConditionColumn;
