import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { columnData } from '../../../public/data/columnTable'
import { conditionData } from '../../../public/data/columnTable'
import '../../styles/selectFiltering/FilteringAnalysis.css'

const FilteringAnalysis = ({processAnalysis}) => {
  const [seletedProcess, setSelectedProcess] = useState(false);
  const [columnList, setColumnList] = useState(null);
  const [conditionList, setConditionList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      if(processAnalysis == null) setSelectedProcess(false);
      else {
        setSelectedProcess(true);
        setColumnList(columnData.result);
        setConditionList(conditionData.result)
      }
  }, [processAnalysis]);

  const executionHandler = () => {
    navigate(`/column`);
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
                      <p className='column-name'>{column.name}</p>
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
