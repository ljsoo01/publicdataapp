import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';


export default function Example({ accidents }) {

  const data = accidents.map(accident => {
    return {
      name: accident.freqocZoneNm,
      uv: accident.acdntCo
    }
  })

  console.log(accidents);

    return (
      <div className='h-[400px]'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data} margin={{right:30, left:-20, top:30, bottom:-10}}>
        <XAxis dataKey="name" >
          <Label width={10}/>
        </XAxis>
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="uv" fill="#084B8A" background={{ fill: '#eee' }}/>
        </BarChart>
      </ResponsiveContainer>
      </div>
    );

}
