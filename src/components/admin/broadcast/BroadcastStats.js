"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Eye, CalendarClock, MessageSquare } from "lucide-react";

export default function BroadcastStats() {
  const stats = [
    {
      label: "Total Sent",
      value: "145",
      subtext: "Last 30 days",
      icon: Send,
      color: "text-blue-600",
      bg: "bg-blue-100",
      trend: "up"
    },
    {
      label: "Avg. Open Rate",
      value: "82%",
      subtext: "+5% vs last month",
      icon: Eye,
      color: "text-green-600",
      bg: "bg-green-100",
      trend: "up"
    },
    {
      label: "Scheduled",
      value: "3",
      subtext: "Upcoming this week",
      icon: CalendarClock,
      color: "text-purple-600",
      bg: "bg-purple-100",
      trend: "neutral"
    },
    {
      label: "Engagement",
      value: "4.5",
      subtext: "Avg. comments per post",
      icon: MessageSquare,
      color: "text-orange-600",
      bg: "bg-orange-100",
      trend: "down"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm border-gray-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 leading-none mt-1">{stat.value}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {stat.subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
