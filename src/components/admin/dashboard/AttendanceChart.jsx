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
  CartesianGrid,
} from "recharts";
import { useGetAttendanceTrendQuery } from "@/api/admin/dashboard/dashboardApi";

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

const CustomDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;
  return (
    <circle cx={cx} cy={cy} r={4} stroke="white" strokeWidth={2} fill="#EFFC76" />
  );
};

export default function AttendanceChart({ period = "Weekly" }) {
  const { data: trendResp } = useGetAttendanceTrendQuery(period);
  const apiData = trendResp?.data?.data;

  const data = Array.isArray(apiData)
    ? apiData.map((d) => ({ day: d.label, presence: d.presence }))
    : [];

  return (

    <div className="h-56 w-full mt-4">
      <div 
        className="w-full h-full overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div style={{ 
          width: period === "Monthly" ? "250%" : "100%", 
          minWidth: period === "Weekly" ? "500px" : period === "Yearly" ? "600px" : "100%",
          height: "100%" 
        }}>
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
                interval={period === "Monthly" ? 0 : "preserveStartEnd"} // Show all ticks for monthly
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'transparent' }} 
                offset={-20}
              />

              <Bar
                dataKey="presence"
                // Background track
                background={{ fill: 'rgba(255,255,255,0.05)', radius: [50, 50, 50, 50] }}
                fill="url(#barGradient)"
                radius={[50, 50, 50, 50]}
                barSize={period === "Monthly" ? 16 : period === "Weekly" ? 48 : 16} // Match yearly size for monthly
              />

              <Line
                type="monotone"
                dataKey="presence"
                stroke="#EFFC76"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={<CustomDot />}
                activeDot={{ r: 6, stroke: 'white', strokeWidth: 2, fill: '#EFFC76' }}
                isAnimationActive={true}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
