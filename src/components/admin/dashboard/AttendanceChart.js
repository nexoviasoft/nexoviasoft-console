"use client";

import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Defs,
  LinearGradient,
  CartesianGrid
} from "recharts";

const data = [
  { day: "Mon", presence: 90 },
  { day: "Tue", presence: 85 },
  { day: "Wed", presence: 95 },
  { day: "Thu", presence: 80 },
  { day: "Fri", presence: 88 },
  { day: "Sat", presence: 60 },
  { day: "Sun", presence: 50 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#EFFC76] text-black font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg">
        {payload[0].value}% Attendance
      </div>
    );
  }
  return null;
};

// Custom dot for the line
const CustomDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;
  return (
    <circle cx={cx} cy={cy} r={4} stroke="white" strokeWidth={2} fill="#EFFC76" />
  );
};

export default function AttendanceChart() {
  return (
    <div className="h-56 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          barSize={24}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFFC76" stopOpacity={0.8} />
              <stop offset="90%" stopColor="#EFFC76" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
            dy={10}
          />
          
          {/* Using a floating tooltip styled like the image (green bubble) */}
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'transparent' }} 
            offset={-20}
          />

          {/* Background Track Bars (Max height reference, e.g., 100%) */}
          <Bar
            dataKey="presence"
            data={data.map(d => ({ ...d, full: 100 }))} // Trick: render full height bars behind? 
            // Actually Bar 'background' prop is easier.
            // Let's use the main Bar with 'background' prop.
            fill="transparent"
            barSize={24}
            isAnimationActive={false}
            fillOpacity={0}
            legendType="none"
            tooltipType="none"
          />

          <Bar
            dataKey="presence"
            fill="url(#barGradient)"
            radius={[50, 50, 50, 50]} // Fully rounded
            background={{ fill: 'rgba(255,255,255,0.05)', radius: [50, 50, 50, 50] }}
            barSize={28}
          />

          <Line
            type="monotone"
            dataKey="presence"
            stroke="#EFFC76"
            strokeWidth={2}
            strokeDasharray="4 4" // Dashed line
            dot={<CustomDot />}
            activeDot={{ r: 6, stroke: 'white', strokeWidth: 2, fill: '#EFFC76' }}
            isAnimationActive={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
