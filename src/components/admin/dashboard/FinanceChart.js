import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Defs,
  LinearGradient,
  CartesianGrid
} from "recharts";

const data = [
  { month: "Jan", income: 2400 },
  { month: "Feb", income: 1398 },
  { month: "Mar", income: 9800 },
  { month: "Apr", income: 3908 },
  { month: "May", income: 4800 },
  { month: "Jun", income: 3800 },
  { month: "Jul", income: 4300 },
  { month: "Aug", income: 4300 },
  { month: "Sep", income: 5300 },
  { month: "Oct", income: 4300 },
  { month: "Nov", income: 5300 },
  { month: "Dec", income: 6300 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121212] border border-[#EFFC76]/20 p-3 rounded-lg shadow-xl min-w-[120px]">
        <p className="text-white/60 mb-2 text-xs font-medium">{label}</p>
        <div className="flex items-center justify-between gap-4">
            <span className="text-white text-sm font-semibold">Income</span>
            <span className="text-[#EFFC76] text-sm font-bold">${payload[0].value.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function FinanceChart() {
  return (
    <div className="h-72 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          barSize={32}
        >
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 500 }} 
            dy={10}
          />
          
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'rgba(255,255,255,0.03)', radius: [4,4,4,4] }} // Enhanced cursor
          />
          
          {/* Background Track */}
          <Bar
            dataKey="income"
            data={data.map(d => ({ ...d, full: 10000 }))} // Max value reference
            fill="#ffffff"
            fillOpacity={0.05}
            radius={[4, 4, 4, 4]}
            tooltipType="none"
            isAnimationActive={false}
            barSize={32}
            position="center"
          />

          {/* Value Bar */}
          <Bar
            dataKey="income"
            fill="#EFFC76"
            radius={[4, 4, 4, 4]}
            barSize={32}
            className="hover:opacity-90 transition-opacity cursor-pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
