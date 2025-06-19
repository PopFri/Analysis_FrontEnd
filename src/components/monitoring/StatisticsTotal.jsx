import React, { useState, useEffect } from 'react'
import '../../styles/monitoring/Statistics.css'
import MovieGraph from './MovieGraph';

const StatisticsTotal = () => {
    const type = 'default';
    const Service_Server_IP = import.meta.env.VITE_SERVICE_SERVER_IP;
    const [visitData, setVisitData] = useState([]);
    const [recommendData, setRecommendData] = useState([]);
    const [selectedDay, setSelectedDay] = useState('day');
    const loadMovieData = async () => {
        try {
            const res = await fetch(`${Service_Server_IP}/sse/analysis/visit?date=${selectedDay}&type=${type}`, {
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

        try {
            const res = await fetch(`${Service_Server_IP}/sse/analysis/recommend?date=${selectedDay}&type=${type}`, {
                method: 'GET',
            });
            const data = await res.json();
            setRecommendData(data.result);
            if (!res.ok || !data.isSuccess) {
                console.error("데이터 로드 실패:", data.message);
                alert(data.message); 
                return;
            }

        } catch {
            alert("데이터 로드 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        if (selectedDay === 'day') {
            const visitAnalysisSource = new EventSource(`${Service_Server_IP}/sse/visit-analysis?type=${type}`);
            const recommendAnalysisSource = new EventSource(`${Service_Server_IP}/sse/recommend-analysis?type=${type}`);

            visitAnalysisSource.addEventListener(`visit-analysis-${type}`, (e) => {
                const data = JSON.parse(e.data);
                console.log("📊 visit-analysis 이벤트 수신:", data);
                setVisitData(data);
            });

            recommendAnalysisSource.addEventListener(`recommend-analysis-${type}`, (e) => {
                const data = JSON.parse(e.data);
                console.log("📊 recommend-analysis 이벤트 수신:", data);
                setRecommendData(data);
            });

            visitAnalysisSource.onerror = (err) => {
                console.error("❌ SSE visit-analysis 오류:", err);
                visitAnalysisSource.close();
            };

            recommendAnalysisSource.onerror = (err) => {
                console.error("❌ SSE recommend-analysis 오류:", err);
                recommendAnalysisSource.close();
            }

            return () => {
                visitAnalysisSource.close();
                recommendAnalysisSource.close();
            };
        } else {
            loadMovieData();
        }
        
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
                    <div className='graph-title'>추천 횟수</div>
                    <MovieGraph data={recommendData} title={'추천 횟수'} criterion={'전체'} selectedDay={selectedDay}/>
                </div>
            </div>
        </div>
    )
}

export default StatisticsTotal;
