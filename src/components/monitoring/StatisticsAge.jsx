import React, { useState, useEffect } from 'react'
import MovieGraph from './MovieGraph';
import '../../styles/monitoring/Statistics.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const StatisticsAge = () => {
    const [data, setData] = useState([]);
    const CustomLabel = ({ x, y, width, value }) => {
        const padding = 6;
        const minOffset = 40;
        const labelX = x + width + padding;

        return (
            <text
            x={labelX}
            y={y + 10}
            fill="#ffffff"
            fontSize={14}
            textAnchor="start"
            >
            {value}분
            </text>
        );
    };
    useEffect(() => {
        fetch('/data/movieData.json')
            .then((res) => res.json())
            .then((json) => {
                setData(json.result.data); // ✅ 데이터 배열 추출
            })
            .catch((err) => console.error('데이터 로딩 실패:', err));
    }, []);
    return (
        <div className='statistics-container'>
            <div className='statistics-button-container'>
                <div className='statistics-button-wrapper'>
                    <div className='statistics-button'>10대</div>
                    <div className='statistics-button'>20대</div>
                    <div className='statistics-button'>30대</div>
                    <div className='statistics-button'>40대</div>
                </div>
            </div>
            <div className="date-range-toggle">
                <div className='toggle-button-container'>
                    <div className="toggle-button active">일간</div>
                    <div className="toggle-button">주간</div>
                    <div className="toggle-button">월간</div>
                </div>
            </div>
            <div className='statistics-graph'>
                <div className='statistics-graph-container'>
                    <div className='graph-title'>선호 영화</div>
                    <MovieGraph />
                    <div className='graph-title'>추천 횟수</div>
                    <MovieGraph />
                </div>
            </div>
        </div>
    )
}

export default StatisticsAge;
