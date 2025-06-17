import React from 'react'
import '../../styles/selectFilter/columnTable.css'

export default function ColumnTable(props) {
  return (
    <div className='contents-columnTable'>
        <div className='columnTable-title'>
            <p className='title-text'>분석 컬럼</p>
        </div>
        <div className='columnTable-columnList'>
          {Array.isArray(props.columnList) && props.columnList.map((column, index) => {
            return(
              <div className='columnList-column' key={index} 
              style={column.columnId == props.column.id ? {backgroundColor: '#1ED86350'} : null}
              onClick={()=>{
                if(props.column.id < 0)
                  props.setColumn({"id": column.columnId, "value": column.columnName});
              }}
              >
                <p className='column-name'>{column.columnName}</p>
              </div>
            )
          })}
        </div>
        
    </div>
  )
}
