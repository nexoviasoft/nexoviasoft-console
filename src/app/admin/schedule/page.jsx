"use client";

import React, { useMemo, useState } from "react";
import ScheduleHeader from "@/components/admin/schedule/ScheduleHeader";
import ScheduleGrid from "@/components/admin/schedule/ScheduleGrid";
import ScheduleMeetingDialog from "@/components/admin/schedule/ScheduleMeetingDialog";
import MeetingHistoryCard from "@/components/admin/schedule/MeetingHistoryCard";
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
import { Calendar as CalendarIcon, Clock, Search, History } from "lucide-react";
import { toast } from "sonner";
import { addDays, format, startOfWeek, subDays } from "date-fns";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";
import {
  useCreateScheduleMutation,
  useGetSchedulesQuery,
  useUpdateScheduleMutation,
} from "@/api/admin/schedule/scheduleApi";
import { useGetMeetingsQuery } from "@/api/admin/meeting/meetingApi";
import { useAuth } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function Schedule() {
  const { userRole } = useAuth();
  const [isAddShiftDialogOpen, setIsAddShiftDialogOpen] = useState(false);
  const [isScheduleMeetingDialogOpen, setIsScheduleMeetingDialogOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Meeting History State
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = addDays(startDate, 6);
  const weekStartDate = format(startDate, "yyyy-MM-dd");
  const weekEndDate = format(endDate, "yyyy-MM-dd");

  const { data: teamData, isLoading: isLoadingTeam } = useGetOurTeamQuery();
  const teamMembers = teamData?.data || teamData || [];

  const { data: schedulesData, isLoading: isLoadingSchedules } = useGetSchedulesQuery();
  const schedules = schedulesData?.data || schedulesData || [];
  const [createSchedule, { isLoading: isCreatingSchedule }] = useCreateScheduleMutation();
  const [updateSchedule, { isLoading: isUpdatingSchedule }] = useUpdateScheduleMutation();
  
  const { data: meetingsResp, isLoading: isLoadingMeetings } = useGetMeetingsQuery();
  const [newShift, setNewShift] = useState({
    teamId: "",
    day: "Mon",
    date: "",
    startTime: "",
    endTime: "",
    position: "",
    notes: ""
  });

  const handleInputChange = (field, value) => {
    setNewShift(prev => ({ ...prev, [field]: value }));
  };

  const scheduleRows = useMemo(() => {
    // Filter to current week if backend stored weekStartDate; otherwise show all schedules
    const normalized = schedules.filter((s) => {
      const ws = s?.weekStartDate ? format(new Date(s.weekStartDate), "yyyy-MM-dd") : null;
      return !ws || ws === weekStartDate;
    });

    return normalized.map((s) => ({
      id: s.id ?? s.teamId,
      teamId: s.teamId,
      name: s.team?.name || "Unknown",
      role: s.team?.role || "Team Member",
      avatar: s.team?.avatar || "/avatars/01.png",
      shifts: Array.isArray(s.shifts) ? s.shifts : [null, null, null, null, null, null, null],
    }));
  }, [schedules, weekStartDate]);

  const canAddShift = ["admin", "manager"].includes((userRole || "").toLowerCase());
  const canPublish = ["admin", "manager"].includes((userRole || "").toLowerCase());
  const canScheduleMeeting = ["admin", "manager"].includes((userRole || "").toLowerCase());

  const handleAddShift = async () => {
    // Validation
    if (!newShift.teamId || !newShift.date || !newShift.startTime || !newShift.endTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const teamIdNum = Number(newShift.teamId);
    if (Number.isNaN(teamIdNum)) {
      toast.error("Invalid employee selection");
      return;
    }

    const dayIndexMap = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
    const idx = dayIndexMap[newShift.day] ?? 0;

    const shift = {
      day: newShift.day,
      startTime: newShift.startTime,
      endTime: newShift.endTime,
      time: `${newShift.startTime} - ${newShift.endTime}`,
      label: newShift.position || "SHIFT",
      type: newShift.position === "night" ? "night" : (newShift.position || "morning"),
      notes: newShift.notes || undefined,
    };

    const existing = schedules.find((s) => {
      const ws = s?.weekStartDate ? format(new Date(s.weekStartDate), "yyyy-MM-dd") : null;
      return s?.teamId === teamIdNum && (!ws || ws === weekStartDate);
    });

    const nextShifts = Array.isArray(existing?.shifts)
      ? [...existing.shifts]
      : [null, null, null, null, null, null, null];
    while (nextShifts.length < 7) nextShifts.push(null);
    nextShifts[idx] = shift;

    try {
      if (existing?.id) {
        await updateSchedule({
          id: existing.id,
          teamId: teamIdNum,
          shifts: nextShifts,
          weekStartDate,
          weekEndDate,
        }).unwrap();
      } else {
        await createSchedule({
          teamId: teamIdNum,
          shifts: nextShifts,
          weekStartDate,
          weekEndDate,
        }).unwrap();
      }

      toast.success("Shift saved successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save shift");
      return;
    }
    
    // Reset form and close dialog
    setNewShift({
      teamId: "",
      day: "Mon",
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

  // Map meetings from API and hydrate attendees from teamMembers
  const meetings = useMemo(() => {
    const raw = meetingsResp?.data || meetingsResp || [];
    return raw.map((m) => {
      const attendeeIds = Array.isArray(m.attendeeIds) ? m.attendeeIds : [];
      const attendees = attendeeIds
        .map((id) => teamMembers.find((t) => t.id === id))
        .filter(Boolean)
        .map((t) => ({
          id: t.id,
          name: `${t.firstName || ""} ${t.lastName || ""}`.trim() || t.name || "Team Member",
          email: t.email,
          avatar: t.profileImage || t.avatar,
        }));

      return {
        id: m.id ?? m.meetingId,
        meetingId: m.meetingId,
        topic: m.topic,
        description: m.description,
        dateTime: m.dateTime,
        duration: m.durationMinutes,
        meetingLink: m.meetingLink,
        status: m.status || "upcoming",
        organizer: m.organizerName || "Organizer",
        attendees,
        createdAt: m.createdAt,
      };
    });
  }, [meetingsResp, teamMembers]);

  // Filter and search meetings
  const filteredMeetings = meetings.filter((meeting) => {
    // Filter by status
    const matchesStatus = filterStatus === "all" || meeting.status === filterStatus;
    
    // Filter by search query
    const matchesSearch = 
      searchQuery === "" ||
      meeting.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-8 py-8 flex flex-col text-white">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full space-y-6">
        <ScheduleHeader 
          startDate={startDate}
          endDate={endDate}
          onPrevWeek={() => setCurrentDate((d) => subDays(d, 7))}
          onNextWeek={() => setCurrentDate((d) => addDays(d, 7))}
          onAddShift={() => setIsAddShiftDialogOpen(true)} 
          showAddShift={canAddShift}
          showPublish={canPublish}
          showScheduleMeeting={canScheduleMeeting}
          onScheduleMeeting={() => setIsScheduleMeetingDialogOpen(true)}
        />
        <div className="flex-1 min-h-0">
          <ScheduleGrid rows={scheduleRows} />
        </div>

        {/* Meeting History Section */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <History className="w-6 h-6 text-[#EFFC76]" />
            <h2 className="text-xl md:text-2xl font-bold text-white">Meeting History</h2>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#EFFC76]/20 text-[#EFFC76] border border-[#EFFC76]/30">
              {filteredMeetings.length} {filteredMeetings.length === 1 ? "Meeting" : "Meetings"}
            </span>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-lg border border-white/15 bg-white/5 backdrop-blur-xl w-fit">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterStatus("all")}
                className={`text-sm ${
                  filterStatus === "all"
                    ? "bg-[#EFFC76] text-black hover:bg-[#e0ef5f] hover:text-black"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterStatus("upcoming")}
                className={`text-sm ${
                  filterStatus === "upcoming"
                    ? "bg-[#EFFC76] text-black hover:bg-[#e0ef5f] hover:text-black"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Upcoming
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterStatus("completed")}
                className={`text-sm ${
                  filterStatus === "completed"
                    ? "bg-[#EFFC76] text-black hover:bg-[#e0ef5f] hover:text-black"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Completed
              </Button>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                type="text"
                placeholder="Search meetings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
              />
            </div>
          </div>

          {/* Meeting Cards Grid */}
          {isLoadingMeetings ? (
            <div className="glass-panel rounded-2xl p-8 text-center text-white/70">
              Loading meetings...
            </div>
          ) : filteredMeetings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredMeetings.map((meeting) => (
                <MeetingHistoryCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <History className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white/70 mb-2">No meetings found</h3>
              <p className="text-sm text-white/50">
                {searchQuery
                  ? "Try adjusting your search query"
                  : filterStatus === "all"
                  ? "Schedule your first meeting to get started"
                  : `No ${filterStatus} meetings at the moment`}
              </p>
            </div>
          )}
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
              <Select value={newShift.teamId} onValueChange={(value) => handleInputChange('teamId', value)}>
                <SelectTrigger className="col-span-3 bg-black/40 border border-white/20 text-white">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingTeam ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    teamMembers.map((m) => (
                      <SelectItem key={m.id} value={String(m.id)}>
                        {`${m.firstName || ""} ${m.lastName || ""}`.trim() || m.name || "Team Member"}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Day */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shift-day" className="text-right text-white">
                Day <span className="text-red-500">*</span>
              </Label>
              <Select value={newShift.day} onValueChange={(value) => handleInputChange('day', value)}>
                <SelectTrigger className="col-span-3 bg-black/40 border border-white/20 text-white">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
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
                  <SelectItem value="DESIGN">Design</SelectItem>
                  <SelectItem value="PRODUCT">Product</SelectItem>
                  <SelectItem value="DEV">Dev</SelectItem>
                  <SelectItem value="MARKETING">Marketing</SelectItem>
                  <SelectItem value="CHECK-IN">Check-in</SelectItem>
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
              disabled={isCreatingSchedule || isUpdatingSchedule}
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {(isCreatingSchedule || isUpdatingSchedule) ? "Saving..." : "Add Shift"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Meeting Dialog */}
      <ScheduleMeetingDialog
        open={isScheduleMeetingDialogOpen}
        onOpenChange={setIsScheduleMeetingDialogOpen}
        onSubmit={handleScheduleMeeting}
        teamMembers={teamMembers}
      />
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
