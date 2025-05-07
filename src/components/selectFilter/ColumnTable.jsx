import React from 'react'
import { columnData } from '../../../public/data/columnTable'
import '../../styles/selectFilter/columnTable.css'

export default function ColumnTable() {
  return (
    <div className='contents-columnTable'>
        <div className='columnTable-title'>
            <p className='title-text'>분석 컬럼</p>
        </div>
        <div className='columnTable-columnList'>
          {columnData.result.map((column, index) => {
            return(
              <div className='columnList-column' key={index}>
                <p className='column-name'>{column.name}</p>
              </div>
            )
          })}
        </div>
        
    </div>
  )
}
