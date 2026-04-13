import React, { useState, useEffect } from 'react'
import '../../styles/monitoring/Statistics.css'
import MovieGraph from './MovieGraph';

const StatisticsTotal = () => {
    const type = 'default';
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const [visitData, setVisitData] = useState([]);
    const [recommendData, setRecommendData] = useState([]);
    const [selectedDay, setSelectedDay] = useState('day');
    const loadDwellTimeData = async (day) => {
        try {
            const res = await fetch(`${Server_IP}/analysis/dwell-time?date=${day}&type=${type}`, {
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
    const loadMovieData = async (day) => {
        try {
            const res = await fetch(`${Server_IP}/analysis/visit?date=${day}&type=${type}`, {
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
        await loadDwellTimeData(day);
    };

    useEffect(() => {
        loadMovieData(selectedDay);
    }, [selectedDay]);

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
                    <MovieGraph data={visitData} title={'선호 영화'} criterion={'전체'} selectedDay={selectedDay}/>
                    <div className='graph-title'>체류시간</div>
                    <MovieGraph data={recommendData} title={'체류시간'} criterion={'전체'} selectedDay={selectedDay}/>
                </div>
            </div>
        </div>
    )
}

export default StatisticsTotal;
