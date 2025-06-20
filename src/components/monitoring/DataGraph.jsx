import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/monitoring/DataGraph.css'

const DataGraph = () => {
  const [data, setData] = useState([]);
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  
  useEffect(() => {
      const dataAnalysisSource = new EventSource(`${Server_IP}/data-cnt-graph`);

      dataAnalysisSource.addEventListener(`dataCntGraph`, (e) => {
        const data = JSON.parse(e.data);
        const parsedData = Object.entries(data).map(([timestamp, value]) => {
          const timePart = timestamp.split("T")[1];
          return {
            time: timePart,
            value: Number(value)
          };
        });
        setData(parsedData);
      });

      dataAnalysisSource.onerror = () => {
        dataAnalysisSource.close();
      };

      return () => {
        dataAnalysisSource.close();
      };
  }, []);

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
                        <XAxis dataKey="time" tick={{ fill: '#FFFFFF', fontSize: 12 }}/>
                        <YAxis tick={{ fill: '#FFFFFF', fontSize: 12 }}/>
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#1ED863" activeDot={{ r: 3 }} isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default DataGraph;
