import React, { useState, useEffect } from 'react'
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
import MovieGraph from './MovieGraph';

const StatisticsTotal = () => {
    const [data, setData] = useState([]);
    const [selectedGender, setSelectedGender] = useState('male');
    const [selectedOption, setSelecteOption] = useState('남성');
    const [selectedDay, setSelectedDay] = useState('day');
    const CustomLabel = ({ x, y, width, value }) => {
        const padding = 6;
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
                    <div
                        className={`statistics-button ${selectedGender === 'male' ? 'active' : ''}`}
                        onClick={() => {setSelectedGender('male'); setSelecteOption('남성')}}
                    >
                        남성
                    </div>
                    <div
                        className={`statistics-button ${selectedGender === 'female' ? 'active' : ''}`}
                        onClick={() => {setSelectedGender('female'); setSelecteOption('여성')}}
                    >
                        여성
                    </div>
                </div>
            </div>
            <div className='selected-option'>
                {selectedOption}
                <div className='selected-option-text'> 활동 통계</div>
            </div>
            <div className="date-range-toggle">
                <div className='toggle-button-container'>
                    <div
                        className={`toggle-button ${selectedDay === 'day' ? 'active' : ''}`}
                        onClick={() => setSelectedDay('day')}
                    >
                        일간
                    </div>
                    <div
                        className={`toggle-button ${selectedDay === 'week' ? 'active' : ''}`}
                        onClick={() => setSelectedDay('week')}
                    >
                        주간
                    </div>
                    <div
                        className={`toggle-button ${selectedDay === 'month' ? 'active' : ''}`}
                        onClick={() => setSelectedDay('month')}
                    >
                        월간
                    </div>
                </div>
            </div>
            <div className='statistics-graph'>
                <div className='statistics-graph-container'>
                    <div className='graph-title'>선호 영화</div>
                    <MovieGraph data={data} title={'선호 영화'}/>
                    <div className='graph-title'>추천 횟수</div>
                    <MovieGraph data={data} title={'추천 횟수'}/>
                </div>
            </div>
        </div>
    )
}

export default StatisticsTotal;
