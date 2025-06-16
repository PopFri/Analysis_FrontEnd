import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/monitoring/DataGraph.css'

const data = [
  {
    name: 'Page A',
    uv: 4000,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  },
  {
    name: 'Page E',
    uv: 1890,
  },
  {
    name: 'Page F',
    uv: 2390,
  },
  {
    name: 'Page G',
    uv: 3490,
  },
];

const DataGraph = () => {

    return (
        <div className='datagraph-container'>
            <div className='datagraph-list'>
                <div className='datagraph-title'>
                    <p className='datagraph-title-text'>방문자 수</p>
                </div>
                <div className='data-graph'>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                        width={500}
                        height={500}
                        data={data}
                        margin={{
                            top: 50,
                            right: 30,
                            bottom: 5,
                        }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fill: '#FFFFFF', fontSize: 12 }}/>
                            <YAxis tick={{ fill: '#FFFFFF', fontSize: 12 }}/>
                            <Tooltip />
                            <Line type="monotone" dataKey="uv" stroke="#1ED863" activeDot={{ r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DataGraph;
