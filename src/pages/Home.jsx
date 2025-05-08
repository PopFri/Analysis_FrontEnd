import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FilteringConditionList from '../components/selectFiltering/FilteringConditionList'
import FilteringAnalysis from '../components/selectFiltering/FilteringAnalysis'
import '../styles/selectFiltering/Home.css'

export default function Home() {
  const [processList, setProcessList] = useState({});
  const [processAnalysis, setProcessAnalysis] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetch('/data/filteringDataTable.json')
        .then(res => res.json())
        .then(data => {
          setProcessList(data.result);
          setTotalPage(Math.ceil(data.result.processes.length / itemsPerPage));
    })
    .catch(err => {
        console.error('Error fetching:', err);
    });

  }, []);

  return (
    <div className='home'>
        <div className='backgroud' />
        <Header />
        <div className='filtering-container'>
          <div>
            <p className='filtering-select-title'>필터링 조건 선택</p>
            <FilteringConditionList processList={processList} processAnalysis={processAnalysis} setProcessAnalysis={setProcessAnalysis} totalPage={totalPage}/>
          </div>
          <FilteringAnalysis processAnalysis={processAnalysis}/>
        </div>
    </div>
  )
}
