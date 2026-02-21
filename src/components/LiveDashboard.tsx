import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '08:00', flow: 400, prediction: 420 },
  { time: '09:00', flow: 800, prediction: 780 },
  { time: '10:00', flow: 600, prediction: 610 },
  { time: '11:00', flow: 450, prediction: 440 },
  { time: '12:00', flow: 500, prediction: 520 },
  { time: '13:00', flow: 700, prediction: 710 },
  { time: '14:00', flow: 900, prediction: 880 },
];

export const LiveDashboard = () => {
  return (
    <div className="w-full h-[400px] bg-slate-900/50 rounded-[2rem] p-8 border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-white font-bold text-xl tracking-tight">Real-time Traffic Flow</h4>
          <p className="text-slate-500 text-sm">Live sensor data vs. LSTM prediction</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Predicted</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#11b4d4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#11b4d4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
            itemStyle={{ color: '#11b4d4' }}
          />
          <Area 
            type="monotone" 
            dataKey="flow" 
            stroke="#11b4d4" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorFlow)" 
          />
          <Area 
            type="monotone" 
            dataKey="prediction" 
            stroke="#475569" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="transparent" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
