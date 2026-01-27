"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Eye, CalendarClock, MessageSquare } from "lucide-react";

export default function BroadcastStats({ dashboard }) {
  const data = dashboard;

  const iconByLabel = {
    "Total Sent": Send,
    "Avg. Open Rate": Eye,
    Scheduled: CalendarClock,
    Engagement: MessageSquare,
  };

  const fallbackStats = [
    {
      label: "Total Sent",
      value: "145",
      subtext: "Last 30 days",
      icon: Send,
      trend: "up",
    },
    {
      label: "Avg. Open Rate",
      value: "82%",
      subtext: "+5% vs last month",
      icon: Eye,
      trend: "up",
    },
    {
      label: "Scheduled",
      value: "3",
      subtext: "Upcoming this week",
      icon: CalendarClock,
      trend: "neutral",
    },
    {
      label: "Engagement",
      value: "4.5",
      subtext: "Avg. comments per post",
      icon: MessageSquare,
      trend: "down",
    },
  ];

  const stats =
    data?.stats?.length > 0
      ? data.stats.map((s) => ({
          ...s,
          icon: iconByLabel[s.label] || Send,
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
