"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fallbackData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

export default function RevenueChart({ dashboard }) {
  const data = dashboard;
  const chartData = data?.revenueTrend?.length ? data.revenueTrend : fallbackData;

  return (
    <Card className="glass-card border-white/20 col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-semibold text-white">Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EFFC76" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#EFFC76" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(148, 163, 184, 0.35)"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#E5E7EB", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#E5E7EB", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.95)",
                  borderRadius: "10px",
                  border: "1px solid rgba(148,163,184,0.45)",
                  boxShadow: "0 18px 45px rgba(15,23,42,0.65)",
                  color: "#F9FAFB",
                }}
                itemStyle={{ color: "#EFFC76" }}
                cursor={{ stroke: "rgba(148,163,184,0.4)", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#EFFC76"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
