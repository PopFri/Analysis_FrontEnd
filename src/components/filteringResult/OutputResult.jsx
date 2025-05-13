import React, { useEffect, useState } from 'react';
import { resultData } from '../../../public/data/columnTable';
import '../../styles/filteringResult/OutputResult.css';
import ResultPagination from './ResultPagination';

const OutputResult = () => {
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [sortIndex, setSortIndex] = useState("index");
    const [sortOrder, setSortOrder] = useState("ASC")
    const [sortResetButton, setSortResetButton] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const indexColor = (index) => {
        if(sortIndex == index) return '#1ED863';
        else return '#FFFFFF';
    }

    const sortingHandler = (index) => {
        setSortIndex(index);
        setSortResetButton(true);
        if(sortOrder == "ASC") setSortOrder("DESC");
        else setSortOrder("ASC");
    }

    const sortResetHandler = () => {
        setSortResetButton(false);
        setSortIndex("index");
        setSortOrder("ASC");
    }
    useEffect(() => {
        const result = resultData.result;
        setTotalPage(result.totalPage);
        if (Array.isArray(result.data) && result.data.length > 0) {
        // 첫 번째 row에서 키 추출
        const headerKeys = Object.keys(result.data[0]);
        setHeaders(headerKeys);

        // row 목록 세팅
        setRows(result.data);
        }
    }, [sortOrder, page]);

    return (
        <div className="output-result-container">
            <div className="result-list">
                <div className="result-title">
                    <p className="result-title-text">결과 출력</p>
                </div>
                <div className="table-sorting">
                    <img src="/images/sortingIcon.png" className="table-sorting-icon" />
                    <div className="table-sorting-orderby">
                        ORDER BY
                    </div>
                    <div className="table-sorting-index">
                        {sortIndex}
                    </div>
                    <div className="table-sorting-order">
                        {sortOrder}
                    </div>
                    {sortResetButton && (
                        <div className="sort-reset-button-container">
                            <button className="sort-reset-button" onClick={() => sortResetHandler()}>
                                <img src="/images/btnCancelRed.png" className="sort-reset-button-icon" />
                            </button>
                        </div>
                    )}
                </div>
                <div className="result-list-table">
                    <div className="result-table">
                        <div className="table-row table-header">
                                <div className="table-cell index-header-cell" >
                                </div>
                            {headers.map((key, idx) => (
                                <div className="table-cell header-cell" key={idx} style={{color: `${indexColor(key)}`}}>
                                    {key}
                                    <button className="select-table-button" onClick={() => sortingHandler(key)}>
                                        <img src="/images/icon-park-solid_sort.png" className="select-table-icon" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {rows.map((row, rowIdx) => (
                        <div className="table-row" key={rowIdx}>
                            <div className="table-cell index-cell" >{rowIdx + 1 + ((page - 1) * 20)}</div>
                            {headers.map((key, colIdx) => (
                                <div className="table-cell" key={colIdx}>
                                    {row[key]}
                                </div>
                            ))}
                        </div>
                        ))}
                    </div>
                </div>
                <ResultPagination page={page} setPage={setPage} totalPage={totalPage} />
            </div>
        </div>
    );
};

export default OutputResult;