"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const members = [
  {
    name: "Alena Gouse",
    role: "UI Designer - UID2",
    avatar: "/avatars/alena.jpg",
    status: [
      { type: "present", value: "ok" }, // Blue border
      { type: "leave", value: "half" }, // Yellow
      { type: "present", value: "ok" },
    ],
    // Detailed status for visual representation (mocking the dots)
    week1: ["present", "present", "meeting", "present", "present"],
    week2: ["present", "leave-half", "present", "present", "absent"],
    week3: ["present", "present", "present", "present", "present"],
    week4: ["present", "present", "present", "present", "present"],
    week5: ["present", "present", "present", "present", "present"],
  },
  {
    name: "Miracle Vetrovs",
    role: "UX Designer - UXD3",
    avatar: "/avatars/miracle.jpg",
    week1: ["present", "present", "present", "present", "present"],
    week2: ["present", "present", "present", "leave-full", "present"],
    week3: ["present", "present", "meeting", "present", "present"],
    week4: ["present", "present", "present", "present", "present"], 
    week5: ["present", "present", "leave-full", "leave-full", "present"],
  }
];

const StatusDot = ({ type }) => {
  let className = "w-2.5 h-2.5 rounded-full ";
  
  switch(type) {
    case 'present':
      className += "border border-blue-500 bg-white";
      break;
    case 'meeting':
      className += "border border-blue-500 bg-blue-500";
      break;
    case 'leave-half':
      className += "border border-yellow-400 bg-yellow-400"; // yellow
      break;
    case 'leave-full':
      className += "border border-red-500 bg-red-500"; // red
      break;
    case 'absent':
      className += "border border-gray-300 bg-gray-300";
      break;
    default:
      className += "border border-gray-200 bg-white";
  }

  return <div className={className}></div>;
};

export default function TeamList() {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">My Teams</h3>
            <p className="text-sm text-white/60">From 1-30 Sep, 2023</p>
          </div>
          <Select defaultValue="month">
            <SelectTrigger className="w-[140px] bg-black/40 border border-white/20 text-white">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {members.map((member, index) => (
            <div key={index} className="flex items-center py-2">
              <div className="flex items-center gap-3 w-48 shrink-0">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76]">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-white">{member.name}</div>
                  <div className="text-xs text-white/60">{member.role}</div>
                </div>
              </div>
              
              {/* Status Grid */}
              <div className="flex-1 flex justify-between gap-4 overflow-x-auto">
                <div className="flex gap-1.5">{member.week1.map((s, i) => <StatusDot key={i} type={s} />)}</div>
                <div className="flex gap-1.5">{member.week2.map((s, i) => <StatusDot key={i} type={s} />)}</div>
                <div className="flex gap-1.5">{member.week3.map((s, i) => <StatusDot key={i} type={s} />)}</div>
                <div className="flex gap-1.5">{member.week4.map((s, i) => <StatusDot key={i} type={s} />)}</div>
                <div className="flex gap-1.5">{member.week5.map((s, i) => <StatusDot key={i} type={s} />)}</div>
              </div>
            </div>
          ))}
          {/* Add separator if needed */}
        </div>
      </CardContent>
    </Card>
  );
}
