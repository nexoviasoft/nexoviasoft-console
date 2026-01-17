"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Clock, Layout, TrendingUp } from "lucide-react";

export default function ReportsStats() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$124,500",
      subtext: "+12% vs last period",
      icon: DollarSign,
      trend: "up"
    },
    {
      label: "Hours Worked",
      value: "1,450h",
      subtext: "Total billable hours",
      icon: Clock,
      trend: "up"
    },
    {
      label: "Active Projects",
      value: "18",
      subtext: "3 due this week",
      icon: Layout,
      trend: "neutral"
    },
    {
      label: "Efficiency",
      value: "94%",
      subtext: "+2% productivity",
      icon: TrendingUp,
      trend: "up"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-white/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/40 flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-[#EFFC76]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white leading-none mt-1">
                {stat.value}
              </h3>
              <p className="text-xs text-white/60 mt-1">
                {stat.subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
