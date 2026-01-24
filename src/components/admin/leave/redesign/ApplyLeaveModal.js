"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Clock, FileText, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ApplyLeaveModal() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Leave application submitted successfully!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button">
            <Plus className="w-4 h-4 mr-2" />
            Apply for Leave
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[500px] glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Apply for Leave</DialogTitle>
          <DialogDescription className="text-white/70">
            Submit your leave request. Your manager will be notified.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-white/80 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#EFFC76]" />
                      Leave Type
                    </Label>
                    <Select required>
                        <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#EFFC76]">
                        <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-[#EFFC76]/20 bg-black/90 text-white">
                        <SelectItem value="casual" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Casual Leave</SelectItem>
                        <SelectItem value="sick" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Sick Leave</SelectItem>
                        <SelectItem value="earned" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Earned Leave</SelectItem>
                        <SelectItem value="unpaid" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Unpaid Leave</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-white/80 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#EFFC76]" />
                      Duration
                    </Label>
                    <Select defaultValue="full">
                        <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#EFFC76]">
                        <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-[#EFFC76]/20 bg-black/90 text-white">
                        <SelectItem value="full" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Full Day</SelectItem>
                        <SelectItem value="first_half" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">First Half</SelectItem>
                        <SelectItem value="second_half" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Second Half</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
              </div>

            <div className="space-y-2">
              <Label className="text-white/80 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#EFFC76]" />
                Date Range
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal glass-button border-white/30 text-black",
                      !date && "text-white/60"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-black" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span className="text-white/60">Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-white/80 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#EFFC76]" />
                Reason
              </Label>
              <Textarea
                id="reason"
                placeholder="Please describe the reason for your leave..."
                className="min-h-[100px] bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="glass-button border-white/30 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
            >
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
