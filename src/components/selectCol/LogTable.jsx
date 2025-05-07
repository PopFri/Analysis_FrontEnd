import React from 'react'
import { table1, table2, table3 } from '../../../public/data/logDataTable'
import '../../styles/selectCol/logTable.css'

export default function LogTable() {
  return (
    <div className='contents-logTable'>
        <div className='logTable-title'>
            <p className='title-text'>예상 로그 데이터 테이블</p>
        </div>
        <div className='logTable-table'>
            <div className='table-log'>
                <div className='log-title'>
                    <p className='title-name'>{table1.name}</p>
                    <p className='title-detail'>{table1.detail}</p>
                </div>
                <div className='log-columns'>
                    {table1.columns.map((column, index) => {
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
            <div className='table-log'>
                <div className='log-title'>
                    <p className='title-name'>{table2.name}</p>
                    <p className='title-detail'>{table2.detail}</p>
                </div>
                <div className='log-columns'>
                    {table2.columns.map((column, index) => {
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
            <div className='table-log'>
                <div className='log-title'>
                    <p className='title-name'>{table3.name}</p>
                    <p className='title-detail'>{table3.detail}</p>
                </div>
                <div className='log-columns'>
                    {table3.columns.map((column, index) => {
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
