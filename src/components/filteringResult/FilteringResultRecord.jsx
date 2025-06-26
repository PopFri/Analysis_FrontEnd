import '../../styles/filteringResult/FilteringResultRecord.css'

const FilteringResultRecord = ({resultData}) => {

    return (
        <div className='filtering-result-record-container'>
            <div className='result-record-wrapper'>
                <div className='result-record-title'>
                    <p className='result-record-title-text'>필터링 결과 기록</p>
                </div>
                <div className="result-record-table">
                    <div className="record-title">resultData</div>
                    <div  className="record-table-wrapper"> 
                        <div className="record-group">
                            <div className="record-table-row"> 
                                <div className="record-header-condition">
                                    CONDITION
                                </div>
                                <div className="record-header-count">
                                    TRUE
                                </div>
                                <div className="record-header-count">
                                    FALSE
                                </div>
                            </div>
                        </div>
                        {resultData.map((data, index) => (
                            <div className="record-table-row"key={index}> 
                                <div className="record-table-condition">
                                    {data.condition}
                                </div>
                                <div className="record-table-count">
                                    {data.successCount}
                                </div>
                                <div className="record-table-count">
                                    {data.failedCount}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilteringResultRecord;
