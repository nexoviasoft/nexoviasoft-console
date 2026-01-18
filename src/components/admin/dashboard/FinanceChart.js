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


const weeklyData = [
  { label: "Mon", income: 1500 },
  { label: "Tue", income: 2300 },
  { label: "Wed", income: 3400 },
  { label: "Thu", income: 2900 },
  { label: "Fri", income: 4500 },
  { label: "Sat", income: 3200 },
  { label: "Sun", income: 2100 },
];

const monthlyData = [
  { label: "Week 1", income: 12000 },
  { label: "Week 2", income: 14500 },
  { label: "Week 3", income: 11200 },
  { label: "Week 4", income: 16800 },
];

const quarterlyData = [
  { label: "Q1", income: 45000 },
  { label: "Q2", income: 52000 },
  { label: "Q3", income: 48000 },
  { label: "Q4", income: 61000 },
];

const yearlyData = [
  { label: "Jan", income: 2400 },
  { label: "Feb", income: 1398 },
  { label: "Mar", income: 9800 },
  { label: "Apr", income: 3908 },
  { label: "May", income: 4800 },
  { label: "Jun", income: 3800 },
  { label: "Jul", income: 4300 },
  { label: "Aug", income: 4300 },
  { label: "Sep", income: 5300 },
  { label: "Oct", income: 4300 },
  { label: "Nov", income: 5300 },
  { label: "Dec", income: 6300 },
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

export default function FinanceChart({ period = "Yearly" }) {
  let data = yearlyData;
  let barWidth = 32;

  if (period === "Weekly") {
    data = weeklyData;
    barWidth = 48;
  } else if (period === "Monthly") {
    data = monthlyData;
    barWidth = 64;
  } else if (period === "Quarterly") {
    data = quarterlyData;
    barWidth = 80;
  }

  return (
    <div className="h-72 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          barSize={barWidth}
        >
          <XAxis 
            dataKey="label" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 500 }} 
            dy={10}
          />
          
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'rgba(255,255,255,0.03)', radius: [4,4,4,4] }} 
          />
          
          {/* Background Track */}
          <Bar
            dataKey="income"
            data={data.map(d => ({ ...d, full: 100000 }))} // Normalized max reference
            fill="#ffffff"
            fillOpacity={0.05}
            radius={[4, 4, 4, 4]}
            tooltipType="none"
            isAnimationActive={false}
            position="center"
          />

          {/* Value Bar */}
          <Bar
            dataKey="income"
            fill="#EFFC76"
            radius={[4, 4, 4, 4]}
            className="hover:opacity-90 transition-opacity cursor-pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
