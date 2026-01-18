"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User, Save } from "lucide-react";

export default function AttendanceEditDialog({ open, onOpenChange, employee, onSave }) {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    status: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        checkIn: employee.checkIn,
        checkOut: employee.checkOut,
        status: employee.status,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  const handleSave = () => {
    onSave({ ...employee, ...formData });
    onOpenChange(false);
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-[#0F0F0F]/95 backdrop-blur-2xl border border-white/10 text-white p-0 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden gap-0 ring-0 outline-none rounded-2xl">
        
        {/* Header Section */}
        <div className="p-6 pb-4 relative">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border border-white/10 shadow-lg">
              <AvatarImage src={employee.avatar} />
              <AvatarFallback className="text-lg bg-[#1F1F1F] text-white/80">
                {employee.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <DialogTitle className="text-lg font-bold text-white tracking-tight">
                Edit Record
              </DialogTitle>
              <div className="flex items-center gap-1.5 text-white/50 text-[11px] uppercase tracking-wider font-medium">
                <User className="w-3 h-3" />
                {employee.name}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Form Content */}
        <div className="p-6 space-y-5">
           <div className="grid grid-cols-2 gap-4">
            {/* Check In */}
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold pl-1">
                Check In
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 w-4 h-4 text-[#EFFC76]" />
                <Input 
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="pl-9 bg-white/5 border-white/10 text-white focus-visible:ring-[#EFFC76] focus-visible:border-[#EFFC76]/50"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold pl-1">
                Check Out
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 w-4 h-4 text-white/40" />
                <Input 
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="pl-9 bg-white/5 border-white/10 text-white focus-visible:ring-[#EFFC76] focus-visible:border-[#EFFC76]/50"
                />
              </div>
            </div>
           </div>

           {/* Status */}
           <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold pl-1">
                Status
              </label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-[#EFFC76] focus:border-[#EFFC76]/50">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                  <SelectItem value="On Time">On Time</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
           </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white/[0.03] p-4 border-t border-white/5 flex items-center justify-end gap-3">
           <Button 
             variant="ghost" 
             onClick={() => onOpenChange(false)}
             className="text-white/60 hover:text-white hover:bg-white/5"
           >
             Cancel
           </Button>
           <Button 
             onClick={handleSave}
             className="bg-[#EFFC76] text-black hover:bg-[#dce865]"
           >
             <Save className="w-4 h-4 mr-2" />
             Save Changes
           </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
