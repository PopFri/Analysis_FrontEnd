import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Overview from '../components/monitoring/Overview';
import DataGraph from '../components/monitoring/DataGraph';
import ProcessGraph from '../components/monitoring/ProcessGraph';

export default function MonitoringPage() {
  const Server_IP = import.meta.env.VITE_SERVER_IP;

  return (
    <div className='monitoring'>
        <div className='backgroud' />
        <Header location={"monitoring"}/>
        <Overview/>
        <DataGraph/>
        <ProcessGraph/>
    </div>
  )
}
