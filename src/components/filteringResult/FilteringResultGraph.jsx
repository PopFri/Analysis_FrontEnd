import React from 'react'
import '../../styles/filteringResult/FilteringResultGraph.css'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const FilteringResultGraph = ({resultData, totalCount}) => {
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
    const barGap = 10;
    const chartWidth = resultData.length * (barSize + barGap) + 90;

    return (
        <div className='filtering-result-graph-container'>
            <div className='result-graph-wrapper'>
                <div className='result-graph-title'>
                    <p className='result-graph-title-text'>필터링 결과 그래프</p>
                </div>
                <div className='result-total-data'>
                    (전체 데이터 수: {totalCount})
                </div>
                <div className='result-graph'>
                    <div style={{ width: '100%'}}>
                        <BarChart
                            width={chartWidth}
                            height={260}
                            data={resultData}
                            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                            barCategoryGap={barGap}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="condition" tick={<CustomizedAxisTick />} interval={0} />
                            <YAxis tick={{ fill: '#1ED863', fontSize: 12 }} />
                            <Tooltip />
                            <Bar
                                dataKey="successCount"
                                fill="#1ED863"
                                barSize={barSize} // ✅ 고정 크기
                                activeBar={<Rectangle fill="white" stroke="green" />}
                            />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilteringResultGraph;