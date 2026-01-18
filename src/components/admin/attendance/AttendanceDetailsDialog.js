"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

export default function AttendanceDetailsDialog({ open, onOpenChange, employee }) {
  if (!employee) return null;

  const StatusBadge = ({ status }) => {
    const styles = {
      "On Time": "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40",
      Late: "bg-orange-500/20 text-orange-300 border border-orange-400/40",
      Absent: "bg-red-500/20 text-red-300 border border-red-400/40",
    };
    return (
      <Badge className={`${styles[status] || "bg-white/10 text-white"} font-medium shadow-none`}>
        {status}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-card border-white/20 text-white p-0 overflow-hidden gap-0">
        <DialogHeader className="p-6 bg-white/5 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-white/20">
                <AvatarImage src={employee.avatar} />
                <AvatarFallback className="text-xl bg-white/10 text-white">
                  {employee.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl font-bold text-white mb-1">
                  {employee.name}
                </DialogTitle>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <User className="w-4 h-4" />
                  {employee.role}
                </div>
              </div>
            </div>
            <StatusBadge status={employee.status} />
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-white/50 uppercase tracking-wider font-medium">
                Check In
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <Clock className="w-5 h-5 text-[#EFFC76]" />
                {employee.checkIn}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/50 uppercase tracking-wider font-medium">
                Check Out
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <Clock className="w-5 h-5 text-white/40" />
                {employee.checkOut}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
             <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">Total Work Hours</div>
                <div className="text-white font-mono font-medium">{employee.workHours}</div>
             </div>
             <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">Date</div>
                <div className="text-white font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#EFFC76]" />
                    Today, Jan 18
                </div>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
