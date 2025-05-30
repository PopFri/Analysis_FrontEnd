import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import srcSearchIcon from '/images/searchIcon.png'
import srcDelIcon from '/images/btnCancelRed.png'
import '../../styles/selectCol/inputColumn.css'

export default function InputColumn() {
  const [column, setColumn] = useState([]);
  const handleSumbit = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.input;
    const value = input.value.trim();

    if(value){
        if(!column.includes(value)){
            setColumn((prev) => [...prev, value]);
        }
        input.value = '';
    }
  }
  const delColumn = (indexClick) => {
    setColumn(column.filter((_, index) => index !== indexClick));
  }

  return (
    <div className='container'>
        <div className='contents-inputColumn'>
            <div className='inputColumn-title'>
                <p className='title-text'>분석 컬럼</p>
            </div>
            <div className='inputColumn-columnList'>
                {column.map((name, index) => {
                    return(
                        <div className='columnList-column' key={index}>
                            <p className='column-name'>{name}</p>
                            <img className='column-del' src={srcDelIcon} alt="" onClick={() => delColumn(index)}/>
                        </div>
                    )
                })}
            </div>
            <form className='inputColumn-input' onSubmit={(e) => handleSumbit(e)}>
                <input type="text" name="input" id="" placeholder='분석할 컬럼 이름을 입력해주세요.' autoComplete='false'/>
                <img src={srcSearchIcon} alt="" />
            </form>
        </div>
        <div className='contents-button'>
            <Link className='button-cancel' to='/home'>
                <p className='cancel-text'>뒤로 가기</p>
            </Link>
            <Link className='button-continue' to='/condition'>
                <p className='continue-text'>계속</p>
            </Link>
        </div>
    </div>
  )
}
