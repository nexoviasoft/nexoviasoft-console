"use client";

import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = [
  { name: "Mon", last: 45, current: 30 },
  { name: "Tue", last: 8, current: 20 },
  { name: "Wed", last: 0, current: 0 },
  { name: "Thu", last: 50, current: 40 },
  { name: "Fri", last: 30, current: 35 },
  { name: "Sat", last: 20, current: 25 },
  { name: "Sun", last: 45, current: 42 },
  { name: "Mon2", last: 0, current: 0 },
  { name: "Tue2", last: 15, current: 30 },
  { name: "Wed2", last: 48, current: 48 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 p-4 rounded-xl shadow-lg border border-white/20 min-w-[220px]">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-8 h-8 ring-2 ring-[#EFFC76]/40">
            <AvatarImage src="/avatars/miracle.jpg" />
            <AvatarFallback>MV</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-white">Miracle Vetrovs</div>
            <div className="text-xs text-white/60">UX Designer - UXD3</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs text-white/60">Last week</span>
            </div>
            <div className="text-sm font-bold text-white">32 Hrs</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <span className="text-xs text-white/60">This week</span>
            </div>
            <div className="text-sm font-bold text-white">34.30 Hrs</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function TimingsChart() {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white">Timings</h3>
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

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
              <Bar dataKey="last" fill="#3b82f6" radius={[4, 4, 4, 4]} barSize={6} />
              <Bar dataKey="current" fill="#22d3ee" radius={[4, 4, 4, 4]} barSize={6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span className="text-sm text-white/70">Last week</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-cyan-400"></div>
            <span className="text-sm text-white/70">This week</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
