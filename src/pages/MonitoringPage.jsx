import React, { useState, useEffect} from 'react'
import '../styles/monitoring/Monitoring.css'
import Header from '../components/Header'
import DataGraph from '../components/monitoring/DataGraph';
import ProcessGraph from '../components/monitoring/ProcessGraph';
import StatisticsGender from '../components/monitoring/StatisticsGender';
import StatisticsAge from '../components/monitoring/StatisticsAge';
import StatisticsTotal from '../components/monitoring/StatisticsTotal';

export default function MonitoringPage() {
    const [type, setType] = useState("default");
    const Server_IP = import.meta.env.VITE_SERVER_IP;

    const sse = new EventSource("http://localhost:8081/sse/connect");

    sse.addEventListener('connect', (e) => {
        const { data: receivedConnectData } = e;
        console.log('connect event data: ',receivedConnectData);  // "connected!"
        console.log(e);
    });

    useEffect(() => {
        const visitAnalysisSource = new EventSource(`http://localhost:8081/sse/visit-analysis?type=${type}`);
        const recommendAnalysisSource = new EventSource(`http://localhost:8081/sse/recommend-analysis?type=${type}`);

        visitAnalysisSource.addEventListener(`visit-analysis-${type}`, (e) => {
            const data = JSON.parse(e.data);
            console.log("📊 visit-analysis 이벤트 수신:", data);
        });

        recommendAnalysisSource.addEventListener(`recommend-analysis-${type}`, (e) => {
            const data = JSON.parse(e.data);
            console.log("📊 recommend-analysis 이벤트 수신:", data);
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
    }, []);
    
    return (
        <div className='monitoring'>
            <div className='backgroud' />
            <Header location={"monitoring"}/>
            <div className='monitoring-container'>
                <div className='monitoring-header'>
                    <p className='monitoring-header-title'>모니터링</p>
                    <div className='monitoring-overview'>
                        <div className='overview-today-data'>
                            <p className='overview-title-text'>오늘 수집된 데이터</p>
                            <p className='overview-data-text'>123,123</p>
                        </div>
                        <div className='overview-rate'>
                            <p className='overview-title-text'>전일 대비 증감율</p>
                            <p className='overview-rate-text'>-2%</p>
                        </div>
                    </div>
                </div>
                <div className='activity-graph'>
                    <DataGraph/>
                    <ProcessGraph/>
                </div>
                <div className='statistics-row'>
                    <div className='activity-statistics'>
                        <p className='statistics-title'>전체 활동 통계</p>
                        <StatisticsTotal />
                    </div>
                    <div className='activity-statistics'>
                        <p className='statistics-title'>성별 활동 통계</p>
                        <StatisticsGender />
                    </div>
                    <div className='activity-statistics'>
                        <p className='statistics-title'>연령별 활동 통계</p>
                        <StatisticsAge />
                    </div>
                </div>
            </div>
        </div>
    )
}
