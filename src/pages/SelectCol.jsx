import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header'
import LogTable from '../components/selectCol/LogTable'
import '../styles/selectCol/selectCol.css'
import InputColumn from '../components/selectCol/InputColumn'

export default function SelectCol() {
  const { processId } = useParams();
  return (
    <div className='selectCol'>
        <div className='backgroud' />
        <Header location={'home'}/>
        <div className='selectCol-contents'>
          <div>
            <p className='selectCol-title'>로그 데이터 선택</p>
            <LogTable />
          </div>
          <InputColumn processId={processId}/>
        </div>
    </div>
  )
}
