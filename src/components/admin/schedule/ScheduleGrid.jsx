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

function normalizeShift(shift) {
  if (!shift) return null;
  if (shift.time) return shift;
  if (shift.startTime && shift.endTime) {
    return { ...shift, time: `${shift.startTime} - ${shift.endTime}` };
  }
  return shift;
}

export default function ScheduleGrid({ rows = [] }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="overflow-auto scrollbar-thin scrollbar-glass">
        <Table className="min-w-[1200px]">
          <TableHeader className="bg-gradient-to-r from-black/60 via-black/40 to-black/60 backdrop-blur-xl border-b border-white/10">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[250px] sticky left-0 z-20 bg-gradient-to-r from-black/80 via-black/70 to-transparent backdrop-blur-xl border-r border-white/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#F58220]" />
                  <span className="text-white/90 font-bold text-sm">Employee</span>
                </div>
              </TableHead>
              {days.map((day, i) => {
                const DayIcon = day.icon;
                return (
                  <TableHead
                    key={i}
                    className="text-center min-w-[140px] border-l border-white/5 group"
                  >
                    <div className="flex flex-col items-center gap-1 py-1.5">
                      <DayIcon className="w-3.5 h-3.5 text-[#F58220]/70 group-hover:text-[#F58220] transition-colors duration-300" />
                      <span className="font-bold text-xs text-white/80 group-hover:text-white transition-colors duration-300">
                        {day.name}
                      </span>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((emp) => (
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
                  <div className="flex items-center gap-3 py-0.5">
                    <div className="relative">
                      <Avatar className="w-9 h-9 border-2 border-white/20 group-hover:border-[#F58220]/40 transition-all duration-300 ring-2 ring-white/5">
                        <AvatarImage src={emp.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-[#F58220]/20 to-[#F58220]/10 text-[#F58220] font-bold text-xs">
                          {emp.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-black" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm group-hover:text-[#F58220] transition-colors duration-300">
                        {emp.name}
                      </div>
                      <div className="text-[11px] text-white/50 group-hover:text-white/70 transition-colors duration-300">
                        {emp.role}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {emp.shifts.map((shift, i) => (
                  <TableCell
                    key={i}
                    className="p-2.5 border-l border-white/5 align-top h-[90px] group-hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <ShiftCard shift={normalizeShift(shift)} />
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
