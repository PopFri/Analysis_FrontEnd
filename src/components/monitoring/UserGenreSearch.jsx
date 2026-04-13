import { useState, useEffect } from 'react'
import '../../styles/monitoring/UserGenreSearch.css'

const UserGenreSearch = () => {
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const [uidList, setUidList] = useState([]);
    const [selectedUid, setSelectedUid] = useState('');
    const [genreData, setGenreData] = useState([]);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const fetchUids = async () => {
            try {
                const res = await fetch(`${Server_IP}/analysis/users`);
                const data = await res.json();
                if (res.ok && data.isSuccess) {
                    setUidList(data.result);
                }
            } catch {
                // uid 목록 로드 실패 시 조용히 처리
            }
        };
        fetchUids();
    }, []);

    const handleSearch = async (uid) => {
        if (!uid) return;
        try {
            const res = await fetch(`${Server_IP}/analysis/user-genre?uid=${encodeURIComponent(uid)}`);
            const data = await res.json();
            if (!res.ok || !data.isSuccess) {
                alert(data.message);
                return;
            }
            setGenreData(data.result);
            setSearched(true);
        } catch {
            alert("데이터 로드 중 오류가 발생했습니다.");
        }
    };

    const handleSelect = (e) => {
        const uid = e.target.value;
        setSelectedUid(uid);
        setSearched(false);
        setGenreData([]);
        handleSearch(uid);
    };

    const formatTime = (seconds) => {
        if (seconds == null) return '0초';
        if (seconds < 60) return `${seconds}초`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}분 ${seconds % 60}초`;
        return `${Math.floor(seconds / 3600)}시간 ${Math.floor((seconds % 3600) / 60)}분`;
    };

    return (
        <div className='user-genre-container'>
            <select
                className='user-genre-select'
                value={selectedUid}
                onChange={handleSelect}
            >
                <option value=''>사용자를 선택하세요</option>
                {uidList.map((uid) => (
                    <option key={uid} value={uid}>{uid}</option>
                ))}
            </select>
            {searched && (
                genreData.length > 0 ? (
                    <div className='user-genre-result'>
                        {genreData.map((item, idx) => (
                            <div className='user-genre-item' key={idx}>
                                <div className='user-genre-rank'>#{idx + 1}</div>
                                <div className='user-genre-name'>{item.genre}</div>
                                <div className='user-genre-time'>{formatTime(item.totalDwellTime)}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='user-genre-no-data'>데이터가 없습니다.</div>
                )
            )}
        </div>
    );
};

export default UserGenreSearch;
