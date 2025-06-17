import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header'
import ColumnTable from '../components/selectFilter/ColumnTable'
import InputFilter from '../components/selectFilter/InputFilter'
import '../styles/selectFilter/selectFilter.css'

export default function SelectFilter() {
  const [column, setColumn] = useState({"id": -1, "value": ""});
  const [columnList, setColumnList] = useState([]);
  const { processId } = useParams();
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const loadProcessColumn = async (processId) => {
      try {
        const res = await fetch(`${Server_IP}/api/v1/column?processId=${processId}`, {
            method: 'GET',
        });
        const data = await res.json();
        
        if (!res.ok || !data.isSuccess) {
            alert(data.message); 
            return;
        }
        setColumnList(data.result);
      } catch {
          alert("프로세스 생성 중 오류가 발생했습니다.");
      }
  };

  useEffect(() => {
    loadProcessColumn(processId);
  }, []);
  
  return (
    <div className='selectFilter'>
      <div className='backgroud' />
      <Header location={'home'}/>
      <div className='selectFilter-contents'>
        <div>
          <p className='selectFilter-title'>필터링 입력</p>
          <ColumnTable column = {column} setColumn={setColumn} columnList = {columnList} />
        </div>
        <InputFilter column = {column} setColumn = {setColumn} processId={processId}/>
      </div>
    </div>
  )
}
