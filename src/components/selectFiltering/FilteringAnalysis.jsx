import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/selectFiltering/FilteringAnalysis.css'

const FilteringAnalysis = ({processAnalysis}) => {
  const [seletedProcess, setSeletedProcess] = useState(false);
  const [columnList, setColumnList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const navigate = useNavigate();

  const loadProcessColumn = async (processId) => {
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

  const loadProcessCondition = async (processId) => {
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
  useEffect(() => {
      if(processAnalysis == null) return;
      else {
        loadProcessColumn(processAnalysis);
        loadProcessCondition(processAnalysis);
        setSeletedProcess(true);
      }
  }, [processAnalysis]);

  const executionHandler = () => {
    navigate(`/column/${processAnalysis}`);
  }
  
  return (
    <div className='filtering-analysis-container'>
        <div className='filtering-analysis-list'>
          <div className='filtering-analysis-title'>
            <p className='filtering-analysis-title-text'>분석 간단히 보기</p>
          </div>
          {seletedProcess && (
            <div className='filtering-analysis-wrapper'>
              <div className='analysis-column'>
                <p className='analysis-column-title'>분석 컬럼</p>
                <div className='analysis-column-container'>
                  {columnList.map((column, index) => (
                    <div className='analysis-column-list' key={index}>
                      <p className='column-name'>{column.columnName}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='filtering-condition'>
                <p className='filtering-condition-title'>필터링 조건</p>
                <div className='filtering-condition-container'>
                  {conditionList.map((condition, index) => (
                    <div className='analysis-column-list' key={index}>
                      <p className='column-name'>{condition.condition}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button className='execution-condition' to='/column' onClick={() => executionHandler()}>
                조건 실행
              </button>
            </div>
          )}
        </div>
    </div>
  )
}

export default FilteringAnalysis;
