import React from 'react'
import Header from '../components/Header'
import LogTable from '../components/selectCol/LogTable'
import '../styles/selectCol/selectCol.css'
import InputColumn from '../components/selectCol/InputColumn'

export default function SelectCol() {
  return (
    <div className='selectCol'>
        <div className='backgroud' />
        <Header />
        <div className='selectCol-contents'>
          <div>
            <p className='selectCol-title'>로그 데이터 선택</p>
            <LogTable />
          </div>
          <InputColumn />
        </div>
    </div>
  )
}
