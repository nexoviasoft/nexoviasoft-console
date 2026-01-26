"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Sun, Cloud, CloudRain, Zap, Coffee, Moon, Star } from "lucide-react";
import ShiftCard from "./ShiftCard";


const days = [
  { name: "Mon", icon: Coffee },
  { name: "Tue", icon: Zap },
  { name: "Wed", icon: Sun },
  { name: "Thu", icon: Cloud },
  { name: "Fri", icon: Star },
  { name: "Sat", icon: CloudRain },
  { name: "Sun", icon: Moon },
];

// Mock data: Employee -> Array of 7 shifts (or nulls)
const scheduleData = [
  {
    id: 1,
    name: "Dipa Inhouse",
    role: "Visual Designer",
    avatar: "/avatars/01.png",
    shifts: [
       { time: "09:00 - 17:00", label: "Design", type: "morning" },
       { time: "09:00 - 17:00", label: "Design", type: "morning" },
       { time: "09:00 - 17:00", label: "Design", type: "morning" },
       { time: "09:00 - 17:00", label: "Design", type: "morning" },
       { time: "09:00 - 17:00", label: "Design", type: "morning" },
       null, // Sat
       null, // Sun
    ]
  },
  {
    id: 2,
    name: "Jane Cooper",
    role: "Product Manager",
    avatar: "/avatars/02.png",
    shifts: [
       { time: "10:00 - 18:00", label: "Product", type: "afternoon" },
       { time: "10:00 - 18:00", label: "Product", type: "afternoon" },
       null, 
       { time: "10:00 - 18:00", label: "Product", type: "afternoon" },
       { time: "10:00 - 18:00", label: "Product", type: "afternoon" },
       { time: "11:00 - 15:00", label: "Check-in", type: "morning" }, 
       null, 
    ]
  },
  {
    id: 3,
    name: "Floyd Miles",
    role: "Frontend Dev",
    avatar: "/avatars/03.png",
    shifts: [
       null,
       { time: "09:00 - 17:00", label: "Dev", type: "morning" },
       { time: "09:00 - 17:00", label: "Dev", type: "morning" },
       { time: "09:00 - 17:00", label: "Dev", type: "morning" },
       { time: "09:00 - 17:00", label: "Dev", type: "morning" },
       null,
       { time: "12:00 - 20:00", label: "Deploy", type: "night" },
    ]
  },
  {
    id: 4,
    name: "Theresa Webb",
    role: "Marketing",
    avatar: "/avatars/04.png",
    shifts: [
       { time: "09:00 - 17:00", label: "Marketing", type: "morning" },
       { time: "09:00 - 17:00", label: "Marketing", type: "morning" },
       { time: "09:00 - 17:00", label: "Marketing", type: "morning" },
       { time: "09:00 - 17:00", label: "Marketing", type: "morning" },
       { time: "09:00 - 17:00", label: "Marketing", type: "morning" },
       null,
       null,
    ]
  },
];

export default function ScheduleGrid() {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="overflow-auto scrollbar-thin scrollbar-glass">
        <Table className="min-w-[1200px]">
          <TableHeader className="bg-gradient-to-r from-black/60 via-black/40 to-black/60 backdrop-blur-xl border-b border-white/10">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[280px] sticky left-0 z-20 bg-gradient-to-r from-black/80 via-black/70 to-transparent backdrop-blur-xl border-r border-white/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#EFFC76]" />
                  <span className="text-white/90 font-bold text-sm">Employee</span>
                </div>
              </TableHead>
              {days.map((day, i) => {
                const DayIcon = day.icon;
                return (
                  <TableHead
                    key={i}
                    className="text-center min-w-[160px] border-l border-white/5 group"
                  >
                    <div className="flex flex-col items-center gap-1.5 py-2">
                      <DayIcon className="w-4 h-4 text-[#EFFC76]/70 group-hover:text-[#EFFC76] transition-colors duration-300" />
                      <span className="font-bold text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                        {day.name}
                      </span>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.map((emp) => (
              <TableRow 
                key={emp.id} 
                className="
                  hover:bg-white/5 
                  transition-all duration-300 
                  border-b border-white/5
                  group
                "
              >
                <TableCell className="
                  sticky left-0 z-20 
                  bg-gradient-to-r from-black/80 via-black/70 to-transparent 
                  backdrop-blur-xl 
                  border-r border-white/10 
                  group-hover:from-black/90 group-hover:via-black/80
                  transition-all duration-300
                ">
                  <div className="flex items-center gap-3.5 py-1">
                    <div className="relative">
                      <Avatar className="w-11 h-11 border-2 border-white/20 group-hover:border-[#EFFC76]/40 transition-all duration-300 ring-2 ring-white/5">
                        <AvatarImage src={emp.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-[#EFFC76]/20 to-[#EFFC76]/10 text-[#EFFC76] font-bold">
                          {emp.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm group-hover:text-[#EFFC76] transition-colors duration-300">
                        {emp.name}
                      </div>
                      <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors duration-300">
                        {emp.role}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {emp.shifts.map((shift, i) => (
                  <TableCell
                    key={i}
                    className="p-3 border-l border-white/5 align-top h-[120px] group-hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <ShiftCard shift={shift} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
