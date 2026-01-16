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
      color: "text-green-600",
      bg: "bg-green-100",
      trend: "up"
    },
    {
      label: "Hours Worked",
      value: "1,450h",
      subtext: "Total billable hours",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-100",
      trend: "up"
    },
    {
      label: "Active Projects",
      value: "18",
      subtext: "3 due this week",
      icon: Layout,
      color: "text-purple-600",
      bg: "bg-purple-100",
      trend: "neutral"
    },
    {
      label: "Efficiency",
      value: "94%",
      subtext: "+2% productivity",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-100",
      trend: "up"
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
              <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                {stat.subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
