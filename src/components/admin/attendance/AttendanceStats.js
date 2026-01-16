"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, AlertCircle, XCircle } from "lucide-react";

export default function AttendanceStats() {
  const stats = [
    {
      label: "Total Employees",
      value: "1,298",
      subtext: "All Active",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "On Time",
      value: "1,120",
      subtext: "86% of Total",
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Late Arrival",
      value: "154",
      subtext: "12% of Total",
      icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      label: "Absent",
      value: "24",
      subtext: "2% of Total",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
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
              <p className={`text-xs mt-1 ${stat.color} font-medium bg-opacity-10 rounded px-1.5 py-0.5 inline-block bg-current`}>
                {stat.subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
