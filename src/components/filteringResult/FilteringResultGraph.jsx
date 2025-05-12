import React, { PureComponent } from 'react';
import '../../styles/filteringResult/FilteringResultGraph.css'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FilteringResultGraph = () => {
    const CustomizedAxisTick = ({ x, y, payload }) => {
        const MAX_LENGTH = 10; // ✅ 최대 표시 글자 수
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
              fontSize={12}
            >
              {text}
            </text>
          </g>
        );
    };
    const data = [
        {
          name: 'isvisit > 5',
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'isvisitisvisit == 9',
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'isvisitisvisit == 9 && isvisit > 5',
          pv: 2800,
          amt: 2290,
        },
        {
          name: 'isvisitisvisit == 9 || (isvisit > 5 && time_spent_ref_action < 10)',
          pv: 3908,
          amt: 2000,
        },
        {
            name: 'isvisit > 5',
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'isvisitisvisit == 9',
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'isvisitisvisit == 9 && isvisit > 5',
            pv: 2800,
            amt: 2290,
        },
        {
            name: 'isvisitisvisit == 9 || (isvisit > 5 && time_spent_ref_action < 10)',
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'isvisit > 5',
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'isvisitisvisit == 9',
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'isvisitisvisit == 9 && isvisit > 5',
            pv: 2800,
            amt: 2290,
        },
        {
            name: 'isvisitisvisit == 9 || (isvisit > 5 && time_spent_ref_action < 10)',
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'isvisit > 5',
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'isvisitisvisit == 9',
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'isvisitisvisit == 9 && isvisit > 5',
            pv: 2800,
            amt: 2290,
        },
        {
            name: 'isvisitisvisit == 9 || (isvisit > 5 && time_spent_ref_action < 10)',
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'isvisit > 5',
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'isvisitisvisit == 9',
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'isvisitisvisit == 9 && isvisit > 5',
            pv: 2800,
            amt: 2290,
        },
        {
            name: 'isvisitisvisit == 9 || (isvisit > 5 && time_spent_ref_action < 10)',
            pv: 3908,
            amt: 2000,
        },
    ];
    const barSize = 40;
    const chartWidth = data.length * barSize + data.length * 10; // 간격 포함한 넉넉한 너비
    return (
        <div className='filtering-result-graph-container'>
            <div className='result-graph-wrapper'>
                <div className='result-graph-title'>
                    <p className='result-graph-title-text'>필터링 결과 그래프</p>
                </div>
                <div className='result-graph'>
                    <BarChart
                    width={chartWidth}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 10,
                        bottom: 30,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={<CustomizedAxisTick />} interval={0} />
                        <YAxis tick={{ fill: '#1ED863', fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="pv" fill="#1ED863" activeBar={<Rectangle fill="white" stroke="green" />} barSize={30} />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}

export default FilteringResultGraph;