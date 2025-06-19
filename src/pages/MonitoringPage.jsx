import React, { useState, useEffect } from 'react'
import '../styles/monitoring/Monitoring.css'
import Header from '../components/Header'
import DataGraph from '../components/monitoring/DataGraph';
import ProcessGraph from '../components/monitoring/ProcessGraph';
import StatisticsGender from '../components/monitoring/StatisticsGender';
import StatisticsAge from '../components/monitoring/StatisticsAge';
import StatisticsTotal from '../components/monitoring/StatisticsTotal';

export default function MonitoringPage() {
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const [data, setData] = useState([]);
    const setChangeRateColor = (value) => {
        if (value >= 0) return '#1ED863';
        else return '#FF5050';
    };

    useEffect(() => {
        const processAnalysisSource = new EventSource(`${Server_IP}/daily-activity`);

        processAnalysisSource.addEventListener(`dailyActivity`, (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            setData(data);
        });

        processAnalysisSource.onerror = () => {
            processAnalysisSource.close();
        };

        return () => {
            processAnalysisSource.close();
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
                            <p className='overview-data-text'>{data.cnt}</p>
                        </div>
                        <div className='overview-rate'>
                            <p className='overview-title-text'>전일 대비 증감율</p>
                            <p className='overview-data-text' style={{color: setChangeRateColor(data.changeRate)}}>
                                {Number(data.changeRate?.toFixed(1) ?? 0)}%
                            </p>
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
