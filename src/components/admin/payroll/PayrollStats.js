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
      color: "text-green-600",
      bg: "bg-green-100",
      trend: "up"
    },
    {
      label: "Avg. Salary",
      value: "$3,450.00",
      subtext: "Per employee",
      icon: PieChart,
      color: "text-purple-600",
      bg: "bg-purple-100",
      trend: "neutral"
    },
    {
      label: "Pending",
      value: "12",
      subtext: "$14,500 remaining",
      icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-100",
      trend: "down"
    },
    {
      label: "Paid",
      value: "34",
      subtext: "$30,731 cleared",
      icon: CheckCircle2,
      color: "text-blue-600",
      bg: "bg-blue-100",
      trend: "up"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
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
