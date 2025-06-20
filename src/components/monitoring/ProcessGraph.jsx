import React, { useState, useEffect } from 'react'
import '../../styles/monitoring/ProcessGraph.css'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ProcessGraph = () => {
    const [data, setData] = useState([]);
    const Server_IP = import.meta.env.VITE_SERVER_IP;

    useEffect(() => {
        const processAnalysisSource = new EventSource(`${Server_IP}/process-graph`);

        processAnalysisSource.addEventListener(`processGraph`, (e) => {
            const data = JSON.parse(e.data);
            setData(data);
        });

        processAnalysisSource.onerror = () => {
            processAnalysisSource.close();
        };

        return () => {
            processAnalysisSource.close();
        };
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
    
    const barSize = 40;
    const barGap = 20;
    const chartWidth = data.length * (barSize + barGap) + 90;


    return (
        <div className='process-graph-container'>
            <div className='process-graph-wrapper'>
                <div className='process-graph-title'>
                    <p className='process-graph-title-text'>프로세스 별 성공 수</p>
                </div>
                <div className='process-graph'>
                    <div style={{ width: '100%' }}>
                        <BarChart
                            width={chartWidth}
                            height={350}
                            data={data}
                            margin={{ top: 50, right: 20, bottom: 0 }}
                            barCategoryGap={barGap}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="processName" tick={<CustomizedAxisTick />} interval={0} />
                            <YAxis tick={{ fill: '#1ED863', fontSize: 12 }} />
                            <Tooltip />
                            <Bar
                                dataKey="successCnt"
                                fill="#1ED863"
                                barSize={barSize}
                                activeBar={<Rectangle fill="white" stroke="green" />}
                            />
                            <Bar
                                dataKey="failCnt"
                                fill="#FF3535"
                                barSize={barSize}
                                activeBar={<Rectangle fill="white" stroke="red" />}
                            />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcessGraph;