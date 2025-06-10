import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import srcSearchIcon from '/images/searchIcon.png'
import srcDelIcon from '/images/btnCancelRed.png'
import '../../styles/selectCol/inputColumn.css'

export default function InputColumn(props) {
    const [column, setColumn] = useState([]);
    const Server_IP = import.meta.env.VITE_SERVER_IP;

    const handleSumbit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const input = form.elements.input;
        const value = input.value.trim();

        if(value){
            if(!column.includes(value)){
                const updatedColumnList = [...column, value];
                const columnNames = updatedColumnList.map(col => typeof col === 'string' ? col : col.columnName);
                setColumn(updatedColumnList);
                addOrDeleteColumn(columnNames);
            }
            input.value = '';
        }
    }

    const addOrDeleteColumn = async(columnNames) => {
        try {
            const res = await fetch(`${Server_IP}/api/v1/column`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    processId: props.processId,
                    columnList: columnNames,
                }),
            });

            const data = await res.json();
            if (!res.ok || !data.isSuccess) {
                alert(data.message);
                return;
            }
            setColumn(data.result);
            await fetchColumnList();
        } catch {
            alert("컬럼 추가 중 오류가 발생했습니다.");
        }
    }

    const delColumn = (columnIdToDelete) => {
        const updatedColumnList = column.filter(col => col.columnId !== columnIdToDelete);

        // columnName만 추출
        const columnNames = updatedColumnList.map(col =>
            typeof col === 'string' ? col : col.columnName
        );

        setColumn(updatedColumnList); // UI상 바로 반영
        addOrDeleteColumn(columnNames); // 서버에 저장
    }

    const fetchColumnList = async () => {
        try {
            const res = await fetch(`${Server_IP}/api/v1/column?processId=${props.processId}`);
            const data = await res.json();

            if (!res.ok || !data.isSuccess) {
            console.error('컬럼 조회 실패:', data.message);
            return;
            }
            setColumn(data.result); 
        } catch (err) {
            console.error('컬럼 조회 중 에러:', err);
        }
    };

    useEffect(() => {
        fetchColumnList();
    }, [props.processId]);

    return (
        <div className='container'>
            <div className='contents-inputColumn'>
                <div className='inputColumn-title'>
                    <p className='title-text'>분석 컬럼</p>
                </div>
                <div className='inputColumn-columnList'>
                    {Array.isArray(column) && column.map((col, index) => {
                        return(
                            <div className='columnList-column' key={index}>
                                <p className='column-name'>{col.columnName}</p>
                                <img className='column-del' src={srcDelIcon} alt="" onClick={() => delColumn(col.columnId)}/>
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
                <Link className='button-continue' to={`/condition/${props.processId}`}>
                    <p className='continue-text'>계속</p>
                </Link>
            </div>
        </div>
    )
}
