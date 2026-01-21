"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const awayMembers = [
  {
    name: "Alex Johnson",
    role: "Visual Designer",
    avatar: "/avatars/06.png",
    status: "Sick Leave",
    returnDate: "Tomorrow",
    color: "text-red-600 bg-red-50 border-red-100"
  },
  {
    name: "Maria Garcia",
    role: "Project Manager",
    avatar: "/avatars/07.png",
    status: "Vacation",
    returnDate: "Jan 25",
    color: "text-blue-600 bg-blue-50 border-blue-100"
  },
  {
    name: "James Wilson",
    role: "DevOps Engineer",
    avatar: "/avatars/08.png",
    status: "Half Day",
    returnDate: "1:00 PM",
    color: "text-amber-600 bg-amber-50 border-amber-100"
  }
];

export default function WhoIsAway() {
  return (
    <Card className="border-none shadow-md bg-gradient-to-b from-white to-gray-50/50">
      <CardHeader className="pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Who's Away</CardTitle>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">{awayMembers.length} Today</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="space-y-5">
          {awayMembers.map((member, i) => (
            <div key={i} className="flex items-start gap-3 group">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-gray-100 group-hover:border-purple-200 transition-colors">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${member.status === 'Sick Leave' ? 'bg-red-400' : member.status === 'Vacation' ? 'bg-blue-400' : 'bg-amber-400'}`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900 truncate">{member.name}</p>
                    <span className="text-[10px] text-gray-400 font-medium">Returns {member.returnDate}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500 truncate max-w-[100px]">{member.role}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${member.color} font-medium`}>
                        {member.status}
                    </span>
                </div>
              </div>
            </div>
          ))}

          {awayMembers.length === 0 && (
              <div className="text-center py-6 text-gray-500 text-sm">
                  Everyone is in the office today! 
              </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Upcoming Holiday</span>
                <span className="font-medium text-gray-700">Republic Day (Jan 26)</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
