"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", onTime: 65, late: 25, absent: 10 },
  { day: "Tue", onTime: 75, late: 20, absent: 5 },
  { day: "Wed", onTime: 85, late: 10, absent: 5 },
  { day: "Thu", onTime: 70, late: 20, absent: 10 },
  { day: "Fri", onTime: 60, late: 30, absent: 10 },
  { day: "Sat", onTime: 40, late: 10, absent: 50 }, // Weekend logic handled by data usually
  { day: "Sun", onTime: 30, late: 5, absent: 65 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-sm text-xs">
        <p className="text-white font-semibold mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
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
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barSize={48}
          stackOffset="expand" // Normalized to 100% or just standard stacked? User screen shows varying heights? 
          // User screen shows stacked blocks filling height? Or maybe not filling.
          // The previous code had height dependent on intensity. 
          // Let's stick to standard stacked bar (values sum to 100 or raw count). 
          // "Attendance Rate" implies percentage. I'll use percentage data summing to 100 for visual consistency.
        >
          {/* <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" /> */}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            dy={10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          
          {/* Absent (Bottom most usually, or Top? Stack order: rendered first is bottom) */}
          {/* Let's render Absent first (bottom), then Late, then OnTime (top) */}
          <Bar
            dataKey="absent"
            stackId="a"
            fill="#EF4444" // Red
            radius={[0, 0, 4, 4]} // Rounded bottom
            fillOpacity={0.5}
          />
          <Bar
            dataKey="late"
            stackId="a"
            fill="#FFFFFF" // White
            fillOpacity={0.7}
          />
          <Bar
            dataKey="onTime"
            stackId="a"
            fill="#EFFC76" // Neon
            radius={[4, 4, 0, 0]} // Rounded top
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
