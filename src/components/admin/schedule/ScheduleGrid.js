"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShiftCard from "./ShiftCard";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
          <TableHeader className="bg-white/5">
            <TableRow>
              <TableHead className="w-[250px] sticky left-0 z-20 bg-black/40 backdrop-blur-xl border-r border-white/10 text-white/80">
                Employee
              </TableHead>
              {days.map((day, i) => (
                <TableHead
                  key={i}
                  className="text-center min-w-[140px] border-l border-white/10 font-semibold text-white/70"
                >
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.map((emp) => (
              <TableRow key={emp.id} className="hover:bg-white/5 transition-colors">
                <TableCell className="sticky left-0 z-20 bg-black/40 backdrop-blur-xl border-r border-white/10 font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border border-white/20">
                      <AvatarImage src={emp.avatar} />
                      <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {emp.name}
                      </div>
                      <div className="text-xs text-white/60">{emp.role}</div>
                    </div>
                  </div>
                </TableCell>

                {emp.shifts.map((shift, i) => (
                  <TableCell
                    key={i}
                    className="p-2 border-l border-white/10 align-top h-[100px]"
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
