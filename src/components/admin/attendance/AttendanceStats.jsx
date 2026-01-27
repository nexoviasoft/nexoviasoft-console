"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, AlertCircle, XCircle } from "lucide-react";

export default function AttendanceStats({ stats }) {
  const safeStats = stats || {
    total: 0,
    onTime: 0,
    late: 0,
    absent: 0,
    onTimePercentage: "0.00",
    latePercentage: "0.00",
    absentPercentage: "0.00",
  };

  const cards = [
    {
      label: "Total Records",
      value: String(safeStats.total ?? 0),
      subtext: "Your attendance entries",
      icon: Users,
    },
    {
      label: "On Time",
      value: String(safeStats.onTime ?? 0),
      subtext: `${safeStats.onTimePercentage ?? "0.00"}% of Total`,
      icon: Clock,
    },
    {
      label: "Late Arrival",
      value: String(safeStats.late ?? 0),
      subtext: `${safeStats.latePercentage ?? "0.00"}% of Total`,
      icon: AlertCircle,
    },
    {
      label: "Absent",
      value: String(safeStats.absent ?? 0),
      subtext: `${safeStats.absentPercentage ?? "0.00"}% of Total`,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4">
      {cards.map((stat, index) => (
        <Card key={index} className="glass-card">
          <CardContent className="p-3 md:p-6 flex flex-col sm:flex-row items-center gap-3 md:gap-4 text-center sm:text-left">
            <div className="p-2 md:p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/40 flex items-center justify-center shrink-0">
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-[#EFFC76]" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-white/60">{stat.label}</p>
              <h3 className="text-lg md:text-2xl font-bold text-white leading-none mt-1">{stat.value}</h3>
              <p className="text-xs mt-3  md:mt-1 text-[#EFFC76] font-medium bg-[#EFFC76]/10 rounded px-1.5 py-0.5 inline-block">
                {stat.subtext}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
