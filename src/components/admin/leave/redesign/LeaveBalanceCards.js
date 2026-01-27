"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Clock, AlertCircle, FileText } from "lucide-react";
import { useGetLeaveStatisticsQuery } from "@/api/admin/leave/leaveApi";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCurrentUserQuery } from "@/api/auth/authApi";

const iconMap = {
  'Casual Leave': Briefcase,
  'Sick Leave': AlertCircle,
  'Earned Leave': Clock,
  'Unpaid Leave': AlertCircle,
  'Personal': FileText,
  'Vacation': Briefcase,
};

export default function LeaveBalanceCards() {
  const { user, userRole } = useAuth();
  const { data: currentUserData } = useGetCurrentUserQuery();
  const teamId = currentUserData?.data?.user?.id || user?.id;
  const isAdmin = userRole === 'admin';
  
  // Admin sees all statistics, regular users see only their own
  const { data: statisticsData, isLoading } = useGetLeaveStatisticsQuery(isAdmin ? undefined : teamId);

  const stats = useMemo(() => {
    if (!statisticsData?.byType) return [];

    return statisticsData.byType.map((stat) => {
      const Icon = iconMap[stat.type] || Briefcase;
      
      return {
        title: stat.type,
        used: stat.used,
        total: stat.total,
        remaining: stat.remaining,
        icon: Icon,
        trend: stat.trend,
        pending: stat.pending,
        rejected: stat.rejected,
      };
    });
  }, [statisticsData]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="glass-card border-white/10">
            <CardContent className="p-4 md:p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-white/10 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="glass-card border-white/10">
          <CardContent className="p-4 md:p-6 text-center text-white/60">
            No leave data available
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const percentage =
          typeof stat.total === "number" && stat.total > 0
            ? Math.round((stat.used / stat.total) * 100)
            : 0;

        return (
          <Card
            key={index}
            className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300 glass-card border-white/10"
          >
            <CardContent className="relative p-4 md:p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-1.5 md:p-2 bg-[#EFFC76]/20 rounded-lg backdrop-blur-md">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#EFFC76]" />
                </div>
                <div className="flex items-center gap-1 text-[10px] md:text-xs font-medium bg-black/40 border border-white/20 px-2 py-1 rounded-full backdrop-blur-md text-white/80">
                  {stat.trend}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs md:text-sm font-medium text-white/80">
                  {stat.title}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#EFFC76]">
                  {typeof stat.total === "number" && stat.total > 0 ? (
                    <span>
                      {stat.remaining}
                      <span className="text-base md:text-lg text-white/70 font-normal ml-1">
                        / {stat.total}
                      </span>
                    </span>
                  ) : (
                    <span className="text-base md:text-lg text-white/70 font-normal">
                      {stat.used} days used
                    </span>
                  )}
                </h3>
              </div>

              {/* Progress Bar (if applicable) */}
              {typeof stat.total === "number" && stat.total > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs mb-1.5 text-white/80">
                    <span>Used: {stat.used}</span>
                    <span className="text-[#EFFC76]">{percentage}%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden backdrop-blur-sm">
                    <div
                      className="bg-[#EFFC76] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  {(stat.pending > 0 || stat.rejected > 0) && (
                    <div className="flex gap-2 mt-2 text-[10px] text-white/60">
                      {stat.pending > 0 && <span>Pending: {stat.pending}d</span>}
                      {stat.rejected > 0 && <span>Rejected: {stat.rejected}d</span>}
                    </div>
                  )}
                </div>
              )}
              {(!stat.total || stat.total === 0) && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Used: {stat.used} days</span>
                    {stat.pending > 0 && <span className="text-[#EFFC76]">Pending: {stat.pending}d</span>}
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
