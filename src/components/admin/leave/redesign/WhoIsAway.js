"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useGetLeavesQuery } from "@/api/admin/leave/leaveApi";

export default function WhoIsAway() {
  const { data: leavesData, isLoading } = useGetLeavesQuery();

  // Filter approved leaves that are currently active (today is between startDate and endDate)
  const awayMembers = useMemo(() => {
    if (!leavesData) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return leavesData
      .filter((leave) => {
        if (leave.status !== 'approved') return false;
        
        const startDate = new Date(leave.startDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(leave.endDate);
        endDate.setHours(23, 59, 59, 999);

        return today >= startDate && today <= endDate;
      })
      .map((leave) => {
        const endDate = new Date(leave.endDate);
        endDate.setHours(23, 59, 59, 999);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const diffTime = endDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let returnDate = '';
        if (diffDays === 0) {
          returnDate = 'Today';
        } else if (diffDays === 1) {
          returnDate = 'Tomorrow';
        } else {
          returnDate = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }

        const getStatusColor = (type) => {
          if (type.toLowerCase().includes('sick')) {
            return 'text-red-300 bg-red-500/20 border-red-400/40';
          } else if (type.toLowerCase().includes('vacation') || type.toLowerCase().includes('earned')) {
            return 'text-[#EFFC76] bg-[#EFFC76]/15 border-[#EFFC76]/50';
          } else {
            return 'text-amber-200 bg-amber-500/20 border-amber-400/40';
          }
        };

        return {
          id: leave.id,
          name: `${leave.team?.firstName || ''} ${leave.team?.lastName || ''}`.trim() || 'Unknown',
          role: leave.team?.position || leave.team?.role || 'Employee',
          avatar: leave.team?.profileImage || `/avatars/0${(leave.id % 9) + 1}.png`,
          status: leave.type,
          returnDate: returnDate,
          color: getStatusColor(leave.type),
        };
      })
      .slice(0, 5); // Limit to 5 members
  }, [leavesData]);

  if (isLoading) {
    return (
      <Card className="border-none glass-card">
        <CardContent className="p-6">
          <div className="text-center text-white/60 text-sm">Loading...</div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="border-none glass-card">
      <CardHeader className="pb-3 border-b border-white/10">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#EFFC76]" />
              Who&apos;s Away
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-[#EFFC76]/15 text-[#EFFC76] border border-[#EFFC76]/50"
            >
              {awayMembers.length} Today
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="space-y-5">
          {awayMembers.map((member) => (
            <div key={member.id} className="flex items-start gap-3 group">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-white/20 group-hover:border-[#EFFC76]/60 transition-colors">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76]">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${member.status.toLowerCase().includes('sick') ? 'bg-red-400' : member.status.toLowerCase().includes('vacation') || member.status.toLowerCase().includes('earned') ? 'bg-blue-400' : 'bg-amber-400'}`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white truncate">{member.name}</p>
                    <span className="text-[10px] text-white/60 font-medium">Returns {member.returnDate}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-white/60 truncate max-w-[100px]">{member.role}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${member.color} font-medium`}>
                        {member.status}
                    </span>
                </div>
              </div>
            </div>
          ))}

          {awayMembers.length === 0 && (
              <div className="text-center py-6 text-white/60 text-sm">
                  Everyone is in the office today! 
              </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-xs text-white/60">
                <span>Upcoming Holiday</span>
                <span className="font-medium text-white">Republic Day (Jan 26)</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
