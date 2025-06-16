import React, { useState } from 'react'
import '../../styles/monitoring/MovieGraph.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const MovieGraph = ({data}) => {
    const [modal, setModal] = useState(false);
    const top10Data = data?.slice(0, 10);
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
    
    return (
        <div className='movie-graph-container'>
            <BarChart
                layout="vertical"
                width={550}
                height={top10Data.length * 56}
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
            <div style={{  display: 'flex', justifyContent: 'flex-start' }}>
                <div className='graph-detail-modal-button' onClick={() => setModal(true)}>더보기</div>
            </div>
            {modal && (
                <div className='movie-graph-modal'>
                    <div className='movie-graph-modal-container'>
                        <div style={{  display: 'flex', justifyContent: 'flex-start' }}>
                            <div className='modal-close-button' onClick={() => setModal(false)}>닫기</div>
                        </div>
                        <div className='modal-graph'>
                            <BarChart
                                layout="vertical"
                                width={550}
                                height={data.length * 60}
                                data={data}
                                margin={{ top: 10, right: 50, left: 10, bottom: 0 }}
                            >
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" hide />
                                {data.map((entry, index) => (
                                <text
                                    key={`label-${index}`}
                                    x={10}
                                    y={index * 59.7 + 20}
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieGraph;
