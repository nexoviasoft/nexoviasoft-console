"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

export default function AttendanceDetailsDialog({ open, onOpenChange, employee }) {
  if (!employee) return null;

  const StatusBadge = ({ status }) => {
    const styles = {
      "On Time": "bg-emerald-500/20 text-emerald-300 border border-emerald-400/20",
      Late: "bg-orange-500/20 text-orange-300 border border-orange-400/20",
      Absent: "bg-red-500/20 text-red-300 border border-red-400/20",
    };
    return (
      <Badge className={`${styles[status] || "bg-white/10 text-white"} h-6 px-3 text-xs font-semibold shadow-none rounded-full`}>
        {status}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-[#0F0F0F]/95 backdrop-blur-2xl border border-white/10 text-white p-0 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden gap-0 ring-0 outline-none rounded-2xl">
        
        {/* Header Section */}
        <div className="p-6 pb-4 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border border-white/10 shadow-lg">
                <AvatarImage src={employee.avatar} />
                <AvatarFallback className="text-lg bg-[#1F1F1F] text-white/80">
                  {employee.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <DialogTitle className="text-lg font-bold text-white tracking-tight">
                  {employee.name}
                </DialogTitle>
                <div className="flex items-center gap-1.5 text-white/50 text-[11px] uppercase tracking-wider font-medium">
                  <User className="w-3 h-3" />
                  {employee.role}
                </div>
              </div>
            </div>
            <StatusBadge status={employee.status} />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Main Content: Timings */}
        <div className="px-8 py-8">
           <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                 <div className="w-1 h-1 rounded-full bg-[#EFFC76]" />
                 <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                    Check In
                 </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#EFFC76]" />
                <span className="text-2xl font-bold text-white tracking-tight tabular-nums">
                  {employee.checkIn}
                </span>
              </div>
            </div>
             <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                 <div className="w-1 h-1 rounded-full bg-white/20" />
                 <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                    Check Out
                 </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/30" />
                <span className="text-2xl font-bold text-white tracking-tight tabular-nums">
                  {employee.checkOut}
                </span>
              </div>
            </div>
           </div>
        </div>

        {/* Footer: Stats Summary */}
        <div className="bg-white/[0.03] p-6 border-t border-white/5">
           <div className="space-y-3">
             <div className="flex items-center justify-between">
                <div className="text-sm text-white/60 font-medium">Total Work Hours</div>
                <div className="text-white font-mono font-bold tracking-tight text-base">{employee.workHours}</div>
             </div>
             <div className="flex items-center justify-between">
                <div className="text-sm text-white/60 font-medium">Date</div>
                <div className="text-white/90 font-medium flex items-center gap-2 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-[#EFFC76]" />
                    Today, Jan 18
                </div>
             </div>
           </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
