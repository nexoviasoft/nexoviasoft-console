"use client";

import React, { useState } from "react";
import ScheduleHeader from "@/components/admin/schedule/ScheduleHeader";
import ScheduleGrid from "@/components/admin/schedule/ScheduleGrid";
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

  return (
    <div className="px-8 py-8 flex flex-col text-white">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full space-y-6">
        <ScheduleHeader onAddShift={() => setIsAddShiftDialogOpen(true)} />
        <div className="flex-1 min-h-0">
          <ScheduleGrid />
        </div>
      </div>

      {/* Add Shift Dialog */}
      <Dialog open={isAddShiftDialogOpen} onOpenChange={setIsAddShiftDialogOpen}>
        <DialogContent className="max-w-lg glass-panel">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-purple-600" />
              Add New Shift
            </DialogTitle>
            <DialogDescription>
              Schedule a new shift for an employee. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Employee */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-employee" className="text-right">
                Employee <span className="text-red-500">*</span>
              </Label>
              <Select value={newShift.employee} onValueChange={(value) => handleInputChange('employee', value)}>
                <SelectTrigger className="col-span-3">
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
              <Label htmlFor="shift-date" className="text-right">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="shift-date"
                type="date"
                value={newShift.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Start Time */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-start" className="text-right">
                Start Time <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3 relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="shift-start"
                  type="time"
                  value={newShift.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* End Time */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-end" className="text-right">
                End Time <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3 relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="shift-end"
                  type="time"
                  value={newShift.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Position */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-position" className="text-right">Position</Label>
              <Select value={newShift.position} onValueChange={(value) => handleInputChange('position', value)}>
                <SelectTrigger className="col-span-3">
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
              <Label htmlFor="shift-notes" className="text-right pt-2">Notes</Label>
              <Input
                id="shift-notes"
                value={newShift.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional notes..."
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddShiftDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddShift} className="bg-purple-600 hover:bg-purple-700">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Add Shift
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
