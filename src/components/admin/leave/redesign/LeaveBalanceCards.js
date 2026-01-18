"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Clock, AlertCircle } from "lucide-react";

export default function LeaveBalanceCards() {
  const stats = [
    {
      title: "Casual Leave",
      used: 4,
      total: 12,
      icon: Briefcase,
      trend: "+2 this month",
    },
    {
      title: "Sick Leave",
      used: 2,
      total: 10,
      icon: AlertCircle,
      trend: "Low usage",
    },
    {
      title: "Earned Leave",
      used: 5,
      total: 15,
      icon: Clock,
      trend: "Accumulating",
    },
    {
      title: "Unpaid Leave",
      used: 0,
      total: "N/A",
      icon: AlertCircle,
      trend: "0 days",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const percentage = typeof stat.total === 'number' ? Math.round((stat.used / stat.total) * 100) : 0;
        
        return (
          <Card
            key={index}
            className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="relative p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#EFFC76]/20 rounded-lg backdrop-blur-md">
                  <Icon className="w-5 h-5 text-[#EFFC76]" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium bg-black/40 border border-white/20 px-2 py-1 rounded-full backdrop-blur-md text-white/80">
                  {stat.trend}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-white/80">{stat.title}</p>
                <h3 className="text-3xl font-bold tracking-tight text-[#EFFC76]">
                  {typeof stat.total === 'number' ? (
                    <span>
                      {stat.total - stat.used}
                      <span className="text-lg text-white/70 font-normal ml-1">/ {stat.total}</span>
                    </span>
                  ) : (
                    stat.used
                  )}
                </h3>
              </div>
              
              {/* Progress Bar (if applicable) */}
              {typeof stat.total === 'number' && (
                <div className="mt-4 pt-4 border-t border-white/10">
                   <div className="flex justify-between text-xs mb-1.5 text-white/80">
                      <span>Used: {stat.used}</span>
                      <span className="text-[#EFFC76]">{percentage}%</span>
                   </div>
                   <div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden backdrop-blur-sm">
                      <div 
                        className="bg-[#EFFC76] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      />
                   </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
