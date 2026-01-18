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
    },
    {
      label: "On Time",
      value: "1,120",
      subtext: "86% of Total",
      icon: Clock,
    },
    {
      label: "Late Arrival",
      value: "154",
      subtext: "12% of Total",
      icon: AlertCircle,
    },
    {
      label: "Absent",
      value: "24",
      subtext: "2% of Total",
      icon: XCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/40 flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-[#EFFC76]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white leading-none mt-1">{stat.value}</h3>
              <p className="text-xs mt-1 text-[#EFFC76] font-medium bg-[#EFFC76]/10 rounded px-1.5 py-0.5 inline-block">
                {stat.subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
