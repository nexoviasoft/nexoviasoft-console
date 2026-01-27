"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fallbackData = [
  { name: "Completed", value: 400 },
  { name: "In Progress", value: 300 },
  { name: "To Do", value: 300 },
  { name: "Backlog", value: 200 },
];

const COLORS = ["#10b981", "#8b5cf6", "#EFFC76", "#9ca3af"];

export default function TaskDistributionChart({ dashboard }) {
  const data = dashboard;
  const chartData = data?.taskDistribution?.length ? data.taskDistribution : fallbackData;

  return (
    <Card className="glass-card border-white/20 col-span-1">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-semibold text-white">Task Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.95)",
                  borderRadius: "10px",
                  border: "1px solid rgba(148,163,184,0.45)",
                  boxShadow: "0 18px 45px rgba(15,23,42,0.65)",
                  color: "#F9FAFB",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ color: "#E5E7EB", fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
