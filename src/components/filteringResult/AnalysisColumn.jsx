import React, { useEffect, useState } from 'react'
import { columnData } from '../../../public/data/columnTable'
import '../../styles/filteringResult/AnalysisColumn.css'

const AnalysisColumn = () => {
    const [seletedProcess, setSelectedProcess] = useState(false);
    const [columnList, setColumnList] = useState(null);
    useEffect(() => {
        setSelectedProcess(true);
        setColumnList(columnData.result);
      }, []);

    return (
        <div className='filtering-result-column-container'>
            <div className='filtering-result-column-list'>
                <div className='filtering-result-column-title'>
                    <p className='filtering-result-column-title-text'>분석 컬럼</p>
                </div>
                {seletedProcess && (
                    <div className='filtering-result-column-wrapper'>
                        <div className='result-column-container'>
                            {columnList && columnList.map((column, index) => (
                                <div className='result-column-list' key={index}>
                                    <p className='result-column-name'>{column.name}</p>
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
