"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, PieChart, CheckCircle2, AlertCircle } from "lucide-react";

export default function PayrollStats() {
  const stats = [
    {
      label: "Total Cost",
      value: "$45,231.89",
      subtext: "+2.5% from last month",
      icon: DollarSign,
      trend: "up"
    },
    {
      label: "Avg. Salary",
      value: "$3,450.00",
      subtext: "Per employee",
      icon: PieChart,
      trend: "neutral"
    },
    {
      label: "Pending",
      value: "12",
      subtext: "$14,500 remaining",
      icon: AlertCircle,
      trend: "down"
    },
    {
      label: "Paid",
      value: "34",
      subtext: "$30,731 cleared",
      icon: CheckCircle2,
      trend: "up"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-white/20">
          <CardContent className="px-6 py-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#EFFC76]/15 border border-[#EFFC76]/40">
              <stat.icon className="w-6 h-6 text-[#EFFC76]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/70">{stat.label}</p>
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
