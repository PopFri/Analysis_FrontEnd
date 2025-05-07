import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FilteringConditionList from '../components/selectFiltering/FilteringConditionList'
import FilteringAnalysis from '../components/selectFiltering/FilteringAnalysis'
import '../styles/selectFiltering/Home.css'

export default function Home() {
  const [processList, setProcessList] = useState({});
  const [processAnalysis, setProcessAnalysis] = useState(null);
  useEffect(() => {
    fetch('/data/filteringDataTable.json')
        .then(res => res.json())
        .then(data => {
          setProcessList(data.result);
    })
    .catch(err => {
        console.error('Error fetching:', err);
    });

  }, []);

  return (
    <div className='home'>
        <Header />
        <div className='filtering-container'>
          <FilteringConditionList processList={processList} processAnalysis={processAnalysis} setProcessAnalysis={setProcessAnalysis}/>
          <FilteringAnalysis processAnalysis={processAnalysis}/>
        </div>
    </div>
  )
}
