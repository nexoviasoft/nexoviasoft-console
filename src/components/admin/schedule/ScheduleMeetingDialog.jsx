"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, Copy, Check, Clock, Users, Calendar as CalendarIcon, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/generateMeetingLink";
import EmailTemplateEditor from "./EmailTemplateEditor";
import { useCreateMeetingMutation } from "@/api/admin/meeting/meetingApi";

const DURATION_OPTIONS = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" },
];

export default function ScheduleMeetingDialog({
  open,
  onOpenChange,
  onSubmit,
  teamMembers = [],
  organizerName,
}) {
  const [createMeeting] = useCreateMeetingMutation();
  const [meetingData, setMeetingData] = useState({
    topic: "",
    description: "",
    date: "",
    time: "",
    duration: "30",
    selectedMembers: [],
    meetingId: "",
    meetingLink: "",
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState(null);

  // Reset meeting link/id when dialog opens
  useEffect(() => {
    if (open) {
      setMeetingData((prev) => ({
        ...prev,
        meetingId: "",
        meetingLink: "",
      }));
    }
  }, [open]);

  const handleInputChange = (field, value) => {
    setMeetingData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMemberSelection = (memberId) => {
    setMeetingData((prev) => {
      const isSelected = prev.selectedMembers.includes(memberId);
      return {
        ...prev,
        selectedMembers: isSelected
          ? prev.selectedMembers.filter((id) => id !== memberId)
          : [...prev.selectedMembers, memberId],
      };
    });
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(meetingData.meetingLink);
    if (success) {
      setCopiedLink(true);
      toast.success("Meeting link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      toast.error("Failed to copy link");
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!meetingData.topic.trim()) {
      toast.error("Please enter a meeting topic");
      return;
    }
    if (!meetingData.date) {
      toast.error("Please select a date");
      return;
    }
    if (!meetingData.time) {
      toast.error("Please select a time");
      return;
    }
    if (meetingData.selectedMembers.length === 0) {
      toast.error("Please select at least one team member");
      return;
    }

    setIsSubmitting(true);

    try {
      const dateTime = `${meetingData.date}T${meetingData.time}`;
      const durationMinutes = parseInt(meetingData.duration, 10) || 30;
      const attendeeIds = meetingData.selectedMembers;

      const createdMeeting = await createMeeting({
        topic: meetingData.topic,
        description: meetingData.description,
        dateTime,
        durationMinutes,
        attendeeIds,
        organizerName,
      }).unwrap();

      // Call parent submit handler
      if (onSubmit) {
        await onSubmit(createdMeeting);
      }

      toast.success(
        `Meeting scheduled! Email invitations sent to ${attendeeIds.length} team member${attendeeIds.length > 1 ? "s" : ""}`
      );

      // Persist the generated link briefly (useful if you want to show it before closing)
      setMeetingData((prev) => ({
        ...prev,
        meetingId: createdMeeting.meetingId,
        meetingLink: createdMeeting.meetingLink,
      }));

      // Reset form
      setMeetingData({
        topic: "",
        description: "",
        date: "",
        time: "",
        duration: "30",
        selectedMembers: [],
        meetingId: "",
        meetingLink: "",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl glass-card border-white/20 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Video className="w-5 h-5 text-[#F58220]" />
            Schedule Meeting
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Create a meeting and send invitations to team members
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Meeting Topic */}
          <div className="grid gap-2">
            <Label htmlFor="meeting-topic" className="text-white">
              Meeting Topic <span className="text-red-500">*</span>
            </Label>
            <Input
              id="meeting-topic"
              value={meetingData.topic}
              onChange={(e) => handleInputChange("topic", e.target.value)}
              placeholder="e.g., Sprint Planning, Design Review"
              className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="meeting-description" className="text-white">
              Description
            </Label>
            <Textarea
              id="meeting-description"
              value={meetingData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Add meeting agenda or notes..."
              rows={3}
              className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220] resize-none"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="meeting-date" className="text-white flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="meeting-date"
                type="date"
                value={meetingData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="meeting-time" className="text-white flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Time <span className="text-red-500">*</span>
              </Label>
              <Input
                id="meeting-time"
                type="time"
                value={meetingData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#F58220]"
              />
            </div>
          </div>

          {/* Duration */}
          <div className="grid gap-2">
            <Label htmlFor="meeting-duration" className="text-white">
              Duration
            </Label>
            <Select
              value={meetingData.duration}
              onValueChange={(value) => handleInputChange("duration", value)}
            >
              <SelectTrigger className="bg-black/40 border border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Team Members Selection */}
          <div className="grid gap-2">
            <Label className="text-white flex items-center gap-1">
              <Users className="w-4 h-4" />
              Select Team Members <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 rounded-lg border border-white/10 bg-black/20">
              {teamMembers.map((member) => {
                const isSelected = meetingData.selectedMembers.includes(member.id);
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMemberSelection(member.id)}
                    className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${
                      isSelected
                        ? "bg-[#F58220]/20 border-[#F58220]/70 text-[#F58220]"
                        : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <Avatar className="w-8 h-8 border border-white/20">
                      <AvatarImage src={member.profileImage || member.avatar} />
                      <AvatarFallback>
                        {(member.firstName || member.name || "?").charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">
                        {member.firstName
                          ? `${member.firstName} ${member.lastName || ""}`.trim()
                          : member.name}
                      </div>
                      <div className="text-xs opacity-70">
                        {member.role || member.position || ""}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
            {meetingData.selectedMembers.length > 0 && (
              <p className="text-xs text-white/60">
                {meetingData.selectedMembers.length} member
                {meetingData.selectedMembers.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {/* Meeting Link */}
          <div className="grid gap-2">
            <Label className="text-white">Meeting Link</Label>
            <div className="flex gap-2">
              <Input
                value={meetingData.meetingLink}
                readOnly
                className="bg-black/40 border border-white/20 text-white/80 font-mono text-sm"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleCopyLink}
                className="glass-button border border-white/30 bg-white/10 text-white hover:bg-white/15 shrink-0"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Email Template Customization */}
          <div className="border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setShowEmailEditor(!showEmailEditor)}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F58220]" />
                <span className="text-sm font-semibold text-white">Customize Email Notification</span>
                <span className="text-xs text-white/50">(Optional)</span>
              </div>
              {showEmailEditor ? (
                <ChevronUp className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
              )}
            </button>

            {showEmailEditor && (
              <div className="mt-4 p-4 rounded-lg border border-white/10 bg-black/20">
                <EmailTemplateEditor
                  meetingData={{
                    topic: meetingData.topic,
                    description: meetingData.description,
                    dateTime: meetingData.date && meetingData.time
                      ? `${new Date(meetingData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${new Date(`2000-01-01T${meetingData.time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
                      : undefined,
                    duration: meetingData.duration,
                    meetingLink: meetingData.meetingLink,
                    organizerName: "Current User", // In production, get from auth context
                  }}
                  onTemplateChange={setEmailTemplate}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-white/10 pt-4 mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#F58220] hover:bg-[#d91d79] text-black glass-button"
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Video className="w-4 h-4 mr-2" />
                Schedule Meeting
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
