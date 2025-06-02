import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import srcSearchIcon from '/images/searchIcon.png'
import srcDelIcon from '/images/btnCancelRed.png'
import srcTogIcon from '/images/btnToggle.png'
import '../../styles/selectFilter/inputFilter.css'

export default function InputFilter(props) {
  const [andTarget, setTarget] = useState(0);
  const [op, setOp] = useState("");
  const [inputValue, setValue] = useState(null);
  const [isNumber, setType] = useState(true);
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
  
  //input value
  const inputConditionValue = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.input;
    let value;
    if(isNumber)
      value = input.value;
    else
      value = '"' + input.value.trim() + '"';

    setValue(value);
    input.value = '';
  }
  //action handle
  const handleSumbit = (targetId) => {
    if(op == null || props.column == null || inputValue == null)
      return;

    const str_conditinon = props.column.value + " " + op + " " + inputValue;

    if(str_conditinon){
        const newNode = {
            id: 'id-' + Date.now(),
            str_conditinon: str_conditinon,
            column: props.column.value,
            op: op,
            value: inputValue,
            condition: []
          };
        
          const updated = addNodeById(condition, targetId, newNode);
          setCondition(updated);
    }

    props.setColumn({"id": -1, "value": ""});
    setValue(null);
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
    console.log(nodes);
    return nodes.map((node, index) => (
        <>
            <div className='conditionList-container'>
                <div className='container-condition'>
                    <div className='condition-andButton' onClick={() => {setTarget(node.id)}}>
                        <p className='andButton-text'>AND</p>
                    </div>
                    <p className='condition-name'>{node.str_conditinon}</p>
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

  //view input
  const viewInput = () => {
    if(props.column.id < 0){
      return (
        <form className='inputFilter-input' style={{backgroundColor: '#65636390'}}>
            <p className='input-inputColunm'>좌측 화면에서 필터링할 컬럼을 선택해주세요</p>
            <img src={srcSearchIcon} alt="" />
        </form>
      )
    } else if(inputValue == null){
      return (
        <form className='inputFilter-input' onSubmit={(e) => inputConditionValue(e)}>
            <div className='input-toggleType'>
              <p className='toggleType-text'>{isNumber ? "Number" : "String"}</p>
              <img src={srcTogIcon} alt="" onClick={() => setType(!isNumber)}/>
            </div>
            <input type={isNumber ? "number" : "text"} name="input" id="" placeholder='필터링할 값을 입력해주세요.' autoComplete='off' step={0.0000000001}/>
            <img src={srcSearchIcon} alt="" />
        </form>
      )
    } else {
      return(
        <form className='inputFilter-input'>
            <div className='input-inputOp' onClick={() => {
              setOp(">");
            }}
            style = {isNumber ? null : {display: 'none'}}
            >
              <p className='inputOp-Text'>{'>'}</p>
            </div>
            <div className='input-inputOp' onClick={() => {
              setOp(">=");
            }}
            style = {isNumber ? null : {display: 'none'}}
            >
              <p className='inputOp-Text'>{'>='}</p>
            </div>
            <div className='input-inputOp' onClick={() => {
              setOp("==");
            }}>
              <p className='inputOp-Text'>{'=='}</p>
            </div>
            <div className='input-inputOp' onClick={() => {
              setOp("!=");
            }}>
              <p className='inputOp-Text'>{'!='}</p>
            </div>
            <div className='input-inputOp' onClick={() => {
              setOp("<=");
            }}
            style = {isNumber ? null : {display: 'none'}}
            >
              <p className='inputOp-Text'>{'<='}</p>
            </div>
            <div className='input-inputOp' onClick={() => {
              setOp("<");
            }}
            style = {isNumber ? null : {display: 'none'}}
            >
              <p className='inputOp-Text'>{'<'}</p>
            </div>
            <img src={srcSearchIcon} alt="" />
        </form>
      )
    }
  }
  
  useEffect(()=>{
    handleSumbit(andTarget);
  }, [op])

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
                {viewInput()}
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
