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
import { useCreateLeaveMutation } from "@/api/admin/leave/leaveApi";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCurrentUserQuery } from "@/api/auth/authApi";

export default function ApplyLeaveModal() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [createLeave, { isLoading }] = useCreateLeaveMutation();
  const { user } = useAuth();
  const { data: currentUserData } = useGetCurrentUserQuery();

  // Get teamId from current user
  const teamId = currentUserData?.data?.user?.id || user?.id;

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const diffTime = Math.abs(endTime - startTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!teamId) {
      toast.error("Unable to identify your account. Please log in again.");
      return;
    }

    if (!leaveType) {
      toast.error("Please select a leave type");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }

    if (!reason.trim()) {
      toast.error("Please provide a reason for your leave");
      return;
    }

    if (reason.trim().length < 10) {
      toast.error("Please provide a more detailed reason (at least 10 characters)");
      return;
    }

    const days = calculateDays(startDate, endDate);

    try {
      await createLeave({
        teamId: teamId,
        type: leaveType,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days: days,
        reason: reason.trim(),
      }).unwrap();

      toast.success("Leave application submitted successfully!");
      // Reset form
      setStartDate(undefined);
      setEndDate(undefined);
      setLeaveType("");
      setReason("");
      setOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit leave request. Please try again.");
    }
  };

  const handleDialogChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form when dialog closes
      setStartDate(undefined);
      setEndDate(undefined);
      setLeaveType("");
      setReason("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button">
            <Plus className="w-4 h-4 mr-2" />
            Apply for Leave
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-2.5rem)] mx-auto max-w-[500px] glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Apply for Leave</DialogTitle>
          <DialogDescription className="text-white/70">
            Submit your leave request. Your manager will be notified.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-white/80 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#EFFC76]" />
                      Leave Type
                    </Label>
                    <Select value={leaveType} onValueChange={setLeaveType} required>
                        <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#EFFC76]">
                        <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-[#EFFC76]/20 bg-black/90 text-white">
                        <SelectItem value="Casual Leave" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Casual Leave</SelectItem>
                        <SelectItem value="Sick Leave" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Sick Leave</SelectItem>
                        <SelectItem value="Earned Leave" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Earned Leave</SelectItem>
                        <SelectItem value="Unpaid Leave" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Unpaid Leave</SelectItem>
                        <SelectItem value="Personal" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Personal</SelectItem>
                        <SelectItem value="Vacation" className="focus:bg-[#EFFC76]/20 focus:text-[#EFFC76] cursor-pointer">Vacation</SelectItem>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#EFFC76]" />
                  Start Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal glass-button border-white/30 text-white",
                        !startDate && "text-white/60"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span className="text-white/60">Pick start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#EFFC76]" />
                  End Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal glass-button border-white/30 text-white",
                        !endDate && "text-white/60"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span className="text-white/60">Pick end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => date < (startDate || new Date(new Date().setHours(0, 0, 0, 0)))}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {startDate && endDate && (
              <div className="text-sm text-[#EFFC76]">
                Duration: {calculateDays(startDate, endDate)} {calculateDays(startDate, endDate) === 1 ? 'day' : 'days'}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-white/80 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#EFFC76]" />
                Reason <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="reason"
                name="reason"
                placeholder="Please describe the reason for your leave (e.g., Medical appointment, Family event, Personal matter)..."
                className={`min-h-[100px] bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] ${
                  reason.trim() ? 'border-[#EFFC76]/50' : ''
                }`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                minLength={10}
              />
              {reason && reason.trim().length < 10 && (
                <p className="text-xs text-amber-400">Please provide a more detailed reason (at least 10 characters)</p>
              )}
              {!reason.trim() && (
                <p className="text-xs text-red-400">This field is required. Please provide a reason for your leave.</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogChange(false)}
              className="glass-button border-white/30 bg-white/5 text-white hover:bg-[#EFFC76]/20 hover:text-[#EFFC76] hover:border-[#EFFC76]/30"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
              disabled={isLoading || !teamId}
            >
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
