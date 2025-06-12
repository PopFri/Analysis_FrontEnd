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

    const { processId } = useParams();
    const Server_IP = import.meta.env.VITE_SERVER_IP;

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
            setLogDataList(data.result);
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
        </div>
    );
};

export default OutputResult;