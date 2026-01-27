"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Clock, Layout, TrendingUp } from "lucide-react";

export default function ReportsStats({ dashboard }) {
  const data = dashboard;

  const iconByLabel = {
    "Total Revenue": DollarSign,
    "Hours Worked": Clock,
    "Active Projects": Layout,
    "Efficiency": TrendingUp,
  };

  const fallbackStats = [
    {
      label: "Total Revenue",
      value: "$124,500",
      subtext: "+12% vs last period",
      icon: DollarSign,
      trend: "up",
    },
    {
      label: "Hours Worked",
      value: "1,450h",
      subtext: "Total billable hours",
      icon: Clock,
      trend: "up",
    },
    {
      label: "Active Projects",
      value: "18",
      subtext: "3 due this week",
      icon: Layout,
      trend: "neutral",
    },
    {
      label: "Efficiency",
      value: "94%",
      subtext: "+2% productivity",
      icon: TrendingUp,
      trend: "up",
    },
  ];

  const stats =
    data?.stats?.length > 0
      ? data.stats.map((s) => ({
          ...s,
          icon: iconByLabel[s.label] || TrendingUp,
        }))
      : fallbackStats;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-white/20">
          <CardContent className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/40 flex items-center justify-center">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#EFFC76]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-white/60">{stat.label}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-none mt-1">
                {stat.value}
              </h3>
              <p className="text-[10px] sm:text-xs text-white/60 mt-1">
                {stat.subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
