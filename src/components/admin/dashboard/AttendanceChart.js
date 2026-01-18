"use client";

import React from "react";
import {
  ComposedChart,
  Bar,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Defs,
  LinearGradient,
} from "recharts";

const data = [
  { day: "Mon", onTime: 65, late: 25, absent: 10 },
  { day: "Tue", onTime: 75, late: 20, absent: 5 },
  { day: "Wed", onTime: 85, late: 10, absent: 5 },
  { day: "Thu", onTime: 70, late: 20, absent: 10 },
  { day: "Fri", onTime: 60, late: 30, absent: 10 },
  { day: "Sat", onTime: 40, late: 10, absent: 50 },
  { day: "Sun", onTime: 30, late: 5, absent: 65 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-sm text-xs">
        <p className="text-white font-semibold mb-2">{label}</p>
        <div className="space-y-1">
          {/* Reverse payload to show Top-down order matching chart stack if needed, or just standard */}
          {payload.slice().reverse().map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }} // Recharts might pass hex, but we used gradients. It usually picks a color representation.
              />
              <span className="text-white/70 capitalize">
                {entry.name === "onTime" ? "On Time" : entry.name}:
              </span>
              <span className="font-mono text-white">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function AttendanceChart() {
  return (
    <div className="h-56 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          barSize={48}
        >
          <defs>
            {/* OnTime Gradient (Neon) */}
            <linearGradient id="onTimeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFFC76" stopOpacity={1} />
              <stop offset="100%" stopColor="#dbe860" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="onTimeFlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFFC76" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#EFFC76" stopOpacity={0.1} />
            </linearGradient>

            {/* Late Gradient (White/Grey) */}
            <linearGradient id="lateGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#cfcfcf" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="lateFlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>

            {/* Absent Gradient (Red/Purple) */}
            <linearGradient id="absentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={1} />
              <stop offset="100%" stopColor="#991b1b" stopOpacity={1} />
            </linearGradient>
             <linearGradient id="absentFlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            dy={10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />

          {/* Flows (Background Areas) */}
          <Area
            type="monotone"
            dataKey="absent"
            stackId="1"
            stroke="none"
            fill="url(#absentFlow)"
          />
          <Area
            type="monotone"
            dataKey="late"
            stackId="1"
            stroke="none"
            fill="url(#lateFlow)"
          />
          <Area
            type="monotone"
            dataKey="onTime"
            stackId="1"
            stroke="none" // Remove stroke for cleaner flow look
            fill="url(#onTimeFlow)"
          />

          {/* Bars (Foreground Blocks) */}
          {/* Note: In Recharts, if you stack areas and bars with same stackId, they might interact unexpectedly 
              or sit on top of each other. 
              Usually ComposedChart separates stacks by type. 
              Let's use stackId="a" for Bars and stackId="b" for Areas so they are independent layers?
              Actually, we WANT them to overlap perfectly. 
              If stackId is same, `recharts` counts them in the same stack total. 
              Example: Absent=10. 
              If Area has stackId=1, AreaTop=10.
              If Bar has stackId=1, BarTop=10+10? No. 
              Usually mixing types in a stack is tricky.
              Let's test separate stackIds. 
              Area stackId="area", Bar stackId="bar". 
              Since the data values are same, they will render at same heights.
          */}

          <Bar
            dataKey="absent"
            stackId="bar"
            fill="url(#absentGradient)"
            radius={[0, 0, 4, 4]}
            stroke="#121212" // Dark stroke to simulate gap? Or transparent?
            strokeWidth={1}
          />
          <Bar
            dataKey="late"
            stackId="bar"
            fill="url(#lateGradient)"
            stroke="#121212"
            strokeWidth={1}
          />
          <Bar
            dataKey="onTime"
            stackId="bar"
            fill="url(#onTimeGradient)"
            radius={[4, 4, 0, 0]}
            stroke="#121212"
            strokeWidth={1}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
