import React, { useState, useEffect } from 'react'
import '../../styles/monitoring/Statistics.css'
import MovieGraph from './MovieGraph';

const StatisticsGender = () => {
    const [visitData, setVisitData] = useState([]);
    const [recommendData, setRecommendData] = useState([]);
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const [selectedGender, setSelectedGender] = useState('male');
    const [selectedOption, setSelecteOption] = useState('남성');
    const [selectedDay, setSelectedDay] = useState('day');
    const loadDwellTimeData = async (day, gender) => {
        try {
            const res = await fetch(`${Server_IP}/analysis/dwell-time?date=${day}&type=${gender}`, {
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
    const loadMovieData = async (day, gender) => {
        try {
            const res = await fetch(`${Server_IP}/analysis/visit?date=${day}&type=${gender}`, {
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
        await loadDwellTimeData(day, gender);
    };
    useEffect(() => {
        loadMovieData(selectedDay, selectedGender);
    }, [selectedGender, selectedDay]);
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
                    <MovieGraph data={visitData} criterion={'성별'} title={'선호 영화'} selectedDay={selectedDay}/>
                    <div className='graph-title'>체류시간</div>
                    <MovieGraph data={recommendData} criterion={'성별'} title={'체류시간'} selectedDay={selectedDay}/>
                </div>
            </div>
        </div>
    )
}

export default StatisticsGender;
