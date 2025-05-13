import React, { useEffect, useState } from 'react'
import { resultRecordData } from '../../../public/data/columnTable'
import '../../styles/filteringResult/FilteringResultRecord.css'

const FilteringResultRecord = () => {
    const [recordData, setRecordData] = useState([]);

    useEffect(() => {
        setRecordData(resultRecordData.result.data)
    }, [])
    return (
        <div className='filtering-result-record-container'>
            <div className='result-record-wrapper'>
                <div className='result-record-title'>
                    <p className='result-record-title-text'>필터링 결과 기록</p>
                </div>
                <div className="result-record-table">
                    {recordData.map((data, index) => (
                    <div className="record-group" key={index}>
                        <div className="record-date">{data.date}</div> {/* 날짜 표시 */}
                            {data.dataList.map((item, idx) => (
                        <div className="record-table-row" key={idx}> 
                            <div className="record-table-condition">
                                {item.condition}
                            </div>
                            <div className="record-table-count">
                                {item.count}
                            </div>
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FilteringResultRecord;
