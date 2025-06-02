import React, { useState } from 'react'
import Header from '../components/Header'
import ColumnTable from '../components/selectFilter/ColumnTable'
import InputFilter from '../components/selectFilter/InputFilter'
import '../styles/selectFilter/selectFilter.css'

export default function SelectFilter() {
  const [column, setColumn] = useState({"id": -1, "value": ""});

  return (
    <div className='selectFilter'>
      <div className='backgroud' />
      <Header />
      <div className='selectFilter-contents'>
        <div>
          <p className='selectFilter-title'>필터링 입력</p>
          <ColumnTable column = {column} setColumn = {setColumn}/>
        </div>
        <InputFilter column = {column} setColumn = {setColumn}/>
      </div>
    </div>
  )
}
