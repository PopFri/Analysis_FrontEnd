import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import '../styles/filteringResult/FilteringResult.css'
import AnalysisColumn from '../components/filteringResult/AnalysisColumn'
import FilteringConditionColumn from '../components/filteringResult/FilteringConditionColumn'
import OutputResult from '../components/filteringResult/OutputResult'
import FilteringResultGraph from '../components/filteringResult/FilteringResultGraph'
import FilteringResultRecord from '../components/filteringResult/FilteringResultRecord'

export default function FilteringResult() {
    const [columnList, setColumnList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const { processId } = useParams();
    const navigate = useNavigate();
    const Server_IP = import.meta.env.VITE_SERVER_IP;

    const loadProcessColumn = async () => {
        try {
            const res = await fetch(`${Server_IP}/api/v1/column?processId=${processId}`, {
                method: 'GET',
            });
            const data = await res.json();
            setColumnList(data.result);
            if (!res.ok || !data.isSuccess) {
                alert(data.message); 
                return;
            }

        } catch {
            alert("컬럼 로드 중 오류가 발생했습니다.");
        }
    };

    const loadProcessCondition = async () => {
        try {
            const res = await fetch(`${Server_IP}/api/v1/condition?processId=${processId}`, {
                method: 'GET',
            });
            const data = await res.json();
            setConditionList(data.result);
            if (!res.ok || !data.isSuccess) {
                alert(data.message); 
                return;
            }

        } catch {
            alert("조건 로드 중 오류가 발생했습니다.");
        }
    };

    const loadResultData = async () => {
        try {
            const res = await fetch(`${Server_IP}/api/v1/result/success?processId=${processId}`, {
                method: 'GET',
            });
            const data = await res.json();
            
            if (!res.ok || !data.isSuccess) {
                alert(data.message); 
                return;
            }
            setResultData(data.result.conditionList);
            setTotalCount(data.result.totalCount);
        } catch {
            alert("프로세스 생성 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        loadProcessColumn();
        loadProcessCondition();
        loadResultData();
    }, []);

    return (
        <div className='filtering-result'>
            <div className='backgroud' />
            <Header />
            <div className='filtering-result-container'>
                <div className='filtering-result-column'>
                    <p className='filtering-result-title'>필터링 결과 출력</p>
                    <AnalysisColumn columnList={columnList}/>
                    <FilteringConditionColumn conditionList={conditionList}/>
                </div>
                <OutputResult columnList={columnList}/>
                <div className='filtering-result-record-container'>
                    <FilteringResultGraph resultData={resultData} totalCount={totalCount}/>
                    <FilteringResultRecord resultData={resultData}/>
                    <button className='go-to-home-button' onClick={() => navigate('/home')}>
                        홈으로
                    </button>
                </div>
            </div>
        </div>
    )
}
