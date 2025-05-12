import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { resultData } from '../../public/data/columnTable';
import '../styles/filteringResult/FilteringResult.css'
import AnalysisColumn from '../components/filteringResult/AnalysisColumn'
import FilteringConditionColumn from '../components/filteringResult/FilteringConditionColumn'
import OutputResult from '../components/filteringResult/OutputResult'

export default function FilteringResult() {
    
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
            </div>
        </div>
    )
}
