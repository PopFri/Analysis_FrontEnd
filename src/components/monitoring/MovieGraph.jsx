import React, { useEffect, useState } from 'react'
import '../../styles/monitoring/MovieGraph.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
ResponsiveContainer
} from 'recharts';

const MovieGraph = ({data, title, selectedDay, criterion}) => {
    const [modal, setModal] = useState(false);
    const [day, setDay] = useState('실시간');
    const top10Data = data?.slice(0, 10);
    const dayColor = day === '실시간' ? '#F24822' : '#FFFFFF';
    
    const CustomLabel = ({ x, y, width, value }) => {
        const padding = 6;
        const labelX = x + width + padding;

        return (
            <text
            x={labelX}
            y={y + 10}
            fill="#ffffff"
            fontSize={14}
            textAnchor="start"
            >
            {value}번
            </text>
        );
    };
    
    useEffect(() => {
        if (selectedDay === 'day') {
            setDay('실시간');
        } else if (selectedDay === 'week') {
            setDay('주간');
        } else if (selectedDay === 'month') {
            setDay('월간');
        }
    }, [selectedDay]);

    return (
        <div className='movie-graph-container'>
            <ResponsiveContainer width="100%" height={top10Data.length * 56}>
                <BarChart
                    layout="vertical"
                    data={top10Data}
                    margin={{ top: 10, right: 50, left: 10, bottom: 0 }}
                >
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />
                    {top10Data.map((entry, index) => (
                    <text
                        key={`label-${index}`}
                        x={10}
                        y={index * 55 + 20}
                        fill="#fff"
                        fontSize={14}
                    >
                        {entry.name}
                    </text>
                    ))}
                    <Bar
                    dataKey="data"
                    fill="#3A3A3A"
                    radius={[6, 6, 6, 6]}
                    barSize={12}
                    >
                    <LabelList dataKey="data" content={<CustomLabel />} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div style={{  display: 'flex', justifyContent: 'flex-start' }}>
                <div className='graph-detail-modal-button' onClick={() => setModal(true)}>더보기</div>
            </div>
            {modal && (
                <div className='movie-graph-modal'>
                    <div className='movie-graph-modal-container'>
                        <div className='movie-graph-title-container'>
                            <div className='movie-graph-title'>{title}</div>
                            <div className='movie-graph-criterion'>
                                <div className='movie-graph-day' style={{color: dayColor}}>{day}</div>
                                <div className='movie-graph-day' style={{color: '#FFFFFF'}}>{criterion}</div>
                            </div>
                        </div>
                        <div className='modal-graph'>
                            <div className='movie-data-container'>
                                {data.map((data, idx) => (
                                    <div className='movie-data-detail' key={idx}>
                                        <div className='movie-data-name'>
                                            {data.name}
                                        </div>
                                        <div className='movie-data-data'>
                                            {data.data}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{  display: 'flex', justifyContent: 'flex-start' }}>
                            <div className='modal-close-button' onClick={() => setModal(false)}>닫기</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieGraph;
