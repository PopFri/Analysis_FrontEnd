import React from 'react'
import { columnData } from '../../../public/data/columnTable'
import '../../styles/selectFilter/columnTable.css'

export default function ColumnTable(props) {
  return (
    <div className='contents-columnTable'>
        <div className='columnTable-title'>
            <p className='title-text'>분석 컬럼</p>
        </div>
        <div className='columnTable-columnList'>
          {columnData.result.map((column, index) => {
            return(
              <div className='columnList-column' key={index} 
              style={props.column.id == index ? {backgroundColor: '#1ED86350'} : null}
              onClick={()=>{
                if(props.column.id < 0)
                  props.setColumn({"id": index, "value": column.name});
              }}
              >
                <p className='column-name'>{column.name}</p>
              </div>
            )
          })}
        </div>
        
    </div>
  )
}
