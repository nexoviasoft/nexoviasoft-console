"use client";

import React, { useState } from "react";
import ScheduleHeader from "@/components/admin/schedule/ScheduleHeader";
import ScheduleGrid from "@/components/admin/schedule/ScheduleGrid";
import ScheduleMeetingDialog from "@/components/admin/schedule/ScheduleMeetingDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Schedule() {
  const [isAddShiftDialogOpen, setIsAddShiftDialogOpen] = useState(false);
  const [isScheduleMeetingDialogOpen, setIsScheduleMeetingDialogOpen] = useState(false);
  const [newShift, setNewShift] = useState({
    employee: "",
    date: "",
    startTime: "",
    endTime: "",
    position: "",
    notes: ""
  });

  const handleInputChange = (field, value) => {
    setNewShift(prev => ({ ...prev, [field]: value }));
  };

  const handleAddShift = () => {
    // Validation
    if (!newShift.employee || !newShift.date || !newShift.startTime || !newShift.endTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In real app, this would make an API call
    console.log("Adding shift:", newShift);
    toast.success("Shift added successfully!");
    
    // Reset form and close dialog
    setNewShift({
      employee: "",
      date: "",
      startTime: "",
      endTime: "",
      position: "",
      notes: ""
    });
    setIsAddShiftDialogOpen(false);
  };

  const handleScheduleMeeting = async (meetingData) => {
    // In real app, this would make API calls to:
    // 1. POST /api/meetings/create - Save meeting to database
    // 2. POST /api/meetings/notify - Send email notifications
    
    console.log("Meeting scheduled:", meetingData);
    
    // Mock API call for email notifications
    // In production, replace with actual API call:
    /*
    try {
      const response = await fetch('/api/meetings/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId: meetingData.meetingId,
          topic: meetingData.topic,
          description: meetingData.description,
          dateTime: meetingData.dateTime,
          duration: meetingData.duration,
          meetingLink: meetingData.meetingLink,
          attendees: meetingData.attendees.map(a => a.email),
          organizer: 'current-user@squadlog.com' // Get from auth context
        })
      });
      
      if (!response.ok) throw new Error('Failed to send notifications');
    } catch (error) {
      console.error('Error sending meeting notifications:', error);
      toast.error('Failed to send email notifications');
    }
    */
  };

  return (
    <div className="px-8 py-8 flex flex-col text-white">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full space-y-6">
        <ScheduleHeader 
          onAddShift={() => setIsAddShiftDialogOpen(true)} 
          onScheduleMeeting={() => setIsScheduleMeetingDialogOpen(true)}
        />
        <div className="flex-1 min-h-0">
          <ScheduleGrid />
        </div>
      </div>

      {/* Add Shift Dialog */}
      <Dialog open={isAddShiftDialogOpen} onOpenChange={setIsAddShiftDialogOpen}>
        <DialogContent className="max-w-lg glass-card border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <CalendarIcon className="w-5 h-5 text-[#EFFC76]" />
              Add New Shift
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Schedule a new shift for an employee. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Employee */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-employee" className="text-right text-white">
                Employee <span className="text-red-500">*</span>
              </Label>
              <Select value={newShift.employee} onValueChange={(value) => handleInputChange('employee', value)}>
                <SelectTrigger className="col-span-3 bg-black/40 border border-white/20 text-white">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dipa">Dipa Inhouse</SelectItem>
                  <SelectItem value="jane">Jane Cooper</SelectItem>
                  <SelectItem value="floyd">Floyd Miles</SelectItem>
                  <SelectItem value="theresa">Theresa Webb</SelectItem>
                  <SelectItem value="robert">Robert Fox</SelectItem>
                  <SelectItem value="cody">Cody Fisher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-date" className="text-right text-white">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="shift-date"
                type="date"
                value={newShift.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="col-span-3 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
              />
            </div>

            {/* Start Time */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-start" className="text-right text-white">
                Start Time <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3 relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <Input
                  id="shift-start"
                  type="time"
                  value={newShift.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="pl-10 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                />
              </div>
            </div>

            {/* End Time */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-end" className="text-right text-white">
                End Time <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3 relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <Input
                  id="shift-end"
                  type="time"
                  value={newShift.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="pl-10 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                />
              </div>
            </div>

            {/* Position */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-position" className="text-right text-white">Position</Label>
              <Select value={newShift.position} onValueChange={(value) => handleInputChange('position', value)}>
                <SelectTrigger className="col-span-3 bg-black/40 border border-white/20 text-white">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning Shift</SelectItem>
                  <SelectItem value="afternoon">Afternoon Shift</SelectItem>
                  <SelectItem value="evening">Evening Shift</SelectItem>
                  <SelectItem value="night">Night Shift</SelectItem>
                  <SelectItem value="full-day">Full Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="shift-notes" className="text-right pt-2 text-white">Notes</Label>
              <Input
                id="shift-notes"
                value={newShift.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional notes..."
                className="col-span-3 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
              />
            </div>
          </div>

          <DialogFooter className="border-t border-white/10 pt-4 mt-2">
            <Button
              variant="outline"
              onClick={() => setIsAddShiftDialogOpen(false)}
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddShift}
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Add Shift
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Meeting Dialog */}
      <ScheduleMeetingDialog
        open={isScheduleMeetingDialogOpen}
        onOpenChange={setIsScheduleMeetingDialogOpen}
        onSubmit={handleScheduleMeeting}
      />
    </div>
  );
}
