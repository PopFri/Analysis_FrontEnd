import React, { useState, useEffect } from 'react'
import '../../styles/monitoring/Statistics.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const MovieGraph = ({data}) => {

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
            {value}분
            </text>
        );
    };
    
    return (
        <div
            style={{
            width: '100%',
            height: `${Math.max(data?.length * 45, 300)}px`,
            backgroundColor: '#1C1E1C',
            padding: '10px',
            borderRadius: '10px',
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 20, right: 50, left: 20, bottom: 20 }}
                    barCategoryGap={15}
                >
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide /> 
                    {data?.map((entry, index) => (
                        <text
                            key={`label-${index}`}
                            x={10}
                            y={index * (41) + 10 / 2 + 20} 
                            fill="#fff"
                            fontSize={14}
                            alignmentBaseline="middle"
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
        </div>
    )
}

export default MovieGraph;
