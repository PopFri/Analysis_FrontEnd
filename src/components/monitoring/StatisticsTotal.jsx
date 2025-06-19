import React, { useState, useEffect } from 'react'
import '../../styles/monitoring/Statistics.css'
import MovieGraph from './MovieGraph';

const StatisticsTotal = () => {
    const [data, setData] = useState([]);
    const [selectedDay, setSelectedDay] = useState('day');
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
                        className='statistics-button active'
                        style={{ width: '100%' }}
                    >
                        전체 데이터
                    </div>
                </div>
            </div>
            <div className='selected-option'>
                전체
                <div className='selected-option-text'> 활동 통계</div>
            </div>
            <div className="date-range-toggle">
                <div className='toggle-button-container'>
                    <div
                        className={`toggle-button ${selectedDay === 'day' ? 'live' : ''}`}
                        onClick={() => setSelectedDay('day')}
                    >
                        실시간
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
                    <MovieGraph data={data} title={'선호 영화'} criterion={'전체'} selectedDay={selectedDay}/>
                    <div className='graph-title'>추천 횟수</div>
                    <MovieGraph data={data} title={'추천 횟수'} criterion={'전체'} selectedDay={selectedDay}/>
                </div>
            </div>
        </div>
    )
}

export default StatisticsTotal;
