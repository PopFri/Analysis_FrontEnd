import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import '../styles/filteringResult/FilteringResult.css'
import AnalysisColumn from '../components/filteringResult/AnalysisColumn'
import FilteringConditionColumn from '../components/filteringResult/FilteringConditionColumn'
import OutputResult from '../components/filteringResult/OutputResult'
import FilteringResultGraph from '../components/filteringResult/FilteringResultGraph'
import FilteringResultRecord from '../components/filteringResult/FilteringResultRecord'

export default function FilteringResult() {
    const navigate = useNavigate();

    return (
        <div className='filtering-result'>
            <div className='backgroud' />
            <Header />
            <div className='filtering-result-container'>
                <div className='filtering-result-column'>
                    <p className='filtering-result-title'>필터링 결과 출력</p>
                    <AnalysisColumn />
                    <FilteringConditionColumn />
                </div>
                <OutputResult />
                <div className='filtering-result-record-container'>
                    <FilteringResultGraph />
                    <FilteringResultRecord />
                    <button className='go-to-home-button' onClick={() => navigate('/home')}>
                        홈으로
                    </button>
                </div>
            </div>
        </div>
    )
}
