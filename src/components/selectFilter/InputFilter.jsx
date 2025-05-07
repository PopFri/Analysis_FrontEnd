import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import srcSearchIcon from '/images/searchIcon.png'
import srcDelIcon from '/images/btnCancelRed.png'
import '../../styles/selectFilter/inputFilter.css'

export default function InputFilter() {
  const [condition, setCondition] = useState([]);
  const handleSumbit = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.input;
    const value = input.value.trim();

    if(value){
        if(!condition.includes(value)){
          setCondition((prev) => [...prev, value]);
        }
        input.value = '';
    }
  }
  const delColumn = (indexClick) => {
    setCondition(condition.filter((_, index) => index !== indexClick));
  }

  return (
    <div className='container'>
        <div className='contents-inputFilter'>
            <div className='inputFilter-title'>
                <p className='title-text'>필터링 조건</p>
            </div>
            <div className='inputFilter-conditionList'>
                {condition.map((name, index) => {
                    return(
                        <div className='conditionList-condition' key={index}>
                            <p className='condition-name'>{name}</p>
                            <img className='condition-del' src={srcDelIcon} alt="" onClick={() => delColumn(index)}/>
                        </div>
                    )
                })}
            </div>
            <form className='inputFilter-input' onSubmit={(e) => handleSumbit(e)}>
                <input type="text" name="input" id="" placeholder='필터링할 조건을 입력해주세요.'/>
                <img src={srcSearchIcon} alt="" />
            </form>
        </div>
        <div className='contents-button'>
            <Link className='button-cancel' to='/column'>
                <p className='cancel-text'>뒤로 가기</p>
            </Link>
            <Link className='button-continue' to='/result'>
                <p className='continue-text'>계속</p>
            </Link>
        </div>
    </div>
  )
}
