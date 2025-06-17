import React from 'react'
import '../styles/monitoring/Monitoring.css'
import Header from '../components/Header'
import Overview from '../components/monitoring/Overview';
import DataGraph from '../components/monitoring/DataGraph';
import ProcessGraph from '../components/monitoring/ProcessGraph';
import StatisticsGender from '../components/monitoring/StatisticsGender';
import StatisticsAge from '../components/monitoring/StatisticsAge';

export default function MonitoringPage() {
  const Server_IP = import.meta.env.VITE_SERVER_IP;

  return (
    <div className='monitoring'>
        <div className='backgroud' />
        <Header location={"monitoring"}/>
        <div className='monitoring-container'>
            <div className='activity-graph'>
                <p className='activity-graph-title'>전체 활동 그래프</p>
                <Overview/>
                <DataGraph/>
                <ProcessGraph/>
            </div>
            <div className='statistics-row'>
                <div className='activity-statistics'>
                    <p className='statistics-title'>성별 활동 통계</p>
                    <StatisticsGender />
                </div>
                <div className='activity-statistics' style={{marginRight : '70px' }}>
                    <p className='statistics-title'>연령별 활동 통계</p>
                    <StatisticsAge />
                </div>
            </div>
        </div>
    </div>
  )
}
