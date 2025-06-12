import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../../styles/filteringResult/FilteringResultRecord.css'
import ResultPagination from './ResultPagination';

const FilteringResultRecord = ({resultData}) => {
    const [dataType, setDataType] = useState("success");
    const [successOrFailData, setSuccessOrFailData] = useState([]);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [recordDataModal, setRecordDataModal] = useState(false);
    const [page, setPage] = useState(1);
    const { processId } = useParams();
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    

    const recordModalHandler = () => {
        setRecordDataModal(prev => !prev);
    }

    const loadResultData = async (page) => {
        try {
            const res = await fetch(`${Server_IP}/api/v1/result/record/${dataType}?processId=${processId}&page=${page}`, {
                method: 'GET',
            });
            const data = await res.json();
            
            if (!res.ok || !data.isSuccess) {
                alert(data.message); 
                return;
            }
            setSuccessOrFailData(data.result.dataList);
            setTotalDataCount(data.result.totalDataCount);
        } catch {
            alert("데이터 로드 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        loadResultData(page);
    }, [page, dataType]);

    return (
        <div className='filtering-result-record-container'>
            <div className='result-record-wrapper'>
                <div className='result-record-title'>
                    <p className='result-record-title-text'>필터링 결과 기록</p>
                    <div className='result-record-modal-button' onClick={() => recordModalHandler()}>더보기</div>
                </div>
                <div className="result-record-table">
                    <div className="record-title">resultData</div> 
                    <div className="record-group">
                        <div className="record-table-row"> 
                            <div className="record-table-condition">
                                condition
                            </div>
                            <div className="record-table-count">
                                success
                            </div>
                            <div className="record-table-count">
                                fail
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
            {recordDataModal && (
                <div className="result-record-table-modal">
                    <div className="record-modal-content">
                        <div className="record-modal-data-title">
                            {dataType} Data List
                        </div>
                        <div className="record-modal-total-count">
                            total data count : {totalDataCount}
                        </div>
                        <div className="record-modal-scroll-area">
                            {successOrFailData && successOrFailData.length > 0 ? (
                                successOrFailData.map((data, index) => (
                                <div className="record-group-modal" key={index}>
                                    <div className="record-date">{data.createdAt}</div> 
                                    <div className="record-table-row"> 
                                        <div className="record-modal-column">
                                            {data.column}
                                        </div>
                                        <div className="record-modal-value">
                                            {data.value}
                                        </div>
                                    </div>
                                </div>
                                ))
                            ) : (
                                <div className="record-no-data">
                                    <div className="record-no-data-text">
                                        데이터가 없습니다.
                                    </div>
                                </div>
                            )}
                        </div>
                        <ResultPagination page={page} setPage={setPage} totalPage={Math.ceil(totalDataCount/12)} />
                        <div className="record-modal-button-container">
                            <div className="record-modal-button" style={{ backgroundColor: "#1ED863" }} onClick={() => setDataType("success")}>성공 데이터</div>
                            <div className="record-modal-button" style={{ backgroundColor: "#C73131" }} onClick={() => setDataType("fail")}>실패 데이터</div>
                        </div>
                        <div className="record-modal-cancel-button" onClick={recordModalHandler}>취소</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilteringResultRecord;
