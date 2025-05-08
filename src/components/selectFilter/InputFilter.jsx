import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import srcSearchIcon from '/images/searchIcon.png'
import srcDelIcon from '/images/btnCancelRed.png'
import '../../styles/selectFilter/inputFilter.css'

export default function InputFilter() {
  const [andTarget, setTarget] = useState(0);
  const [condition, setCondition] = useState([]);

  //node process
  const addNodeById = (nodes, targetId, newNode) => {
    if (targetId == 0){
        return[
            ...nodes,
            newNode
        ];
    }
    return nodes.map(node => {
        if (node.id === targetId) {
            return {
                ...node,
                condition: [...node.condition, newNode]
            };
        } else if (node.condition.length > 0) {
            return {
                ...node,
                condition: addNodeById(node.condition, targetId, newNode)
            };
        } else {
            return node;
        }
    });
  };

  const deleteNodeById = (nodes, targetId) => {
    return nodes
      .filter(node => node.id !== targetId)
      .map(node => ({
        ...node,
        condition: deleteNodeById(node.condition, targetId)
      }));
  };

  const findValueById = (nodes, targetId) => {
    for (const node of nodes) {
      if (node.id === targetId) {
        return node.value;
      }
      if (node.condition.length > 0) {
        const found = findValueById(node.condition, targetId);
        if (found !== null) {
          return found;
        }
      }
    }
    return null; // 찾지 못한 경우
  };
  

  //action handle
  const handleSumbit = (e, targetId) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.input;
    const value = input.value.trim();

    if(value){
        const newNode = {
            id: 'id-' + Date.now(),
            value: value,
            condition: []
          };
        
          const updated = addNodeById(condition, targetId, newNode);
          setCondition(updated);
        input.value = '';
    }
  }

  const handleDel = (targetId) => {
    const updated = deleteNodeById(condition, targetId);
    setCondition(updated);
    if(findValueById(updated, andTarget) === null){
        setTarget(0);
    }
  }

  //view node
  const viewConditionTree = (nodes) => {
    return nodes.map((node, index) => (
        <>
            <div className='conditionList-container'>
                <div className='container-condition'>
                    <div className='condition-andButton' onClick={() => {setTarget(node.id)}}>
                        <p className='andButton-text'>AND</p>
                    </div>
                    <p className='condition-name'>{node.value}</p>
                    <img className='condition-del' src={srcDelIcon} alt="" onClick={() => handleDel(node.id)}/>                
                </div>
                <div className='container-ifConditionMany' style={node.condition.length > 1 ? {border: '2px solid #4285F4', marginBottom: '5px'}: null}>
                    {node.condition.length > 0 && viewConditionTree(node.condition)}
                </div>
            </div>
            {(index + 1) != nodes.length ? <p className='conditionList-or'>OR</p>: null}
        </>
    ));
  };

  return (
    <div className='container'>
        <div className='contents-inputFilter'>
            <div className='inputFilter-title'>
                <p className='title-text'>필터링 조건</p>
            </div>
            <div className='inputFilter-conditionList'>
                {viewConditionTree(condition)}
            </div>
            <div className='inputFilter-inputContainer'>
                <div className='inputFilter-isTyping' style={(andTarget == 0) ? {display: 'none'}: null}>
                    <div className='isTyping-text'>
                        <p className='isTyping-target'>{findValueById(condition, andTarget)}</p>
                        <p className='isTyping-info'>내부 작성 중</p>
                    </div>
                    <img className='isTyping-del' src={srcDelIcon} alt="" onClick={() => setTarget(0)}/>                
                </div>
                <form className='inputFilter-input' onSubmit={(e) => handleSumbit(e, andTarget)}>
                    <input type="text" name="input" id="" placeholder='필터링할 조건을 입력해주세요.' autoComplete='off'/>
                    <img src={srcSearchIcon} alt="" />
                </form>
            </div>
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
