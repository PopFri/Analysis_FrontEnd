import React from 'react'
import Header from '../components/Header'
import ColumnTable from '../components/selectFilter/ColumnTable'
import InputFilter from '../components/selectFilter/InputFilter'
import '../styles/selectFilter/selectFilter.css'

export default function SelectFilter() {
  return (
    <div className='selectFilter'>
        <Header />
        <div className='selectFilter-contents'>
          <div>
            <p className='selectFilter-title'>로그 데이터 선택</p>
            <ColumnTable />
          </div>
          <InputFilter />
        </div>
    </div>
  )
}
