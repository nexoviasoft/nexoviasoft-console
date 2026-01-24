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
      color: "bg-[#EFFC76]/10 text-[#EFFC76]",
    },
    {
      title: "In Progress",
      value: "45",
      change: "+4",
      trend: "neutral",
      icon: Clock,
      color: "bg-[#EFFC76]/10 text-[#EFFC76]",
    },
    {
      title: "Completed",
      value: "1,180",
      change: "+8.2%",
      trend: "up",
      icon: CheckCircle2,
      color: "bg-[#EFFC76]/10 text-[#EFFC76]",
    },
    {
      title: "Total Revenue",
      value: "$845.2k",
      change: "+14.1%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-[#EFFC76]/10 text-[#EFFC76]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card  border-white/10">
          <CardContent className="p-3 md:p-6 flex flex-col md:flex-row  items-center md:justify-between gap-3 md:gap-0">
            <div className="order-2 md:order-1 w-full text-center md:text-left">
              <p className="text-xs md:text-sm font-medium text-white/60">{stat.title}</p>
              <h3 className="text-lg md:text-2xl font-bold text-white mt-1 md:mt-2">{stat.value}</h3>
              <div className="flex flex-wrap items-center justify-center md:justify-start mt-1 gap-1.5 md:gap-2">
                <span className={`text-[10px] md:text-xs font-medium px-1.5 md:px-2 py-0.5 rounded-full ${stat.trend === 'up' ? 'bg-[#EFFC76]/10 text-[#EFFC76]' : 'bg-white/10 text-white/60'}`}>
                  {stat.change}
                </span>
                <span className="text-[10px] md:text-xs text-white/40">from last month</span>
              </div>
            </div>
            <div className={`order-1 md:order-2 p-2 md:p-3 rounded-xl border border-[#EFFC76]/20 ${stat.color} mb-1 md:mb-0`}>
              <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
