import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SensorDataPoint } from '../types';
import { MetricCard } from './MetricCard';

interface RealtimeChartProps {
  data: SensorDataPoint[];
}

export const RealtimeChart: React.FC<RealtimeChartProps> = ({ data }) => {
  const latestData = data[data.length - 1] || { cadence: 0, strain: 0, vibration: 0 };
  
  return (
    <MetricCard title="Live Sensor Stream" className="h-64 flex flex-col">
       <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 text-sm">
            <p className="text-gray-300"><span className="font-bold text-cyan-400">{latestData.cadence.toFixed(2)}</span> Hz (Cadence)</p>
            <p className="text-gray-300"><span className="font-bold text-pink-400">{latestData.strain.toFixed(2)}</span> Nm (Strain)</p>
            <p className="text-gray-300"><span className="font-bold text-amber-400">{latestData.vibration.toFixed(2)}</span> Hz (Vibration)</p>
       </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
            <XAxis dataKey="time" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={{ stroke: '#4b5563' }} />
            <YAxis yAxisId="cadence" tick={{ fill: '#67e8f9', fontSize: 12 }} axisLine={{ stroke: '#0891b2' }} tickLine={{ stroke: '#0891b2' }} />
            <YAxis yAxisId="strain" orientation="right" tick={{ fill: '#f472b6', fontSize: 12 }} axisLine={{ stroke: '#be185d' }} tickLine={{ stroke: '#be185d' }} />
            <YAxis yAxisId="vibration" orientation="right" tick={{ fill: '#fcd34d', fontSize: 12 }} axisLine={{ stroke: '#b45309' }} tickLine={{ stroke: '#b45309' }} domain={[0, 'dataMax + 2']} hide={true} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: 'rgba(0, 255, 255, 0.3)',
                color: '#d1d5db',
              }}
              itemStyle={{ color: '#d1d5db' }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Line yAxisId="cadence" type="monotone" dataKey="cadence" stroke="#06b6d4" strokeWidth={2} dot={false} name="Cadence (Hz)" />
            <Line yAxisId="strain" type="monotone" dataKey="strain" stroke="#ec4899" strokeWidth={2} dot={false} name="Strain (Nm)" />
            <Line yAxisId="vibration" type="monotone" dataKey="vibration" stroke="#f59e0b" strokeWidth={2} dot={false} name="Vibration (Hz)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  );
};