import React, { useState, useEffect } from 'react'
import MovieGraph from './MovieGraph';
import '../../styles/monitoring/Statistics.css'

const StatisticsAge = () => {
    const [visitData, setVisitData] = useState([]);
    const [recommendData, setRecommendData] = useState([]);
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const [selectedAge, setSelectedAge] = useState('10');
    const [selectedDay, setSelectedDay] = useState('day');
    const loadDwellTimeData = async (day, age) => {
        try {
            const res = await fetch(`${Server_IP}/analysis/dwell-time?date=${day}&type=${age}`, {
                method: 'GET',
            });
            const data = await res.json();
            setRecommendData(data.result);
            if (!res.ok || !data.isSuccess) {
                alert(data.message);
                return;
            }
        } catch {
            alert("데이터 로드 중 오류가 발생했습니다.");
        }
    };
    const loadMovieData = async (day, age) => {
        try {
            const res = await fetch(`${Server_IP}/analysis/visit?date=${day}&type=${age}`, {
                method: 'GET',
            });
            const data = await res.json();
            setVisitData(data.result);
            if (!res.ok || !data.isSuccess) {
                alert(data.message);
                return;
            }
        } catch {
            alert("데이터 로드 중 오류가 발생했습니다.");
        }
        await loadDwellTimeData(day, age);
    };
    useEffect(() => {
        loadMovieData(selectedDay, selectedAge);
    }, [selectedAge, selectedDay]);
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
            <div className='selected-option'>
                {selectedAge}대
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
                    <MovieGraph data={visitData} criterion={'연령별'} title={'선호 영화'} selectedDay={selectedDay}/>
                    <div className='graph-title'>체류시간</div>
                    <MovieGraph data={recommendData} criterion={'연령별'} title={'체류시간'} selectedDay={selectedDay}/>
                </div>
            </div>
        </div>
    )
}

export default StatisticsAge;
