import React, { useState, useEffect } from 'react'
import '../../styles/monitoring/ProcessGraph.css'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ProcessGraph = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data/filteringDataTable.json')
            .then((res) => res.json())
            .then((json) => {
                setData(json.result.processes); // ✅ 데이터 배열 추출
            })
            .catch((err) => console.error('데이터 로딩 실패:', err));
    }, []);

    const CustomizedAxisTick = ({ x, y, payload }) => {
        const MAX_LENGTH = 7; //  최대 표시 글자 수
        const text = payload.value.length > MAX_LENGTH
            ? payload.value.slice(0, MAX_LENGTH) + '...'
            : payload.value;

        return (
          <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={10}
            >
                {text}
            </text>
          </g>
        );
    };

    useEffect(() => {
        console.log(data);
    }, []);
    
    const barSize = 40;
    const barGap = 10;
    const chartWidth = data.length * (barSize + barGap) + 90;


    return (
        <div className='process-graph-container'>
            <div className='process-graph-wrapper'>
                <div className='process-graph-title'>
                    <p className='process-graph-title-text'>프로세스 별 성공 수</p>
                </div>
                <div className='process-graph'>
                    <div style={{ width: chartWidth }}>
                        <BarChart
                            width={chartWidth}
                            height={260}
                            data={data}
                            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                            barCategoryGap={barGap}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="process" tick={<CustomizedAxisTick />} interval={0} />
                            <YAxis tick={{ fill: '#1ED863', fontSize: 12 }} />
                            <Tooltip />
                            <Bar
                                dataKey="data"
                                fill="#1ED863"
                                barSize={barSize}
                                activeBar={<Rectangle fill="white" stroke="green" />}
                            />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcessGraph;