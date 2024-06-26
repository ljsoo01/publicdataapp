import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


export default function Chart({ accidents }) {

  const data = accidents.map(accident => {
    return {
      subject: accident.freqocZoneNm,
      A: accident.acdntCo
    }
  })

    return (
      <div className='h-[500px]'>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#084B8A" fill="#084B8A" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
      </div>
    );
}
