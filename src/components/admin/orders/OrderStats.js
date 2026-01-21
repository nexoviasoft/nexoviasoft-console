"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export default function OrderStats() {
  const stats = [
    {
      title: "Total Orders",
      value: "1,248",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "In Progress",
      value: "45",
      change: "+4",
      trend: "neutral",
      icon: Clock,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Completed",
      value: "1,180",
      change: "+8.2%",
      trend: "up",
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Revenue",
      value: "$845.2k",
      change: "+14.1%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
              <div className="flex items-center mt-1 gap-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-400">from last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
