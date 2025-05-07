import React from 'react'
import Header from '../components/Header'
import ColumnTable from '../components/selectFilter/ColumnTable'
import InputFilter from '../components/selectFilter/InputFilter'
import '../styles/selectFilter/selectFilter.css'

export default function SelectFilter() {
  return (
    <div className='selectFilter'>
        <Header />
        <p className='selectFilter-title'>필터링 입력</p>
        <div className='selectFilter-contents'>
          <ColumnTable />
          <InputFilter />
        </div>
    </div>
  )
}
