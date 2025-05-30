import React from 'react'
import { table } from '../../../public/data/logDataTable'
import '../../styles/selectCol/logTable.css'

export default function LogTable() {
  return (
    <div className='contents-logTable'>
        <div className='logTable-title'>
            <p className='title-text'>예상 로그 데이터</p>
        </div>
        <div className='logTable-table'>
            <div className='table-log'>
                <div className='log-title'>
                    <p className='title-name'>{table.name}</p>
                    <p className='title-detail'>{table.detail}</p>
                </div>
                <div className='log-columns'>
                    {table.columns.map((column, index) => {
                        return(
                            <div className='columns-column' key={index}>
                                <p className='column-dot'>·</p>
                                <p className='column-name'>{column.name}:</p>
                                <p className='column-detail'>{column.detail}</p>
                            </div>
                        );
                    })}
                </div>
            </div>            
        </div> 
    </div>
  )
}
