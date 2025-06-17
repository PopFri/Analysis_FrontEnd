import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/filteringResult/OutputResult.css';
import ResultPagination from './ResultPagination';

const OutputResult = ({ columnList }) => {
    const [sortIndex, setSortIndex] = useState("index");
    const [sortOrder, setSortOrder] = useState("ASC");
    const [sortResetButton, setSortResetButton] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [logDataList, setLogDataList] = useState([]);
    const [dataType, setDataType] = useState("success");
    const [successOrFailData, setSuccessOrFailData] = useState([]);
    const [totalDataCount, setTotalDataCount] = useState([]);
    const [recordDataModal, setRecordDataModal] = useState(false);
    const [modalPage, setModalPage] = useState(1);

    const { processId } = useParams();
    const Server_IP = import.meta.env.VITE_SERVER_IP;

    const recordModalHandler = () => {
        setRecordDataModal(prev => !prev);
    }

    function formatTimestamp(input) {
        if (!input) return "";

        const [datePart, timePart] = input.split('T'); 
        if (!datePart || !timePart) return "";

        const [time, micros] = timePart.split('.'); 
        const millis = micros ? micros.slice(0, 2) : "00"; 

        return `${datePart} ${time}.${millis}`;
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
            setSuccessOrFailData(data.result.data);
            setTotalDataCount(data.result.totalCount);
        } catch {
            alert("데이터 로드 오류가 발생했습니다.");
        }
    };

    const loadLogData = async () => {
        try {
            const res = await fetch(`${Server_IP}/api/v1/result/${processId}`, {
                method: 'GET',
            });
            const data = await res.json();

            if (!res.ok || !data.isSuccess) {
                alert(data.message);
                return;
            }
            setLogDataList(data.result);
            const itemCount = data.result.length;
            const itemsPerPage = 12;
            const total = Math.ceil(itemCount / itemsPerPage);
            setTotalPage(total);
        } catch {
            alert("데이터 로드 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        loadLogData();
    }, []);

    useEffect(() => {
        loadResultData(modalPage - 1);
    }, [modalPage, dataType]);

    const indexColor = (index) => {
        return sortIndex === index ? '#1ED863' : '#FFFFFF';
    };

    const sortingHandler = async (index) => {
        const newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
        setSortIndex(index);
        setSortOrder(newOrder);
        setSortResetButton(true);
        try {
            const res = await fetch(`${Server_IP}/api/v1/result/${processId}?column=${index}&order=${newOrder}`, {
                method: 'GET',
            });
            const data = await res.json();

            if (!res.ok || !data.isSuccess) {
                alert(data.message);
                return;
            }
            setLogDataList(data.result.data);
            const itemCount = data.result.length;
            const itemsPerPage = 12;
            const total = Math.ceil(itemCount / itemsPerPage);
            setTotalPage(total);
        } catch {
            alert("데이터 정렬 중 오류가 발생했습니다.");
        }
    };

    const sortResetHandler = () => {
        setSortResetButton(false);
        setSortIndex("index");
        setSortOrder("ASC");
        loadLogData();
    };

    return (
        <div className="output-result-container">
            <div className="result-list">
                <div className="result-title">
                    <p className="result-title-text">결과 출력</p>
                    <div className='result-record-modal-button' onClick={() => recordModalHandler()}>더보기</div>
                </div>
                <div className="table-sorting">
                    <img src="/images/sortingIcon.png" className="table-sorting-icon" />
                    <div className="table-sorting-orderby">ORDER BY</div>
                    <div className="table-sorting-index">{sortIndex}</div>
                    <div className="table-sorting-order">{sortOrder}</div>
                    {sortResetButton && (
                        <div className="sort-reset-button-container">
                            <button className="sort-reset-button" onClick={sortResetHandler}>
                                <img src="/images/btnCancelRed.png" className="sort-reset-button-icon" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="result-list-table">
                    <div className="result-table">
                        <div className="table-row table-header">
                            <div className="table-cell index-header-cell" />
                            {columnList.map((column, idx) => (
                                <div
                                    className="table-cell header-cell"
                                    key={idx}
                                    style={{ color: indexColor(column.columnName) }}
                                >
                                    {column.columnName}
                                    <button
                                        className="select-table-button"
                                        onClick={() => sortingHandler(column.columnName)}
                                    >
                                        <img src="/images/icon-park-solid_sort.png" className="select-table-icon" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {logDataList
                            .slice((page - 1) * 12, page * 12)
                            .map((data, rowIdx) => {
                                const columnMap = {};
                                data.columnList.forEach(col => {
                                    if (!(col.name in columnMap)) {
                                        columnMap[col.name] = col.value;
                                    }
                                });

                                return (
                                    <div className="table-row" key={rowIdx}>
                                        <div className="table-cell index-cell">
                                            {(page - 1) * 12 + rowIdx + 1}
                                        </div>
                                        {columnList.map((column, colIdx) => (
                                            <div className="table-cell" key={colIdx}>
                                                {columnMap[column.columnName] || '-'}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <ResultPagination page={page} setPage={setPage} totalPage={totalPage} />
            </div>
            {recordDataModal && (
                <div className="result-record-table-modal">
                    <div className="record-modal-content">
                        <div className="record-modal-data-title">
                            {dataType} Data List
                        </div>
                        <div className="record-modal-scroll-area">
                            {successOrFailData && successOrFailData.length > 0 ? (
                                successOrFailData.map((data, index) => (
                                <div className="record-group-modal" key={index}>
                                    <div className="record-date">
                                        {formatTimestamp(data.createdAt)} (LogId: {data.logId}) 
                                    </div> 
                                    
                                    {data.dataList.map((item, idx) => (
                                        <div key={idx}>
                                            <div className="record-table-row"> 
                                                <div className="record-modal-column">
                                                    {item.column}
                                                </div>
                                                <div className="record-modal-value">
                                                    {item.value}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                ))
                            ) : (
                                <div className="record-no-data">
                                    <div className="record-no-data-text">데이터가 없습니다.</div>
                                </div>
                            )}
                        </div>
                        {successOrFailData && successOrFailData.length > 0 ? (
                        <ResultPagination
                            page={modalPage}
                            setPage={setModalPage}
                            totalPage={Math.max(1, Math.ceil(Number(totalDataCount || 0) / 12))}
                        />
                        ) : (
                        <div className="pagination-spacer" /> 
                        )}
                        <div className="record-modal-button-container">
                            <div className="record-modal-button" style={{ backgroundColor: "#1ED863" }} onClick={() => setDataType("success")}>성공 데이터</div>
                            <div className="record-modal-button" style={{ backgroundColor: "#C73131" }} onClick={() => setDataType("fail")}>실패 데이터</div>
                        </div>
                        <div className="record-modal-cancel-button" onClick={recordModalHandler}>취소</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OutputResult;