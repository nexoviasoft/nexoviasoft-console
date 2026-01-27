"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle, FileText } from "lucide-react";
import { useGetLeaveStatisticsQuery } from "@/api/admin/leave/leaveApi";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCurrentUserQuery } from "@/api/auth/authApi";

export default function LeaveStatusSummary() {
  const { user, userRole } = useAuth();
  const { data: currentUserData } = useGetCurrentUserQuery();
  const teamId = currentUserData?.data?.user?.id || user?.id;
  const isAdmin = userRole === 'admin';
  
  // Admin sees all statistics, regular users see only their own
  const { data: statisticsData, isLoading } = useGetLeaveStatisticsQuery(isAdmin ? undefined : teamId);

  if (isLoading) {
    return (
      <Card className="border-none glass-card">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
            <div className="flex gap-4">
              <div className="h-8 bg-white/10 rounded w-24"></div>
              <div className="h-8 bg-white/10 rounded w-24"></div>
              <div className="h-8 bg-white/10 rounded w-24"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusCounts = statisticsData?.statusCounts || {
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  };

  const statusItems = [
    {
      label: "Pending",
      count: statusCounts.pending,
      icon: Clock,
      color: "text-[#EFFC76] bg-[#EFFC76]/15 border-[#EFFC76]/50",
    },
    {
      label: "Approved",
      count: statusCounts.approved,
      icon: CheckCircle2,
      color: "text-emerald-300 bg-emerald-500/15 border-emerald-400/50",
    },
    {
      label: "Rejected",
      count: statusCounts.rejected,
      icon: XCircle,
      color: "text-rose-300 bg-rose-500/15 border-rose-400/50",
    },
    {
      label: "Total",
      count: statusCounts.total,
      icon: FileText,
      color: "text-white/80 bg-white/10 border-white/20",
    },
  ];

  return (
    <Card className="border-none glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#EFFC76]" />
          {isAdmin ? 'All Leave Status Summary' : 'My Leave Status Summary'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statusItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg bg-black/20 border border-white/10 hover:border-[#EFFC76]/30 transition-colors"
              >
                <div className={`p-2 rounded-lg mb-2 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {item.count}
                </div>
                <div className="text-xs text-white/60">{item.label}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
