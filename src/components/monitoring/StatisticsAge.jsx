import React, { useState, useEffect } from 'react'
import MovieGraph from './MovieGraph';
import '../../styles/monitoring/Statistics.css'

const StatisticsAge = () => {
    const [data, setData] = useState([]);
    const [selectedAge, setSelectedAge] = useState('10');
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
                        className={`statistics-button ${selectedAge === '10' ? 'active' : ''}`}
                        onClick={() => setSelectedAge('10')}
                    >
                        10대
                    </div>
                    <div
                        className={`statistics-button ${selectedAge === '20' ? 'active' : ''}`}
                        onClick={() => setSelectedAge('20')}
                    >
                        20대
                    </div>
                    <div
                        className={`statistics-button ${selectedAge === '30' ? 'active' : ''}`}
                        onClick={() => setSelectedAge('30')}
                    >
                        30대
                    </div>
                    <div
                        className={`statistics-button ${selectedAge === '40' ? 'active' : ''}`}
                        onClick={() => setSelectedAge('40')}
                    >
                        40대
                    </div>
                </div>
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
                    <MovieGraph data={data}/>
                    <div className='graph-title'>추천 횟수</div>
                    <MovieGraph data={data}/>
                </div>
            </div>
        </div>
    )
}

export default StatisticsAge;
