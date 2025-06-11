import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/selectFiltering/FilteringConditionList.css'
import FilteringListPagination from './FilteringListPagination';

const FilteringConditionList = ({processList, processAnalysis, setProcessAnalysis, totalPage}) => {
    const [showCreateProcessModal, setShowCreateProcessModal] = useState(false);
    const [processName, setProcessName] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 9;
    const navigate = useNavigate();
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    
    // 페이지별 프로세스 목록 잘라내기
    const slicedProcesses = (processList || []).slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleCreateProcess = async () => {
        if (!processName.trim()) {
          alert("필터링 이름을 입력해주세요.");
          return;
        }

        try {
            const res = await fetch(`${Server_IP}/api/v1/process`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: processName }),
            });
            const data = await res.json();

            if (!res.ok || !data.isSuccess) {
                alert(data.message); 
                return;
            }

            setProcessName("");
            setShowCreateProcessModal(false);
            navigate(`/column/${data.result.processId}`) 
        } catch {
            alert("프로세스 생성 중 오류가 발생했습니다.");
        }
    };

    const deleteProcess = async(id) => {
        try {
            const res = await fetch(`${Server_IP}/api/v1/process?id=${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();

            if (!res.ok || !data.isSuccess) {
                alert(data.message); 
                return;
            }
        } catch {
            alert("프로세스 삭제 중 오류가 발생했습니다.");
        }
    }

    const toggleCreateProcessModal = () => {
        setShowCreateProcessModal(prev => !prev);
        setProcessName('');
    };

    const filteringCloumnColor = (id) => {
        if(processAnalysis === id) return  "#1ED863";
        else return "#FFFFFF";
    }

    const filteringBorderColor = (id) => {
        if(processAnalysis === id) return  "#24BD5C";
        else return "#B9B9B9";
    }

    return (
        <div className='filtering-condition-list-container'>
            <div className='filtering-list'>
                <div className='filtering-list-title'>
                    <p className='filtering-list-title-text'>이전 필터링 조건 목록</p>
                    <button className='add-filtering' onClick={() => toggleCreateProcessModal()}>
                        +
                    </button>
                </div>
                <div className='filtering-list-table'>
                    {slicedProcesses.map((process, index) => (
                        <div className='filtering-column' key={index} onClick={() => setProcessAnalysis(process.processId)} style={{borderColor: `${filteringBorderColor(process.processId)}`}}>
                            <p className='process-index' style={{color: `${filteringCloumnColor(process.processId)}`}}>{(index + 1) + itemsPerPage * (page - 1)}</p>
                            <p className='process-name' style={{color: `${filteringCloumnColor(process.processId)}`}}>{process.name}</p>
                            <p className='process-date' style={{color: `${filteringCloumnColor(process.processId)}`}}>{process.date}</p>
                            <button className='process-delete' onClick={() => deleteProcess(process.processId)}>
                                <img className='delete-image' src='/images/CancelLogoRed.png'/>
                            </button>
                        </div>
                    ))}
                    <div className='filtering-pagination'>
                        <FilteringListPagination page={page} setPage={setPage} totalPage={totalPage}/>
                    </div>
                </div>
            </div>
            {showCreateProcessModal && (
                <div className='create-process-modal-container'>
                    <div className='create-process-modal'>
                        <div className='create-process-modal-items'>
                            <p className='create-process-modal-title'>필터링 이름 작명</p>
                            <input
                                className='create-process-input'
                                placeholder='필터링 이름을 입력하세요'
                                value={processName}
                                onChange={(e) => setProcessName(e.target.value)}
                            />
                            <button className='create-process-cancel-button' onClick={() => toggleCreateProcessModal()}>취소</button>
                            <button className='create-process-commit-button' onClick={() => handleCreateProcess()}>계속</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilteringConditionList;