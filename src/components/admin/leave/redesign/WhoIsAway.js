"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const awayMembers = [
  {
    name: "Alex Johnson",
    role: "Visual Designer",
    avatar: "/avatars/06.png",
    status: "Sick Leave",
    returnDate: "Tomorrow",
    color: "text-red-300 bg-red-500/20 border-red-400/40"
  },
  {
    name: "Maria Garcia",
    role: "Project Manager",
    avatar: "/avatars/07.png",
    status: "Vacation",
    returnDate: "Jan 25",
    color: "text-[#EFFC76] bg-[#EFFC76]/15 border-[#EFFC76]/50"
  },
  {
    name: "James Wilson",
    role: "DevOps Engineer",
    avatar: "/avatars/08.png",
    status: "Half Day",
    returnDate: "1:00 PM",
    color: "text-amber-200 bg-amber-500/20 border-amber-400/40"
  }
];

export default function WhoIsAway() {
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
          {awayMembers.map((member, i) => (
            <div key={i} className="flex items-start gap-3 group">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-white/20 group-hover:border-[#EFFC76]/60 transition-colors">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76]">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${member.status === 'Sick Leave' ? 'bg-red-400' : member.status === 'Vacation' ? 'bg-blue-400' : 'bg-amber-400'}`}></div>
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
