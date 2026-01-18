import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Defs,
  LinearGradient
} from "recharts";

const data = [
  { month: "Jan", income: 4000, expense: 2400 },
  { month: "Feb", income: 3000, expense: 1398 },
  { month: "Mar", income: 5000, expense: 4800 },
  { month: "Apr", income: 2780, expense: 3908 },
  { month: "May", income: 5890, expense: 4800 },
  { month: "Jun", income: 2390, expense: 3800 },
  { month: "Jul", income: 3490, expense: 4300 },
  { month: "Aug", income: 4490, expense: 4300 },
  { month: "Sep", income: 5490, expense: 5300 },
  { month: "Oct", income: 6490, expense: 4300 },
  { month: "Nov", income: 7490, expense: 5300 },
  { month: "Dec", income: 8490, expense: 6300 },
];

// Generate simple stream-like data
// "Silhouette" offset centers the stacked areas
const streamData = data.map(d => ({
  ...d,
  value: d.income + d.expense, // generic volume
  v1: d.income,
  v2: d.expense
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121212] border border-[#EFFC76]/20 p-3 rounded-lg shadow-xl">
        <p className="text-white font-semibold mb-2">{label}</p>
        <div className="text-[#EFFC76] text-sm">
          ${payload[0].value.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

export default function FinanceChart() {
  return (
    <div className="h-64 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={streamData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          stackOffset="silhouette" // Creates the stream/river effect
        >
          <defs>
            <linearGradient id="financeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFFC76" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#EFFC76" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} 
            dy={10}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
          
          <Area
            type="monotone"
            dataKey="v1"
            stackId="1"
            stroke="none"
            fill="url(#financeGradient)"
          />
          <Area
            type="monotone"
            dataKey="v2"
            stackId="1"
            stroke="none"
            fill="#ffffff"
            fillOpacity={0.1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
