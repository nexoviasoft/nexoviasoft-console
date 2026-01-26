"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  { name: "In Office", value: 63, color: "#3b82f6" }, // Primary Blue
  { name: "Half Day", value: 6, color: "#EFFC76" }, // Brand Yellow
  { name: "Work from Home", value: 22, color: "#22d3ee" }, // Teal
  { name: "On Leave", value: 9, color: "#ec4899" }, // Pink
];

export default function LeaveStats() {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">My Teams</h3>
            <p className="text-sm text-white/60">From 4-10 Sep, 2023</p>
          </div>
          <Select defaultValue="week">
            <SelectTrigger className="w-[140px] bg-black/40 border border-white/20 text-white">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-8">
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-[#EFFC76]">63%</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-y-6 gap-x-4">
            {data.map((item) => (
              <div key={item.name} className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-white/70">{item.name}</span>
                </div>
                <div className="flex items-baseline gap-1 pl-3">
                  <span className="text-xl font-bold text-white">
                    {item.value}
                  </span>
                  <span className="text-sm text-white/50">%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
